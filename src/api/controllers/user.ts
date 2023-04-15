import { RequestHandler } from 'express';
import { userService } from '../../loaders/services';

export const createUser: RequestHandler = async (req, res, next) => {
	try {
		const result = await userService.createUser(req.body);
		return res.status(201).send(result);
	} catch (err) {
		next(err);
	}
};

export const updateUser: RequestHandler = async (req, res, next) => {
	const id = req.params.id;
	try {
		const result = await userService.updateUser(id, req.body);
		return res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

export const deleteUser: RequestHandler = async (req, res, next) => {
	const id = req.params.id;
	try {
		await userService.deleteUser(id);
		return res.status(200).send({ message: 'User deleted' });
	} catch (err) {
		next(err);
	}
};

export const getUser: RequestHandler = async (req, res, next) => {
	const email = req.query.email as string;
	try {
		const result = await userService.getUser(email);
		return res.status(200).send(result);
	} catch (err) {
		next(err);
	}
}

export const loginUser: RequestHandler = async (req, res, next) => {
	try {
		const result = await userService.loginUser(req.body);
		return res.status(200).send(result);
	} catch (err) {
		next(err);
	}
}