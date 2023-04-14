import * as userController from '../controllers/user';
import { Router } from 'express';
import { createUser, getUser, loginUser } from '../middlewares/validations/user';
import errorHandler from '../middlewares/errorHandler';

export default (router: Router) => {
    router.post('/user', createUser, errorHandler, userController.createUser);
    router.get('/user', getUser, errorHandler, userController.getUser);
    router.post('/user/login', loginUser, errorHandler, userController.loginUser);
}