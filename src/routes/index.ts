import { Router } from "express";
import * as swaggerUi from 'swagger-ui-express'
import specs from '../swagger'
import AuthRouter from "./auth";
import UserRouter from "./user";

const routes = Router();

routes.use("/api/auth", new AuthRouter().router);
routes.use("/api/user", new UserRouter().router);
routes.use('/', swaggerUi.serve, swaggerUi.setup(specs))



export default routes;