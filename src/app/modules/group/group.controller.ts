import httpStatus from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { group_services } from './group.service';

const create_new_group = catchAsync(async (req, res) => {
    const result = await group_services.create_new_group_into_db(req)
    manageResponse(res, {
        success: true,
        message: "Group created successful",
        statusCode: httpStatus.OK,
        data: result
    })
})


const get_all_groups = catchAsync(async (req, res) => {
    const { email } = req.user!;
    const { page, limit, searchTerm } = req.query;
    const result = await group_services.get_all_groups_from_db(email, Number(page || 1), Number(limit || 10), searchTerm as string);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Groups fetched successfully!',
        data: result?.data,
        meta: result?.pagination
    });
});


const get_single_group = catchAsync(async (req, res) => {
    const result = await group_services.get_single_group_by_id(req?.params?.groupId);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Group fetched successfully!',
        data: result
    });
});


const update_group_information = catchAsync(async (req, res) => {
    const result = await group_services.update_group_information_into_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Group update successfully!',
        data: result
    });
});

const add_member_into_group = catchAsync(async (req, res) => {
    const result = await group_services.add_member_into_group_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Group member added successfully!',
        data: result
    });
});

const remove_member_from_group = catchAsync(async (req, res) => {
    const result = await group_services.remove_member_from_group_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Group member removed successfully!',
        data: result
    });
});

const delete_group = catchAsync(async (req, res) => {
    const result = await group_services.delete_group_from_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Group deleted successfully!',
        data: result
    });
});


const get_all_joined_groups = catchAsync(async (req, res) => {
    const result = await group_services.get_all_joined_groups_from_db(req?.params?.userId);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Group fetched successfully!',
        data: result
    });
});

export const group_controllers = {
    create_new_group,
    get_all_groups,
    get_single_group,
    update_group_information,
    add_member_into_group,
    remove_member_from_group,
    delete_group,
    get_all_joined_groups
}