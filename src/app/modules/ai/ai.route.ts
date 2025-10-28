import { Router } from "express";
import uploader from "../../middlewares/uploader";
import { ai_controller } from "./ai.controller";

const aiRouter = Router();

aiRouter.post("/extract-text", uploader.single("file"), ai_controller.extract_text)
aiRouter.post("/generate_survey", ai_controller.generate_survey)
aiRouter.post("/generate_survey_from_pdf", uploader.single("file"), ai_controller.generate_survey_from_pdf)
aiRouter.post("/upload-pdf-to-pinecone", uploader.single("file"), ai_controller.upload_pd_into_pinecone_for_ai)
aiRouter.delete("/delete-vectors-by-filename", ai_controller.delete_pdf_from_pinecone)


export default aiRouter;