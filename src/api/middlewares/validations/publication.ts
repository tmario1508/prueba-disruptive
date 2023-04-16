import { checkSchema, body, query, param } from 'express-validator';
import Publication from '../../../models/Publication';
import Topic from '../../../models/Topic';
import Category, { CategoryContentType } from '../../../models/Category';
import TopicCategories from '../../../models/TopicCategories';

export const createPublication = checkSchema({
    title: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 5, max: 40 },
            errorMessage: 'Must be between 5 and 40 characters',
        },
    },
    description: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 8, max: 60 },
            errorMessage: 'Must be between 8 and 60 characters',
        }
    },
    topic_id: {
        in: 'body',
        isInt: {
            options: { min: 1 },
            errorMessage: 'Must be an integer',
        },
        custom: {
            options: async (value: string) => {
                const topic = await Topic.findByPk(value);
                if (!topic) {
                    return Promise.reject('Topic not found');
                }
                return Promise.resolve();
            }
        }
    },
    contents: {
        in: 'body',
        isArray: { errorMessage: 'Must be an array' },
        custom: {
            options: async (value: any, { req }) => {
                if (value.length < 1) {
                    return Promise.reject('Contents array must have at least one element');
                }
                return Promise.resolve();
            }
        }
    },
    'contents.*.category_id': {
        in: 'body',
        isInt: { 
            options: { min: 1 },
            errorMessage: 'Must be an integer' 
        },
        custom: {
            options: async (value: number, {req, path}) => {
                const index = Number(path.match(/\d+/)![0]);;
                const category = await Category.findByPk(value);
                if (!category) {
                    return Promise.reject('Category not found');
                }
                req.body.contents[index].content_type = category.contentType;
                const topicCategories = await TopicCategories.findOne({
                    where: {
                        topicID: req.body.topic_id,
                        categoryID: category.id,
                    }
                });

                if (!topicCategories) {
                    return Promise.reject('This category is not allowed in this topic');
                }

                return Promise.resolve();
            }
        }
    },
    'contents.*.content': {
        in: 'body',
        custom: {
            options: async (value: Record<string, string>, {req, path}) => {
                const index = Number(path.match(/\d+/)![0]);
                const conten_type = req.body.contents[index].content_type;
                // Check if content has the correct properties.
                if (conten_type === CategoryContentType.TEXT && !value.text) {
                    return Promise.reject('This content should have a text property');
                } else if ((conten_type === CategoryContentType.FILE || conten_type === CategoryContentType.URL) && !value.url) {
                    return Promise.reject('This content should have a url property');
                }
                // Check if content has the correct values.
                if(conten_type === CategoryContentType.TEXT) {
                    const v = await body(`contents[${index}].content.text`)
                        .isString().withMessage('Must be a string')
                        .isLength({ min: 5, max: 1000 }).withMessage('Must be between 5 and 1000 characters')
                        .trim()
                        .run(req);

                    return v.isEmpty();
                } else {
                    const v = await body(`contents[${index}].content.url`)
                        .isString().withMessage('Must be a string')
                        .isURL().withMessage('Must be a valid URL')
                        .trim()
                        .run(req);

                    return v.isEmpty();
                }
            }
        }
    },
});

export const getPublications = checkSchema({
    limit: {
        in: 'query',
        optional: true,
        isInt: {
            options: { min: 1, max: 20 },
            errorMessage: 'Must be an integer between 1 and 20',
        },
    },
    page: {
        in: 'query',
        optional: true,
        isInt: {
            options: { min: 0 },
            errorMessage: 'Must be an integer greater than 0',
        },
    },
    sort_by: {
        in: 'query',
        optional: true,
        isString: { errorMessage: 'Must be a string' },
        custom: {
            options: async (value: string) => {
                if (!['title', 'topic'].includes(value)) {
                    return Promise.reject('Must be one of the following values: title, topic');
                }
                return Promise.resolve();
            }
        }
    },
    sort_order: {
        in: 'query',
        optional: true,
        isString: { errorMessage: 'Must be a string' },
        custom: {
            options: async (value: string) => {
                if (!['asc', 'desc'].includes(value)) {
                    return Promise.reject('Must be one of the following values: asc, desc');
                }
                return Promise.resolve();
            }
        }
    },
    query: {
        in: 'query',
        optional: true,
        isString: { errorMessage: 'Must be a string' },
        isLength: { options: { min: 1 }, errorMessage: 'Must be at least 1 character' },
    },
});

