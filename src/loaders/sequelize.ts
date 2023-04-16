import { Sequelize } from 'sequelize-typescript';
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from '../config';
import User from '../models/User';
import Topic from '../models/Topic';
import Category from '../models/Category';
import TopicCategories from '../models/TopicCategories';
import Publications from '../models/Publication';
import Contents from '../models/Content';

const client = new Sequelize(
	POSTGRES_DB!,
	POSTGRES_USER!,
	POSTGRES_PASSWORD!,
	{
		timezone: "-6:00",
		logging: false,
		dialect: 'postgres',
		host: POSTGRES_HOST,
		models: [
            User,
			Topic,
			Category,
			TopicCategories,
			Publications,
			Contents,
        ],
    },
);

export default client;
