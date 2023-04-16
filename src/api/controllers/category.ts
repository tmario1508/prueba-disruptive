import { RequestHandler } from "express";
import { categoryService } from "../../loaders/services";

export const createCategory: RequestHandler = async (req, res, next) => {
    try {
        const result = await categoryService.createCategory(req.body);
        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
}

export const updateCategory: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await categoryService.updateCategory(id, req.body);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}

export const deleteCategory: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        await categoryService.deleteCategory(id);
        return res.status(200).send({ message: 'Category deleted' });
    } catch (err) {
        next(err);
    }
}

export const getCategory: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await categoryService.getCategory(id);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}

export const getCategories: RequestHandler = async (req, res, next) => {
    try {
        const result = await categoryService.getCategories();
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}
