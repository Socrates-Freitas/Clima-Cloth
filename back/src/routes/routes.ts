import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ClothController } from "../controllers/ClothController";
import { ForecastReccomendationController } from "../controllers/ForecastReccomendationController";
import { ForecastController } from "../controllers/ForecastController";
import { UserPostController } from "../controllers/UserPostController";
import {
	ClothValidator,
	ForecastReccomendationValidator,
	ForecastValidator,
	UserPostValidator,
} from "../config/Validator";
import { ValidatorResultMiddleware } from "../middlewares/ValidatorResultMiddleware";

const routes = Router();

// User Routes

routes.post("/users", UserController.createUser);
routes.get("/users", UserController.getUsers);
routes.get("/user/:id", UserController.getUser);
routes.put("/users", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);
routes.delete("/users", UserController.deleteAllUsers);

//Cloth Routes

routes.post(
	"/clothes",
	ClothValidator.validateCloth("create"),
	ValidatorResultMiddleware.validateResult,
	ClothController.createCloth,
);
routes.get("/clothes", ClothController.getClothes);
routes.get(
	"/cloth",
	ClothValidator.validateCloth("read"),
	ValidatorResultMiddleware.validateResult,
	ClothController.getCloth,
);
routes.put(
	"/clothes",
	ClothValidator.validateCloth("update"),
	ValidatorResultMiddleware.validateResult,
	ClothController.updateCloth,
);
routes.delete(
	"/cloth",
	ClothValidator.validateCloth("delete"),
	ValidatorResultMiddleware.validateResult,
	ClothController.deleteCloth,
);
routes.delete("/clothes", ClothController.deleteClothes);

//Forecast Routes

routes.post(
	"/forecast",
	ForecastValidator.validateForecast("create"),
	ValidatorResultMiddleware.validateResult,
	ForecastController.createForecast,
);

routes.get(
	"/forecast/:id",
	ForecastValidator.validateForecast("read"),
	ValidatorResultMiddleware.validateResult,
	ForecastController.createForecast,
);

routes.get(
	"/forecast/:date",
	ForecastValidator.validateForecast("read-dates"),
	ValidatorResultMiddleware.validateResult,
	ForecastController.getForecasts,
);

routes.put(
	"/forecast",
	ForecastValidator.validateForecast("update"),
	ValidatorResultMiddleware.validateResult,
	ForecastController.updateForecast,
);

routes.delete(
	"/forecast",
	ForecastValidator.validateForecast("delete"),
	ValidatorResultMiddleware.validateResult,
	ForecastController.deleteForecast,
);

routes.delete("/forecasts", ForecastController.deleteAllForecasts);

//ClothReccomendation Routes

routes.post(
	"/reccomendation",
	ForecastReccomendationController.createForecastReccomendation,
);

routes.post(
	"/reccomendation/set",
	ForecastReccomendationValidator.validateForecastReccomendation(
		"create-fullSet",
	),
	ValidatorResultMiddleware.validateResult,
	ForecastReccomendationController.createFullSetForecastReccomendation,
);

routes.get(
	"/reccomendation",
	ForecastReccomendationController.getForecastReccomendations,
);

routes.put(
	"/reccomendation",
	ForecastReccomendationController.updateForecastReccomendation,
);

routes.delete(
	"/reccomendation",
	ForecastReccomendationController.deleteForecastReccomendation,
);

routes.delete(
	"/reccomendations",
	ForecastReccomendationController.deleteAllForecastReccomendation,
);

//UserPost Routes

routes.post(
	"/userposts",
	UserPostValidator.validateUserPost("create"),
	ValidatorResultMiddleware.validateResult,
	UserPostController.createUserPost,
);

routes.get(
	"/userposts",
	UserPostValidator.validateUserPost("read"),
	ValidatorResultMiddleware.validateResult,
	UserPostController.getUserPosts,
);

routes.put(
	"/userposts",
	UserPostValidator.validateUserPost("update"),
	ValidatorResultMiddleware.validateResult,
	UserPostController.updateUserPost,
);

routes.delete(
	"/userpost",
	UserPostValidator.validateUserPost("delete"),
	ValidatorResultMiddleware.validateResult,
	UserPostController.deleteUserPost,
);

routes.delete("/userposts", UserPostController.deleteAllUserPosts);

export default routes;
