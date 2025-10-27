import { Router } from 'express';
import actionRouter from './app/modules/action/action.route';
import authRoute from './app/modules/auth/auth.route';
import awsRouter from './app/modules/aws/aws.route';
import groupRouter from './app/modules/group/group.route';
import inspectionRouter from './app/modules/inspection/inspection.route';
import organizationRouter from './app/modules/organization/organization.route';
import siteRouter from './app/modules/site/site.route';
import templateRouter from './app/modules/template/template.route';
import userRoute from './app/modules/user/user.route';



const appRouter = Router();

const moduleRoutes = [
    { path: '/auth', route: authRoute },
    { path: '/group', route: groupRouter },
    { path: '/user', route: userRoute },
    { path: '/site', route: siteRouter },
    { path: '/organization', route: organizationRouter },
    { path: '/action', route: actionRouter },
    { path: '/template', route: templateRouter },
    { path: "/inspection", route: inspectionRouter },
    { path: "/aws", route: awsRouter }

];

moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
export default appRouter;