import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import uploader from "../../middlewares/uploader";
import { site_controllers } from "./site.controller";
import { site_validation } from "./site.validation";

const siteRouter = Router();

siteRouter.post("/", auth("ADMIN"), RequestValidator(site_validation.create), site_controllers.create_new_site)
siteRouter.get("/", auth("ADMIN"), site_controllers.get_all_sites)
siteRouter.get("/:siteId", site_controllers.get_single_site)
siteRouter.patch(
    "/:siteId",
    auth("ADMIN"),
    uploader.single("image"),
    (req, res, next) => {
        if (req?.body?.data) {
            req.body = JSON.parse(req?.body?.data);
        }
        next()
    },
    site_controllers.update_site_information
)
siteRouter.delete("/:siteId", auth("ADMIN"), site_controllers.delete_site_information)
siteRouter.put("/add-member/:siteId", auth("ADMIN"), RequestValidator(site_validation.addMember), site_controllers.add_member_into_site)
siteRouter.put("/remove-member/:siteId", auth("ADMIN"), RequestValidator(site_validation.addMember), site_controllers.remove_member_from_site)

export default siteRouter;