import * as topicController from '../controllers/topic';
import Router from './router';
import {
    createTopic,
    updateTopic,
    getOrdeleteTopic,
} from '../middlewares/validations/topic';
import errorHandler from '../middlewares/errorHandler';
import { isAuth } from '../middlewares/auth';
import { hasPermission } from '../middlewares/permissions';

export default (router: Router) => {
    router.group({ middleware: [isAuth, hasPermission] }, () => {
        router.post('/topic', createTopic, errorHandler, topicController.createTopic);
        router.put('/topic/:id', updateTopic, errorHandler, topicController.updateTopic);
        router.delete('/topic/:id', getOrdeleteTopic, errorHandler, topicController.deleteTopic);
        router.get('/topic/:id', getOrdeleteTopic, errorHandler, topicController.getTopic);
        router.get('/topics', topicController.getTopics);
    });
}