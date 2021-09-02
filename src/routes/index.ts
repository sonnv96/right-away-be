import { Router } from "express";
import * as swaggerUi from 'swagger-ui-express'
import specs from '../swagger'
import AuthRouter from "./auth.route";
import CategoryRouter from "./category.route";
import UserRouter from "./user.route";

const routes = Router();
routes.use("/api/auth", AuthRouter);
routes.use("/api/user", UserRouter);
routes.use("/api/category", CategoryRouter);
routes.use('/', swaggerUi.serve, swaggerUi.setup(specs))


export default routes;








