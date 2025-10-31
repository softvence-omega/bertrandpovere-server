import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/global_error_handler';
import notFound from './app/middlewares/not_found_api';
import appRouter from './routes';

// define app
const app = express()

// middleware
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "https://mellifluous-selkie-e0d36e.netlify.app",
        "https://main.d1yhx6z9xvjtzi.amplifyapp.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))
app.use(express.json({ limit: "100mb" }))
app.use(express.raw())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api", appRouter)

// stating point
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the Server api. 😊😊😊, server health 100% ok',
        data: null,
    });
});

// global error handler
app.use(globalErrorHandler);
app.use(notFound);

// export app
export default app;