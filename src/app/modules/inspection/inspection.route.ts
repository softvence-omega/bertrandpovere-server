import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { inspection_controllers } from "./inspection.controller";
import { inspection_validation } from "./inspection.validation";

const inspectionRouter = Router();

inspectionRouter.post("/", auth("USER", "ADMIN"), RequestValidator(inspection_validation.create), inspection_controllers.save_new_inspection);

inspectionRouter.patch("/:inspectionId", auth("USER", "ADMIN"), RequestValidator(inspection_validation.update), inspection_controllers.update_inspection);

inspectionRouter.delete("/:inspectionId", auth("USER", "ADMIN"), inspection_controllers.delete_inspection);

inspectionRouter.get("/", auth("USER", "ADMIN"), inspection_controllers.get_all_inspection);

inspectionRouter.get("/:inspectionId", auth("USER", "ADMIN"), inspection_controllers.get_single_inspection);

export default inspectionRouter;