import httpStatus from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { inspection_services } from "./inspection.service";

const save_new_inspection = catchAsync(async (req, res) => {
    const result = await inspection_services.save_new_inspection_into_db(req);
    manageResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Inspection created successfully!',
        data: result
    });
})
const update_inspection = catchAsync(async (req, res) => {
    const result = await inspection_services.update_inspection_into_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Inspection update successfully!',
        data: result
    });
})

const delete_inspection = catchAsync(async (req, res) => {
    const result = await inspection_services.delete_inspection_into_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Inspection delete successfully!',
        data: result
    });
})

const get_all_inspection = catchAsync(async (req, res) => {
    const result = await inspection_services.get_all_inspection_into_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Inspection fetched successfully!',
        data: result?.data,
        meta: result?.pagination
    });
})


const get_single_inspection = catchAsync(async (req, res) => {
    const result = await inspection_services.get_single_inspection_into_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Inspection fetched successfully!',
        data: result
    });
})
export const inspection_controllers = {
    save_new_inspection,
    update_inspection,
    delete_inspection,
    get_all_inspection,
    get_single_inspection
}