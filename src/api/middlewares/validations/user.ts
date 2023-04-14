import { checkSchema, body, query, param, CustomValidator } from 'express-validator';
import User, { UserRole } from '../../../models/User';

export const createUser = checkSchema({
    user_name: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 3, max: 20 },
            errorMessage: 'Must be between 3 and 20 characters',
        },
        custom: {
            options: async (value: string) => {
                const user = await User.findOne({ where: { userName: value } });
                if (user) {
                    return Promise.reject('User with this username already exists');
                }
            }
        }
    },
    email: {
        in: 'body',
        isEmail: { errorMessage: 'Must be a valid email' },
        custom: {
            options: async (value: string) => {
                const user = await User.findOne({ where: { email: value } });
                if (user) {
                    return Promise.reject('User with this email already exists');
                }
            }
        }
    },
    role: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        custom: {
            options: (value, { req }) => {
                if (value !== UserRole.CREATOR && value !== UserRole.READER) {
                    return Promise.reject(`Must be one of the following: ${UserRole.CREATOR}, ${UserRole.READER}`);
                }
                return Promise.resolve();
            }
        }
    },
    name: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 8, max: 60 },
            errorMessage: 'Must be between 8 and 60 characters',
        }
    },
});

export const getUser = checkSchema({
    email: {
        in: 'query',
        isEmail: { errorMessage: 'Must be a valid email' },
    },
});

export const loginUser = checkSchema({
    email: {
        in: 'body',
        isEmail: { errorMessage: 'Must be a valid email' },
    },
    password: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 8, max: 60 },
            errorMessage: 'Must be between 8 and 60 characters',
        }
    },
});