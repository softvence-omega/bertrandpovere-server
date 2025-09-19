import httpStatus from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { template_services } from "./template.service";

const create_new_template = catchAsync(async (req, res) => {
    const result = await template_services.create_new_template_into_db(req);
    manageResponse(res, {
        success: true,
        message: "Template created successful",
        statusCode: httpStatus.CREATED,
        data: result
    })
});
const get_all_templates = catchAsync(async (req, res) => {
    const result = await template_services.get_all_templates_from_db(req);
    manageResponse(res, {
        success: true,
        message: "Template fetched successful",
        statusCode: httpStatus.OK,
        data: result
    })
});
const get_single_template = catchAsync(async (req, res) => {
    const result = await template_services.get_single_template_from_db(req);
    manageResponse(res, {
        success: true,
        message: "Template fetched successful",
        statusCode: httpStatus.OK,
        data: result
    })
});
const update_template = catchAsync(async (req, res) => {
    const result = await template_services.update_template_into_db(req);
    manageResponse(res, {
        success: true,
        message: "Template updated successful",
        statusCode: httpStatus.OK,
        data: result
    })
});
const delete_template = catchAsync(async (req, res) => {
    await template_services.delete_template_from_db(req);
    manageResponse(res, {
        success: true,
        message: "Template delete successful",
        statusCode: httpStatus.OK,
        data: null
    })
});

export const template_controllers = {
    create_new_template,
    get_all_templates,
    get_single_template,
    update_template,
    delete_template
}