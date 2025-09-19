import httpStatus from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { action_services } from "./action.service";

const create_new_action_and_save = catchAsync(async (req, res) => {
    const result = await action_services.create_new_action_and_save_into_db(req);
    manageResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Action created successfully!',
        data: result
    });
})
const get_all_actions = catchAsync(async (req, res) => {
    const result = await action_services.get_all_actions_from_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Action fetched successfully!',
        data: result?.data,
        meta: result?.meta
    });
})
const get_single_action = catchAsync(async (req, res) => {
    const result = await action_services.get_single_action_from_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Action fetched successfully!',
        data: result
    });
})

const update_action_and_save = catchAsync(async (req, res) => {
    const result = await action_services.update_action_and_save_into_db(req);
    manageResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Action updated successfully!',
        data: result
    });
})
const delete_action = catchAsync(async (req, res) => {
    const result = await action_services.delete_action_from_db(req);
    manageResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Action deleted successfully!',
        data: result
    });
})
export const action_controllers = {
    create_new_action_and_save,
    get_all_actions,
    get_single_action,
    update_action_and_save,
    delete_action
}