import { StatusCodes } from 'http-status-codes';

interface Errorable {
	toJSON(): object;
	getCode(): number;
}

export abstract class BaseHttpError extends Error implements Errorable {
	toString() {
		return JSON.stringify(this.toJSON());
	}

	abstract toJSON(): object;

	abstract getCode(): number;
}

export class GenericError extends BaseHttpError {
	public message_: string;
	public description_: string | undefined = undefined;

	constructor(message: string = 'SERVER_ERROR', description?: string) {
		super();

		this.message_ = message;
		this.description_ = description;
	}

	getCode() {
		return StatusCodes.INTERNAL_SERVER_ERROR
	}

	toJSON(): object {
		let json: any = {
			message: this.message_
		}

		if (this.description_) {
			json.description = this.description_;
		}

		return json;
	}
}

export class ValidationError extends BaseHttpError {
	constructor(private errors_: object[]) {
		super();
	}

	getCode() {
		return StatusCodes.BAD_REQUEST;
	}

	toJSON(): object {
		return {
			message: 'WRONG_DATA',
			description: this.errors_
		};
	}
}

export class ResourceNotFoundError extends BaseHttpError {
    constructor() {
        super();
    }

    getCode() {
        return StatusCodes.NOT_FOUND;
    }

    toJSON(): object {
        return {
            message: 'RESOURCE_NOT_FOUND',
            description: 'The requested resource was not found'
        };
    }
}

export class UnauthorizedError extends GenericError {
	constructor(description?: string) {
		super('UNAUTHORIZED', description);
	}

	getCode(): number {
		return StatusCodes.UNAUTHORIZED;
	}
}

export class MissingAuthorizationHeaderError extends GenericError {
	constructor() {
		super('MISSING_AUTHORIZATION_HEADER');
	}

	getCode() {
		return StatusCodes.BAD_REQUEST
	}
}
