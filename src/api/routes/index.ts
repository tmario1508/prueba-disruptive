import express from 'express';
import Router from './router';
import user from './user';
import swagger from './swagger';
import { NODE_ENV } from '../../config';

export default () => {
	const router = new Router(express.Router());

    user(router);

    // Documentation route
    if (NODE_ENV !== 'production') {
        swagger(router.router);
    };

    return router.router;
}

