import { NextFunction, Request, Response } from 'express';
import { MissingAuthorizationHeaderError, UnauthorizedError } from './errors/baseHttpError';
import encryptor from '../../loaders/encryption';
import User from '../../models/User';

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
	if (req.headers.authorization) {
		try {
			const token = req.headers.authorization.replace('Bearer ', '');
			const decodedToken = encryptor.decodeToken(token);

			const endUser: User | null = await User.findByPk(decodedToken.endUserID);

			if (endUser) {
				req.body.endUser = endUser;
				return next();
			}
			return next(new UnauthorizedError());
		} catch (err) {
			return next(new UnauthorizedError());
		}
	} else {
		return next(new MissingAuthorizationHeaderError());
	}
};