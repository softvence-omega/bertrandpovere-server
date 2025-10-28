import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { ai_services } from "./ai.service";

const extract_text = catchAsync(async (req, res) => {
    const result = await ai_services.extract_text_from_ai(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Text extracted successfully!',
        data: result
    })
})
const generate_survey = catchAsync(async (req, res) => {
    const result = await ai_services.generate_survey_by_ai(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Survey generated successfully!',
        data: result
    })
})
const generate_survey_from_pdf = catchAsync(async (req, res) => {
    const result = await ai_services.generate_survey_from_pdf_by_ai(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Survey generated successfully!',
        data: result
    })
})
const upload_pd_into_pinecone_for_ai = catchAsync(async (req, res) => {
    const result = await ai_services.upload_pd_into_pinecone_for_ai_knowledge(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: 'PDF uploaded successfully!',
        data: result
    })
})
const delete_pdf_from_pinecone = catchAsync(async (req, res) => {
    const result = await ai_services.delete_pdf_from_pinecone_by_ai(req);
    manageResponse(res, {
        statusCode: 200,
        success: true,
        message: 'PDF deleted successfully!',
        data: result
    })
})

export const ai_controller = {
    extract_text,
    generate_survey,
    generate_survey_from_pdf,
    upload_pd_into_pinecone_for_ai,
    delete_pdf_from_pinecone
}