import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import uploader from "../../middlewares/uploader";
import { group_controllers } from "./group.controller";
import { group_validation } from "./group.validation";

const groupRouter = Router();

// create new group
groupRouter.post('/', auth("ADMIN"), RequestValidator(group_validation.create), group_controllers.create_new_group);
groupRouter.get('/', auth("ADMIN"), group_controllers.get_all_groups);
groupRouter.get('/:groupId', group_controllers.get_single_group);
groupRouter.patch(
    '/:groupId',
    auth("ADMIN"),
    uploader.single("image"),
    async (req, res, next) => {
        if (req?.body?.data) {
            req.body = JSON.parse(req?.body?.data);
        }
        next()
    },
    group_controllers.update_group_information
);
groupRouter.put('/:groupId', auth("ADMIN"), RequestValidator(group_validation.addMember), group_controllers.add_member_into_group);
groupRouter.put('/remove/:groupId', auth("ADMIN"), RequestValidator(group_validation.addMember), group_controllers.remove_member_from_group);
groupRouter.delete('/:groupId', auth("ADMIN"), group_controllers.delete_group);
groupRouter.get('/join-group/:userId', group_controllers.get_all_joined_groups);



export default groupRouter