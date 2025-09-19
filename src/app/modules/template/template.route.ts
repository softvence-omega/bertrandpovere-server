import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import uploader from "../../middlewares/uploader";
import { template_controllers } from "./template.controller";
import { template_validation } from "./template.validation";

const templateRouter = Router();


templateRouter.post("/", auth("ADMIN"), template_controllers.create_new_template)
templateRouter.get("/", auth("ADMIN", "USER"), template_controllers.get_all_templates)
templateRouter.get("/:templateId", auth("ADMIN", "USER"), template_controllers.get_single_template)
templateRouter.delete("/:templateId", auth("ADMIN"), template_controllers.delete_template)
templateRouter.patch(
    "/:templateId",
    auth("ADMIN", "USER"),
    uploader.single("image"),
    (req, res, next) => {
        if (req?.body?.data) {
            req.body = JSON.parse(req?.body?.data);
        }
        next()
    },
    RequestValidator(template_validation.create),
    template_controllers.update_template
)

export default templateRouter;