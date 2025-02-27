import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ClothController } from "../controllers/ClothController";
import { ForecastReccomendationController } from "../controllers/ForecastReccomendationController";
import { ForecastController } from "../controllers/ForecastController";
import { UserPostController } from "../controllers/UserPostController";



const routes = Router()


// User Routes

routes.post("/users",UserController.createUser)
routes.get("/users",UserController.getUsers)
routes.get("/user/:id",UserController.getUser)
routes.put("/users",UserController.updateUser)
routes.delete("/user/:id",UserController.deleteUser)
routes.delete("/users",UserController.deleteAllUsers)


//Cloth Routes

routes.post("/clothes",ClothController.createCloth)
routes.get("/clothes",ClothController.getClothes)
routes.get("/cloth",ClothController.getCloth)
routes.put("/clothes",ClothController.updateCloth)
routes.delete("/cloth",ClothController.deleteCloth)
routes.delete("/clothes",ClothController.deleteClothes)


//ClothReccomendation Routes

routes.post("/reccomendation",ForecastReccomendationController.createForecastReccomendation)
routes.post("/reccomendation/set",ForecastReccomendationController.createFullSetForecastReccomendation)
routes.get("/reccomendation",ForecastReccomendationController.getForecastReccomendations)
routes.put("/reccomendation",ForecastReccomendationController.updateForecastReccomendation)
routes.delete("/reccomendation",ForecastReccomendationController.deleteForecastReccomendation)
routes.delete("/reccomendations",ForecastReccomendationController.deleteAllForecastReccomendation)


//Forecast Routes

routes.post("/forecast",ForecastController.createForecast)
routes.get("/forecast",ForecastController.getForecasts)
routes.put("/forecast",ForecastController.updateForecast)
routes.delete("/forecast",ForecastController.deleteForecast)
routes.delete("/forecasts",ForecastController.deleteAllForecasts)

//UserPost Routes

routes.post("/userposts",UserPostController.createUserPost)
routes.get("/userposts",UserPostController.getUserPosts)
routes.put("/userposts",UserPostController.updateUserPost)
routes.delete("/userpost",UserPostController.deleteUserPost)
routes.delete("/userposts",UserPostController.deleteAllUserPosts)





export default routes
