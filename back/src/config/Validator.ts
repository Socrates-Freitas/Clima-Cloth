import { body, param, ValidationChain } from "express-validator";
import { ClothCategory, ClothType } from "../controllers/ClothController";

export class UserValidator {
	static validateUser(method: string): ValidationChain[] {
		switch (method) {
			case "create":
				return [
					body("name")
						.exists()
						.withMessage("O campo nome é obrigatório.")
						.isLength({ max: 30, min: 3 })
						.withMessage("O campo deve ter de 3 a 30 caracteres."),

					body("email")
						.exists()
						.withMessage("O campo email é obrigatório.")
						.isEmail()
						.withMessage("O email não é um email válido."),

					body("password")
						.exists()
						.withMessage("O campo senha é obrigatório.")
						.isLength({ min: 8, max: 30 })
						.withMessage("O campo senha deve ter de 8 a 30 caracteres."),
				];

			case "read":
				return [
					param("id")
						.exists()
						.withMessage("O campo id é obrigatório.")
						.isNumeric()
						.withMessage("O campo id deve ser um número"),
				];

			case "update":
				return [
					body("name")
						.exists()
						.withMessage("O campo nome é obrigatório.")
						.isLength({ max: 30, min: 3 })
						.withMessage("O campo deve ter de 3 a 30 caracteres."),

					body("email")
						.exists()
						.withMessage("O campo email é obrigatório.")
						.isEmail()
						.withMessage("O email não é válido."),

					body("password")
						.exists()
						.withMessage("O campo senha é obrigatório.")
						.isLength({ min: 8, max: 30 })
						.withMessage("O campo senha deve ter de 8 a 30 caracteres."),
				];
			case "delete":
				return [
					param("id")
						.exists()
						.withMessage("O campo id é obrigatório.")
						.isNumeric()
						.withMessage("O campo id deve ser um número"),
				];

			default:
				return [];
		}
	}
}

export class ClothValidator {
	static validateCloth(method: string): ValidationChain[] {
		switch (method) {
			case "create":
				return [
					body("clothName")
						.exists()
						.withMessage("O campo clothName é obrigatório")
						.isLength({ min: 3, max: 30 })
						.withMessage("O campo clothName deve ter entre 3 e 30 caracteres"),

					body("clothCategory")
						.exists()
						.withMessage("O campo clothCategory é obrigatório")
						.isIn(Object.values(ClothCategory))
						.withMessage("clothCategory deve ser BLUSA,CALÇA e CALÇADO"),

					body("clothColor")
						.exists()
						.withMessage("O campo clothColor é obrigatório")
						.isHexColor()
						.withMessage("O campo clothColor é uma cor hexadecimal"),

					body("clothType")
						.exists()
						.withMessage("O campo clothType é obrigatório")
						.isIn(Object.values(ClothType))
						.isNumeric()
						.withMessage("O campo clothType é numérico"),
				];

			case "read":
				return [
					body("clothName")
						.exists()
						.withMessage("O campo clothName é obrigatório")
						.isLength({ min: 3, max: 30 })
						.withMessage("O campo clothName deve ter entre 3 e 30 caracteres"),
				];
			case "update":
				return [
					body("clothName")
						.exists()
						.withMessage("O campo clothName é obrigatório")
						.isLength({ min: 3, max: 30 })
						.withMessage("O campo clothName deve ter entre 3 e 30 caracteres"),

					body("clothCategory")
						.exists()
						.withMessage("O campo clothCategory é obrigatório")
						.isIn(Object.values(ClothCategory))
						.withMessage("clothCategory deve ser BLUSA,CALÇA e CALÇADO"),

					body("clothColor")
						.exists()
						.withMessage("O campo clothColor é obrigatório")
						.isHexColor()
						.withMessage("O campo clothColor é uma cor hexadecimal"),

					body("clothType")
						.exists()
						.withMessage("O campo clothType é obrigatório")
						.isIn(Object.values(ClothType))
						.isNumeric()
						.withMessage("O campo clothType é numérico"),
				];
			case "delete":
				return [
					body("clothName")
						.exists()
						.withMessage("O campo clothName é obrigatório")
						.isLength({ min: 3, max: 30 })
						.withMessage("O campo clothName deve ter entre 3 e 30 caracteres"),
				];
			default:
				return [];
		}
	}
}

