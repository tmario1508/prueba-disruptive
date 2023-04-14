
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errors/baseHttpError';

export default (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req).formatWith(({ value, msg, param, location }) => {
		const error: { [key: string]: string; } = {};
		error[param] = msg;
		return error;
	});

	if (!errors.isEmpty()) {
		throw new ValidationError(errors.array());
	}
	next();
};