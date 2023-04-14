import User, { UserRole } from "../models/User";

export default () => {
    return User.bulkCreate([
        {
            userName: 'admin',
            email: 'admin@email.com',
            role: UserRole.ADMIN,
            name: 'Admin',
            password: 'Disruptive2023'
        }
    ]);
};