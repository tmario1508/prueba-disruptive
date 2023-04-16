import User from '../models/User';
import { ResourceNotFoundError, UnauthorizedError } from '../api/middlewares/errors/baseHttpError';
import encryptor from '../loaders/encryption';

export default class UserService {
    public async createUser(payload: CreateUserRequest): Promise<User> {
        const user = await User.create({
            userName: payload.user_name,
            email: payload.email,
            role: payload.role,
            name: payload.name,
            password: encryptor.hashPassword(payload.password)
        });
        return user.rest();
    }

    public async updateUser(id: string, payload: UpdateUserRequest, endUser: User) {
        if (endUser.role !== 'admin' && endUser.id != id) throw new UnauthorizedError();
        const user = await User.findByPk(id);
        user!.password = payload.password ? encryptor.hashPassword(payload.password) : user!.password;
        user!.name = payload.name;
        user!.role = payload.role;
        await user.save();

        return user.rest();
    }

    public async deleteUser(id: string, endUser: User) {
        if (endUser.role !== 'admin') throw new UnauthorizedError();
        const user = await User.findByPk(id);
        await user.destroy();
    }

    public async getUser(email: string, endUser: User): Promise<User | null> {
        if (endUser.role !== 'admin' && endUser.email != email) throw new UnauthorizedError();
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new ResourceNotFoundError();
        }
        return user.rest();
    }

    public async loginUser(payload: LoginUserRequest) {
        // Login with email or username
        let query: { email?: string, password?: string, userName?: string } = payload.isEmail ? { email: payload.user } : { userName: payload.user };
        query.password = encryptor.hashPassword(payload.password);
        // Find user
        const user = await User.findOne({ 
            where: query
        });

        if (!user) {
            throw new UnauthorizedError('Wrong email or password');
        } else {
            // Generate token
            return {
                token: encryptor.generateToken({ endUserID: user.id }),
            }
        }
    }
}