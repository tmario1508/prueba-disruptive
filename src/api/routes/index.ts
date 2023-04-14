import express from 'express';
import Router from './router';
import user from './user';

export default () => {
	const router = express.Router();

    user(router);

    return router;
}

