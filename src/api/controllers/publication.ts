import { RequestHandler } from "express";
import { publicationService } from "../../loaders/services";

export const createPublication: RequestHandler = async (req, res, next) => {
    try {
        const result = await publicationService.createPublication(req.body.endUser!, req.body);
        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
}

export const updatePublication: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await publicationService.updatePublication(id, req.body);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}

export const deletePublication: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        await publicationService.deletePublication(id);
        return res.status(200).send({ message: 'Publication deleted' });
    } catch (err) {
        next(err);
    }
}

export const getPublication: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await publicationService.getPublication(id, req.body.endUser);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}

export const getPublications: RequestHandler = async (req, res, next) => {
    const filters: FiltersPublications = {
        page: req.query.page ? +req.query.page : undefined,
        limit: req.query.limit ? +req.query.limit : 100,
        sortBy: req.query.sort_by as string || undefined,
		sortOrder: req.query.sort_order as string || undefined,
        query: req.query.query as string || undefined,
    }
    try {
        const result = await publicationService.getPublications(filters, req.body.endUser);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}