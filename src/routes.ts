import { Router } from 'express';
import authRoute from './app/modules/auth/auth.route';
import groupRouter from './app/modules/group/group.route';
import siteRouter from './app/modules/site/site.route';
import userRoute from './app/modules/user/user.route';



const appRouter = Router();

const moduleRoutes = [
    { path: '/auth', route: authRoute },
    { path: '/group', route: groupRouter },
    { path: '/user', route: userRoute },
    { path: '/site', route: siteRouter },


];

moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
export default appRouter;