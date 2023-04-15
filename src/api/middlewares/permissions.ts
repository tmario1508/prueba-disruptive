import { NextFunction, Request, Response } from 'express';
import User, { UserRole } from '../../models/User';
import { UnauthorizedError } from './errors/baseHttpError';

export const hasPermission = async (req: Request, res: Response, next: NextFunction) => {

    const endUser: User = req.body.endUser;

    if (endUser.role === UserRole.ADMIN ) {
        return next();
    }

    if (endUser.role === UserRole.CREATOR && req.method === 'DELETE') {
        return next(new UnauthorizedError());
    }

    if (endUser.role === UserRole.READER && req.method !== 'GET') {
        return next(new UnauthorizedError());
    }

    return next();
}