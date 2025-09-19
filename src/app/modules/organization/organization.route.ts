import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import uploader from "../../middlewares/uploader";
import { organization_controllers } from "./organization.controller";
import { organization_validation } from "./organization.validation";

const organizationRouter = Router()

organizationRouter.patch(
    "/update-info",
    auth("ADMIN"),
    uploader.single("image"),
    (req, res, next) => {
        if (req?.body?.data) {
            req.body = JSON.parse(req?.body?.data);
        }
        next()
    },
    RequestValidator(organization_validation.update),
    organization_controllers.update_organization
)


export default organizationRouter;