import User, { UserRole } from "../models/User";
import encryptor from "../loaders/encryption";

export default () => {
    return User.bulkCreate([
        {
            userName: 'admin',
            email: 'admin@email.com',
            role: UserRole.ADMIN,
            name: 'Admin',
            password: encryptor.hashPassword('Disruptive2023')
        },
        {
            userName: 'creator',
            email: 'creator@email.com',
            role: UserRole.CREATOR,
            name: 'Creator',
            password: encryptor.hashPassword('Disruptive2023')
        },
        {
            userName: 'reader',
            email: 'reader@email.com',
            role: UserRole.READER,
            name: 'Reader',
            password: encryptor.hashPassword('Disruptive2023')
        }
    ]);
};