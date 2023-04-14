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
        });
        return user;
    }

    public async getUser(email: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new ResourceNotFoundError();
        }
        return user.rest();
    }

    public async loginUser(payload: LoginUserRequest) {
        const user = await User.findOne({ where: { email: payload.email, password: payload.password } });

        if (!user) {
            throw new UnauthorizedError('Wrong email or password');
        } else {
            return {
                token: encryptor.generateToken({ endUserID: user.id }),
            }
        }
    }
}