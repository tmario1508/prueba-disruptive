import * as publicationController from '../controllers/publication';
import Router from './router';
import {
    createPublication,
    updatePublication,
    getOrDeletePublication,
    getPublications,
} from '../middlewares/validations/publication';
import errorHandler from '../middlewares/errorHandler';
import { isAuth, isOptionalAuth } from '../middlewares/auth';
import { hasPermission } from '../middlewares/permissions';

export default (router: Router) => {
    router.get('/publications', isOptionalAuth, getPublications, errorHandler, publicationController.getPublications);
    router.get('/publication/:id', isOptionalAuth, getOrDeletePublication, errorHandler, publicationController.getPublication);

    router.group({ middleware: [isAuth, hasPermission] }, () => {
        router.post('/publication', createPublication, errorHandler, publicationController.createPublication);
        router.put('/publication/:id', updatePublication, errorHandler, publicationController.updatePublication);
        router.delete('/publication/:id', getOrDeletePublication, errorHandler, publicationController.deletePublication);
    });
}