export class ForecastValidator {
	static validateForecast(method: string): ValidationChain[] {
		switch (method) {
			case "create":
				//  city, date, weather, temperature, rainProbabilty
				return [
					body("city").exists().withMessage("O campo city é obrigatório."),

					param("date")
						.isInt()
						.withMessage("O campo date é um timestamp")
						.isLength({ min: 10, max: 10 })
						.withMessage("O campo date é um timestamp com 10 dígitos"),

					body("weather").exists().withMessage("O campo weather é obrigatório"),

					body("temperature")
						.exists()
						.withMessage("O campo temperature é obrigatório")
						.isNumeric()
						.withMessage("O campo é um número"),

					body("rainProbability")
						.exists()
						.withMessage("O campo rainProbability é obrigatório")
						.isNumeric()
						.withMessage("O campo rainProbability é um número"),
				];
			case "read-dates":
				return [
					param("date")
						.isInt()
						.withMessage("O campo date é um timestamp")
						.isLength({ min: 10, max: 10 })
						.withMessage("O campo date é um timestamp com 10 dígitos")
						.optional(),
				];
			case "read":
				return [
					param("id")
						.exists()
						.withMessage("O campo id é obrigatório")
						.isInt()
						.withMessage("O campo date é um inteiro"),
				];

			case "update":
				return [
					body("city").exists().withMessage("O campo city é obrigatório."),

					param("date")
						.isInt()
						.withMessage("O campo date é um timestamp")
						.isLength({ min: 10, max: 10 })
						.withMessage("O campo date é um timestamp com 10 dígitos"),

					body("weather").exists().withMessage("O campo weather é obrigatório"),

					body("temperature")
						.exists()
						.withMessage("O campo temperature é obrigatório")
						.isNumeric()
						.withMessage("O campo é um número"),

					body("rainProbability")
						.exists()
						.withMessage("O campo rainProbability é obrigatório")
						.isNumeric()
						.withMessage("O campo rainProbability é um número"),
				];

			case "delete":
				return [
					param("id")
						.exists()
						.withMessage("O campo id é obrigatório")
						.isInt()
						.withMessage("O campo date é um inteiro"),
				];

			default:
				return [];
		}
	}
}

export class ForecastReccomendationValidator {
	static validateForecastReccomendation(method: string): ValidationChain[] {
		switch (method) {
			case "create-fullSet":
				return [
					body("forecastId")
						.exists()
						.withMessage("O campo id é obrigatório")
						.isInt()
						.withMessage("O campo date é um inteiro"),
				];

			default:
				return [];
		}
	}
}

export class UserPostValidator {
	static validateUserPost(method: string): ValidationChain[] {
		switch (method) {
			case "create":
				return [
					// userId, clothName, postText
					body("clothName")
						.exists()
						.withMessage("O campo clothName é obrigatório")
						.isLength({ min: 3, max: 30 })
						.withMessage("O campo clothName deve ter entre 3 e 30 caracteres"),
					body("postText")
						.exists()
						.withMessage("O campo postText é obrigatório")
						.isLength({ min: 3, max: 200 })
						.withMessage("O campo clothName deve ter entre 3 e 200 caracteres"),
				];

			case "read":
				return [
					body("clothName")
						.exists()
						.withMessage("O campo clothName é obrigatório")
						.isLength({ min: 3, max: 30 })
						.withMessage("O campo clothName deve ter entre 3 e 30 caracteres"),
				];

			case "update":
				return [
					// userId, clothName, postText
					body("clothName")
						.exists()
						.withMessage("O campo clothName é obrigatório")
						.isLength({ min: 3, max: 30 })
						.withMessage("O campo clothName deve ter entre 3 e 30 caracteres"),
					body("postText")
						.exists()
						.withMessage("O campo postText é obrigatório")
						.isLength({ min: 3, max: 200 })
						.withMessage("O campo clothName deve ter entre 3 e 200 caracteres"),
					param("date")
						.isInt()
						.withMessage("O campo date é um timestamp")
						.isLength({ min: 10, max: 10 })
						.withMessage("O campo date é um timestamp com 10 dígitos"),
				];
			case "delete":
				return [
					// userId, clothName, postText
					body("clothName")
						.exists()
						.withMessage("O campo clothName é obrigatório")
						.isLength({ min: 3, max: 30 })
						.withMessage("O campo clothName deve ter entre 3 e 30 caracteres"),
					body("postText")
						.exists()
						.withMessage("O campo postText é obrigatório")
						.isLength({ min: 3, max: 200 })
						.withMessage("O campo clothName deve ter entre 3 e 200 caracteres"),
					param("date")
						.isInt()
						.withMessage("O campo date é um timestamp")
						.isLength({ min: 10, max: 10 })
						.withMessage("O campo date é um timestamp com 10 dígitos"),
				];

			default:
				return [];
		}
	}
}
