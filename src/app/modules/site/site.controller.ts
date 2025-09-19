import httpStatus from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { site_services } from "./site.service";

const create_new_site = catchAsync(async (req, res) => {
    const result = await site_services.create_new_site_in_db(req)
    manageResponse(res, {
        success: true,
        message: "Site created successful",
        statusCode: httpStatus.CREATED,
        data: result
    })
});
const get_all_sites = catchAsync(async (req, res) => {
    const result = await site_services.get_all_sites_from_db(req)
    manageResponse(res, {
        success: true,
        message: "Site fetched successful",
        statusCode: httpStatus.OK,
        data: result?.data,
        meta: result?.meta
    })
});
const get_single_site = catchAsync(async (req, res) => {
    const result = await site_services.get_single_site_from_db(req)
    manageResponse(res, {
        success: true,
        message: "Site fetched successful",
        statusCode: httpStatus.OK,
        data: result
    })
});

const update_site_information = catchAsync(async (req, res) => {
    const result = await site_services.update_site_information_into_db(req)
    manageResponse(res, {
        success: true,
        message: "Site updated successful",
        statusCode: httpStatus.OK,
        data: result
    })
});
const delete_site_information = catchAsync(async (req, res) => {
    const result = await site_services.delete_site_information_into_db(req)
    manageResponse(res, {
        success: true,
        message: "Site deleted successful",
        statusCode: httpStatus.OK,
        data: result
    })
});
const add_member_into_site = catchAsync(async (req, res) => {
    const result = await site_services.add_member_into_site_in_db(req)
    manageResponse(res, {
        success: true,
        message: "Member added into site successful",
        statusCode: httpStatus.OK,
        data: result
    })
});
const remove_member_from_site = catchAsync(async (req, res) => {
    const result = await site_services.remove_member_from_site_db(req)
    manageResponse(res, {
        success: true,
        message: "Member removed into site successful",
        statusCode: httpStatus.OK,
        data: result
    })
});

export const site_controllers = {
    create_new_site,
    get_all_sites,
    get_single_site,
    update_site_information,
    delete_site_information,
    add_member_into_site,
    remove_member_from_site
}