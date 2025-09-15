import { Router } from 'express';
import authRoute from './app/modules/auth/auth.route';
import groupRouter from './app/modules/group/group.route';



const appRouter = Router();

const moduleRoutes = [
    { path: '/auth', route: authRoute },
    { path: '/group', route: groupRouter },


];

moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
export default appRouter;