import { Router } from "express";
import passport from "passport"
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
    UserValidator,
} from "../config/Validator";
import { ValidatorResultMiddleware } from "../middlewares/ValidatorResultMiddleware";

const routes = Router();



const authenticate = passport.authenticate("jwt",{session:false})

//Login
routes.post("/login",UserController.login)


// User Routes

routes.post("/users",UserValidator.validateUser("create"), UserController.createUser);

routes.get("/users", UserController.getUsers);

routes.get("/user/:id",authenticate,UserValidator.validateUser("read"), UserController.getUser);

routes.put("/users",authenticate,UserValidator.validateUser("update"), UserController.updateUser);

routes.delete("/user/:id",UserValidator.validateUser("delete"), UserController.deleteUser);

routes.delete("/users", UserController.deleteAllUsers);

//Cloth Routes

routes.post(
	"/clothes",
	authenticate,
	ClothValidator.validateCloth("create"),
	ValidatorResultMiddleware.validateResult,
	ClothController.createCloth,
);
routes.get("/clothes", authenticate,ClothController.getClothes);
routes.get("/clothes/all", ClothController.getAllClothes);
routes.get(
	"/cloth",
	authenticate,
	ClothValidator.validateCloth("read"),
	ValidatorResultMiddleware.validateResult,
	ClothController.getCloth,
);
routes.put(
	"/clothes",
	authenticate,
	ClothValidator.validateCloth("update"),
	ValidatorResultMiddleware.validateResult,
	ClothController.updateCloth,
);
routes.delete(
	"/cloth",
	authenticate,
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
	authenticate,
	ForecastReccomendationController.createForecastReccomendation,
);

routes.post(
	"/reccomendation/set",
	authenticate,
	ForecastReccomendationValidator.validateForecastReccomendation(
		"create-fullSet",
	),
	ValidatorResultMiddleware.validateResult,
	ForecastReccomendationController.createFullSetForecastReccomendation,
);

routes.get(
	"/reccomendation",
	authenticate,
	ForecastReccomendationController.getForecastReccomendations,
);

routes.put(
	"/reccomendation",
	authenticate,
	ForecastReccomendationController.updateForecastReccomendation,
);

routes.delete(
	"/reccomendation",
	authenticate,
	ForecastReccomendationController.deleteForecastReccomendation,
);

routes.delete(
	"/reccomendations",
	ForecastReccomendationController.deleteAllForecastReccomendation,
);

//UserPost Routes

routes.post(
	"/userposts",
	authenticate,
	UserPostValidator.validateUserPost("create"),
	ValidatorResultMiddleware.validateResult,
	UserPostController.createUserPost,
);

routes.get(
	"/userposts",
	authenticate,
	UserPostValidator.validateUserPost("read"),
	ValidatorResultMiddleware.validateResult,
	UserPostController.getUserPosts,
);

routes.put(
	"/userposts",
	authenticate,
	UserPostValidator.validateUserPost("update"),
	ValidatorResultMiddleware.validateResult,
	UserPostController.updateUserPost,
);

routes.delete(
	"/userpost",
	authenticate,
	UserPostValidator.validateUserPost("delete"),
	ValidatorResultMiddleware.validateResult,
	UserPostController.deleteUserPost,
);

routes.delete("/userposts", UserPostController.deleteAllUserPosts);

export default routes;
