import { checkSchema, body, query, param } from 'express-validator';
import User, { UserRole } from '../../../models/User';

export const createUser = checkSchema({
    user_name: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: 'Must be between 5 and 20 characters',
        },
        custom: {
            options: async (value: string) => {
                // Only number and letters are allowed.
                if (!value.match(/^[a-zA-Z0-9]+$/)) {
                    return Promise.reject('Only number and letters are allowed');
                }
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
    password: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        matches: {
            // With regex positive lookahead '(?=' we can check the minimum requirements.
            options: new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])[a-zA-Z0-9!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{8,}$/),
            errorMessage: 'The password must be minimum 8 characters long and have at least one lowercase, one uppercase, one number and one special symbol'
        }
    }
});

export const updateUser = checkSchema({
    id: {
        in: 'params',
        isInt: { 
            options: { min: 1 },
            errorMessage: 'Must be a positive integer',
        },
        custom: {
            options: async (value: number) => {
                const user = await User.findByPk(value);
                if (!user) {
                    return Promise.reject('User with this id does not exist');
                }
                return Promise.resolve();
            }
        }
    },
    role: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        custom: {
            options: (value, { req }) => {
                if (req.body.endUser.role !== UserRole.ADMIN) {
                    return Promise.reject('Only admin can change user role');
                }

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
    password: {
        in: 'body',
        optional: true,
        isString: { errorMessage: 'Must be a string' },
        matches: {
            // With regex positive lookahead '(?=' we can check the minimum requirements.
            options: new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])[a-zA-Z0-9!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{8,}$/),
            errorMessage: 'The password must be minimum 8 characters long and have at least one lowercase, one uppercase, one number and one special symbol'
        },
        custom: {
            options: async (value: string, { req }) => {
                if (req.body.endUser.id !== req.params?.id) {
                    return Promise.reject('Only user can change his password');
                }
                return Promise.resolve();
            }
        }
    }
});

export const deleteUser = checkSchema({
    id: {
        in: 'params',
        isInt: {
            options: { min: 1 },
            errorMessage: 'Must be a positive integer',
        },
        custom: {
            options: async (value: number) => {
                const user = await User.findByPk(value);
                if (!user) {
                    return Promise.reject('User with this id does not exist');
                }
                return Promise.resolve();
            }
        }
    }
});

export const getUser = checkSchema({
    email: {
        in: 'query',
        isEmail: { errorMessage: 'Must be a valid email' },
    },
});

export const loginUser = checkSchema({
    user: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: { 
            options: { min: 5, max: 20 }, 
            errorMessage: 'Must be between 5 and 20 characters' 
        },
        custom: {
            options: async ( value, {req}) => {
                // Check if is email
                if(value.includes('@')) {
                    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                        return Promise.reject('Must be a valid email');
                    } else {
                        req.body.isEmail = true;
                    }
                } else if (!value.match(/^[a-zA-Z0-9]+$/)) {
                    return Promise.reject('Must be a valid username');
                }
            }
        }           
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