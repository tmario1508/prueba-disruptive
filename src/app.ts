import express, { NextFunction, Request, Response } from 'express';
import { API_PREFIX } from './config';
import routes from './api/routes';
import { BaseHttpError, ResourceNotFoundError } from './api/middlewares/errors/baseHttpError';

const app = express();

app.use(express.json());

app.use(API_PREFIX!, routes());

app.use((req: Request, res: Response, next: NextFunction) => {
	next(new ResourceNotFoundError());
});

// Error handler
app.use((error: BaseHttpError | Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof BaseHttpError) {
		res.status(error.getCode()).send(error.toJSON());
	} else {
		res.status(500).send({ message: 'Internal server error' });
	}
});

export default app;