import { checkSchema, body, query, param } from 'express-validator';
import Topic from '../../../models/Topic';
import Category from '../../../models/Category';
import { Op } from 'sequelize';

export const createTopic = checkSchema({
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
                // Check if topic with this name already exists.
                const topic = await Topic.findOne({ where: { name: value } });
                if (topic) {
                    return Promise.reject('Topic with this name already exists');
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
    categories: {
        in: 'body',
        isArray: { errorMessage: 'Must be an array' },
        isEmpty: { negated: true, errorMessage: 'Must not be empty' },
        custom: {
            options: async (value: number[]) => {
                // Check if all categories are valid.
                const categories = await Category.findAll({ 
                    where: { id: { [Op.in]: value } }
                });
                if (categories.length !== value.length) {
                    return Promise.reject('Some categories are invalid');
                }
            }
        }
    }
});

export const updateTopic = checkSchema({
    id: {
        in: 'params',
        isString: { errorMessage: 'Must be a string' },
        custom: {
            options: async (value: string) => {
                const topic = await Topic.findByPk(value);
                if (!topic) {
                    return Promise.reject('Topic with this id does not exist');
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
                // Check if topic with this name already exists.
                const topic = await Topic.findOne({ where: { name: value } });
                if (topic && topic.id !== Number(req.params!.id)) {
                    return Promise.reject('Topic with this name already exists');
                }

                return Promise.resolve();
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
    categories: {
        in: 'body',
        isArray: { errorMessage: 'Must be an array' },
        isEmpty: { negated: true, errorMessage: 'Must not be empty' },
        custom: {
            options: async (value: number[]) => {
                // Check if all categories are valid.
                const categories = await Category.findAll({ 
                    where: { id: { [Op.in]: value } }
                });
                if (categories.length !== value.length) {
                    return Promise.reject('Some categories are invalid');
                }
            }
        }
    }
});

export const getOrdeleteTopic = checkSchema({
    id: {
        in: 'params',
        isString: { errorMessage: 'Must be a string' },
        custom: {
            options: async (value: string) => {
                const topic = await Topic.findByPk(value);
                if (!topic) {
                    return Promise.reject('Topic with this id does not exist');
                }
            }
        }
    },
});