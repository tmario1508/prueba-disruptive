import { Column, Model, Table } from 'sequelize-typescript';

export enum UserRole {
    ADMIN = 'admin',
    READER = 'reader',
    CREATOR = 'creator',
};

@Table
export default class User extends Model<User> {
    @Column
    userName!: string;

    @Column
    email!: string;

    @Column
    role!: UserRole;

    @Column
    name!: string;

    @Column
    password!: string;

    rest() {
        return {
            id: this.id,
            userName: this.userName,
            email: this.email,
            role: this.role,
            name: this.name,
        };
    }
}