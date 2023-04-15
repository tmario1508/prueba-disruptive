import { RequestHandler } from "express";
import { topicService } from "../../loaders/services";

export const createTopic: RequestHandler = async (req, res, next) => {
    try {
        const result = await topicService.createTopic(req.body);
        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
};

export const updateTopic: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await topicService.updateTopic(id, req.body);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}

export const deleteTopic: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        await topicService.deleteTopic(id);
        return res.status(200).send({ message: 'Topic deleted' });
    } catch (err) {
        next(err);
    }
}

export const getTopic: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await topicService.getTopic(id);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}

export const getTopics: RequestHandler = async (req, res, next) => {
    try {
        const result = await topicService.getTopics();
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}