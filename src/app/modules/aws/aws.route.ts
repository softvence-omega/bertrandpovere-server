import { Router } from "express";
import uploader from "../../middlewares/uploader";
import { aws_controller } from "./aws.controller";

const awsRouter = Router();

awsRouter.post("/upload", uploader.single("file"), aws_controller.upload_file);


export default awsRouter;