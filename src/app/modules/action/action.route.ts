import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { action_controllers } from "./action.controller";
import { action_validation } from "./action.validation";

const actionRouter = Router();

actionRouter.post("/", auth("ADMIN"), RequestValidator(action_validation.create), action_controllers.create_new_action_and_save);
actionRouter.get("/", auth("ADMIN","USER"), action_controllers.get_all_actions);
actionRouter.get("/:actionId", auth("ADMIN","USER"), action_controllers.get_single_action);

export default actionRouter;