import sequelize from './sequelize';
import Seeds from '../db';
import { NODE_ENV } from '../config';

export const preload = async () => {
	try {
		switch (NODE_ENV) {
			case 'development':
				await sequelize.sync({ force: true });
				console.log('\t- Database synced-force');
				await Seeds();
				console.log('\t- Database seeded')
				break;
			case 'production':
				await sequelize.sync({ alter: true });
				console.log('\t- Database synced-alter');
				break;
		}
	} catch (err) {
		console.log(err);
	}

};