export const getOrDeletePublication = checkSchema({
    id: {
        in: 'params',
        isString: { errorMessage: 'Must be a string' },
        custom: {
            options: async (value: string) => {
                const publication = await Publication.findByPk(value);
                if (!publication) {
                    return Promise.reject('Publication not found');
                }
                return Promise.resolve();
            }
        }
    },
});

export const updatePublication = checkSchema({
    id: {
        in: 'params',
        isString: { errorMessage: 'Must be a string' },
        custom: {
            options: async (value: string) => {
                const publication = await Publication.findByPk(value);
                if (!publication) {
                    return Promise.reject('Publication not found');
                }
                return Promise.resolve();
            }
        }
    },
    title: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 5, max: 40 },
            errorMessage: 'Must be between 5 and 40 characters',
        },
        optional: true,
    },
    description: {
        in: 'body',
        isString: { errorMessage: 'Must be a string' },
        isLength: {
            options: { min: 8, max: 60 },
            errorMessage: 'Must be between 8 and 60 characters',
        },
    },
    topic_id: {
        in: 'body',
        isInt: {
            options: { min: 1 },
            errorMessage: 'Must be an integer',
        },
        custom: {
            options: async (value: string) => {
                const topic = await Topic.findByPk(value);
                if (!topic) {
                    return Promise.reject('Topic not found');
                }
                return Promise.resolve();
            }
        }
    },
    contents: {
        in: 'body',
        isArray: { errorMessage: 'Must be an array' },
        custom: {
            options: async (value: any, { req }) => {
                if (value.length < 1) {
                    return Promise.reject('Contents array must have at least one element');
                }
                return Promise.resolve();
            }
        }
    },
    'contents.*.category_id': {
        in: 'body',
        isInt: {
            options: { min: 1 },
            errorMessage: 'Must be an integer',
        },
        custom: {
            options: async (value: number, { req, path }) => {
                const index = Number(path.match(/\d+/)![0]);
                const category = await Category.findByPk(value);
                if (!category) {
                    return Promise.reject('Category not found');
                }
                req.body.contents[index].content_type = category.contentType;
                const topicCategories = await TopicCategories.findOne({
                    where: {
                        topicID: req.body.topic_id,
                        categoryID: category.id,
                    },
                });

                if (!topicCategories) {
                    return Promise.reject(
                        'This category is not allowed in this topic'
                    );
                }

                return Promise.resolve();
            }
        }
    },
    'contents.*.content': {
        in: 'body',
        custom: {
            options: async (value: Record<string, string>, {req, path}) => {
                const index = Number(path.match(/\d+/)![0]);
                const conten_type = req.body.contents[index].content_type;
                // Check if content has the correct properties.
                if (conten_type === CategoryContentType.TEXT && !value.text) {
                    return Promise.reject('This content should have a text property');
                } else if ((conten_type === CategoryContentType.FILE || conten_type === CategoryContentType.URL) && !value.url) {
                    return Promise.reject('This content should have a url property');
                }
                // Check if content has the correct values.
                if(conten_type === CategoryContentType.TEXT) {
                    const v = await body(`contents[${index}].content.text`)
                        .isString().withMessage('Must be a string')
                        .isLength({ min: 5, max: 1000 }).withMessage('Must be between 5 and 1000 characters')
                        .trim()
                        .run(req);

                    return v.isEmpty();
                } else {
                    const v = await body(`contents[${index}].content.url`)
                        .isString().withMessage('Must be a string')
                        .isURL().withMessage('Must be a valid URL')
                        .trim()
                        .run(req);

                    return v.isEmpty();
                }
            }
        }
    },
});

