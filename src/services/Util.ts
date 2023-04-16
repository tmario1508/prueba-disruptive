import { Sequelize } from 'sequelize-typescript';
import sequelize from '../loaders/sequelize';

export default class Util {
    public escapeStr(str: string) {
		const rawInput = str.replace(/(_|%|\\)/g, '\\$1');
		const escapedInput = sequelize.escape(`%${rawInput}%`);
		return Sequelize.literal(`${escapedInput} ESCAPE '\\'`);
	}
}