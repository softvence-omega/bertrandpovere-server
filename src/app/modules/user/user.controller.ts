import httpStatus from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { user_services } from "./user.service";

const add_new_user_in_organization = catchAsync(async (req, res) => {
    const result = await user_services.add_new_user_in_organization_db(req);
    manageResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User added successfully!',
        data: result
    });
});

const get_all_users_in_organization = catchAsync(async (req, res) => {
    const result = await user_services.get_all_users_in_organization_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users fetched successfully!',
        data: result
    });
});

const get_single_users_in_organization = catchAsync(async (req, res) => {
    const result = await user_services.get_single_users_in_organization_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully!',
        data: result
    });
});
const delete_user_in_organization = catchAsync(async (req, res) => {
    const result = await user_services.delete_user_in_organization_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully!',
        data: result
    });
});

export const user_controllers = {
    add_new_user_in_organization,
    get_all_users_in_organization,
    get_single_users_in_organization,
    delete_user_in_organization
}