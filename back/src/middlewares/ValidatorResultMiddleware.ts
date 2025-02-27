import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export class ValidatorResultMiddleware {
	static validateResult(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const errors = validationResult(request);

			if (!errors.isEmpty()) {
				response.status(400).json({ error: errors.array() });
				return;
			}

			next();
		} catch (error) {
			response.status(500).json({ error: error });
			return;
		}
	}
}
