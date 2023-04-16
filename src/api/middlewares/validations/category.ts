import { checkSchema, body, query, param } from 'express-validator';
import Category from '../../../models/Category';
import { Op } from 'sequelize';

export const createCategory = checkSchema({
    name: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: 'Must be between 5 and 20 characters',
        },
        custom: {
            options: async (value: string) => {
                // Only letters are allowed.
                if (!value.match(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g)) {
                    return Promise.reject('Only letters are allowed');
                }
                // Check if category with this name already exists.
                const category = await Category.findOne({ where: { name: value } });
                if (category) {
                    return Promise.reject('Category with this name already exists');
                }
            }
        }
    },
    description: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 8, max: 60 },
            errorMessage: 'Must be between 8 and 60 characters',
        }
    },
    image: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isURL: { errorMessage: 'Must be a valid URL' }
    }
});

export const updateCategory = checkSchema({
    id: {
        in: 'params',
        isString: { errorMessage: 'Must be a string' },
        custom: {
            options: async (value: string) => {
                const category = await Category.findByPk(value);
                if (!category) {
                    return Promise.reject('Category not found');
                }
            }
        }
    },
    name: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 5, max: 20 },
            errorMessage: 'Must be between 5 and 20 characters',
        },
        custom: {
            options: async (value: string, { req }) => {
                // Only letters are allowed.
                if (!value.match(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g)) {
                    return Promise.reject('Only letters are allowed');
                }
                // Check if category with this name already exists.
                const category = await Category.findOne({ 
                    where: { name: value, id: { [Op.ne]: req.params!.id } }
                });
                if (category) {
                    return Promise.reject('Category with this name already exists');
                }
            }
        }
    },
    description: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 8, max: 60 },
            errorMessage: 'Must be between 8 and 60 characters',
        }
    },
    image: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isURL: { errorMessage: 'Must be a valid URL' }
    }
});

export const getOrDeleteCategory = checkSchema({
    id: {
        in: 'params',
        isString: { errorMessage: 'Must be a string' },
        custom: {
            options: async (value: string) => {
                const category = await Category.findByPk(value);
                if (!category) {
                    return Promise.reject('Category not found');
                }
            }
        }
    }
});

export const getCategories = checkSchema({
});