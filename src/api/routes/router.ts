import express, { IRouter, RequestHandler } from 'express';
import { ValidationChain } from 'express-validator';

const router = express.Router();

type Handler = RequestHandler<any> | ValidationChain[] | ValidationChain;
type Handlers = Array<Handler>;

type GroupOptions = {
	middleware: Handlers | Handler;
}

export default class Router {
	private readonly router_: IRouter;
	private readonly middlewareStack_: Handlers;

	constructor(router: IRouter) {
		this.router_ = router;
		this.middlewareStack_ = [];
	}

	private applyMiddleware(...handlers: Handlers) {
		return [...this.middlewareStack_, ...handlers];
	}

	get(path: string, ...handlers: Handlers) {
		this.router_.get(path, ...this.applyMiddleware(...handlers));
	}

	post(path: string, ...handlers: Handlers) {
		this.router_.post(path, ...this.applyMiddleware(...handlers));
	}

	put(path: string, ...handlers: Handlers) {
		this.router_.put(path, ...this.applyMiddleware(...handlers));
	}

	delete(path: string, ...handlers: Handlers) {
		this.router_.delete(path, ...this.applyMiddleware(...handlers));
	}

	group({ middleware }: GroupOptions, callback: () => void) {
		const stack = Array.isArray(middleware)
			? middleware
			: [middleware];
		this.middlewareStack_.push(...stack);

		callback();

		this.middlewareStack_.splice(
			this.middlewareStack_.length - stack.length,
			stack.length,
		);
	}

	get router() {
		return this.router_;
	}
}