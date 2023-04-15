import * as userController from '../controllers/user';
import Router from './router';
import { 
    createUser,
    getUser,
    loginUser,
    updateUser,
    deleteUser 
} from '../middlewares/validations/user';
import errorHandler from '../middlewares/errorHandler';
import { isAuth } from '../middlewares/auth';
import { hasPermission } from '../middlewares/permissions';

export default (router: Router) => {
    router.post('/user/login', loginUser, errorHandler, userController.loginUser);
    
    router.group({ middleware: [isAuth, hasPermission]}, () => {
        router.post('/user', createUser, errorHandler, userController.createUser);
        router.get('/user', getUser, errorHandler, userController.getUser);
        router.put('/user/:id', updateUser, errorHandler, userController.updateUser);
        router.delete('/user/:id', deleteUser, errorHandler, errorHandler, userController.deleteUser);
    })
}