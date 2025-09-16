import httpStatus from 'http-status';
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { organization_services } from "./organization.service";

const update_organization = catchAsync(async (req, res) => {
    const result = await organization_services.update_organization_into_db(req);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Organization update successfully!',
        data: result
    });
})

export const organization_controllers = {
    update_organization
}