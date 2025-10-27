import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { aws_services } from "./aws.service";

const upload_file = catchAsync(async (req, res) => {
    const result = await aws_services.upload_file_into_aws(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Uploaded successfully!',
        data: result
    });
})

export const aws_controller = {
    upload_file
}