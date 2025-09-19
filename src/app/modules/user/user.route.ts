import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { user_controllers } from "./user.controller";
import { user_validation } from "./user.validation";

const userRoute = Router();

userRoute.post("/", auth("ADMIN"), RequestValidator(user_validation.create), user_controllers.add_new_user_in_organization);
userRoute.get("/", auth("ADMIN"), user_controllers.get_all_users_in_organization);
userRoute.get("/:userId", auth("ADMIN"), user_controllers.get_single_users_in_organization);
userRoute.delete("/:userId", auth("ADMIN"), user_controllers.delete_user_in_organization);





export default userRoute;