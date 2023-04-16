import * as categoryController from '../controllers/category';
import Router from './router';
import {
    createCategory,
    updateCategory,
    getOrDeleteCategory,
} from '../middlewares/validations/category';
import errorHandler from '../middlewares/errorHandler';
import { isAuth } from '../middlewares/auth';
import { hasPermission } from '../middlewares/permissions';

export default (router: Router) => {
    router.group({ middleware: [isAuth, hasPermission] }, () => {
        router.post('/category', createCategory, errorHandler, categoryController.createCategory);
        router.put('/category/:id', updateCategory, errorHandler, categoryController.updateCategory);
        router.delete('/category/:id', getOrDeleteCategory, errorHandler, categoryController.deleteCategory);
        router.get('/category/:id', getOrDeleteCategory, errorHandler, categoryController.getCategory);
        router.get('/categories', categoryController.getCategories);
    });
}