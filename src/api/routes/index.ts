import express from 'express';
import Router from './router';
import user from './user';
import topic from './topic';
import category from './category';
import publication from './publication';
import swagger from './swagger';
import { NODE_ENV } from '../../config';

export default () => {
	const router = new Router(express.Router());

    user(router);
    topic(router);
    category(router);
    publication(router);

    // Documentation route
    if (NODE_ENV !== 'production') {
        swagger(router.router);
    };

    return router.router;
}

