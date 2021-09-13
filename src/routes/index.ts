import { Router } from "express";
import * as swaggerUi from 'swagger-ui-express'
import specs from '../swagger'
import AuthRouter from "./auth.route";
import CategoryRouter from "./category.route";
import UserRouter from "./user.route";
import MerchantRouter from "./merchant.route";
import ProductGroupRouter from "./product_group.route";
import ProductRouter from "./product.route";
import ProductDetailRouter from "./product_detail.route";

const routes = Router();
routes.use("/api/auth", AuthRouter);
routes.use("/api/user", UserRouter);
routes.use("/api/category", CategoryRouter);
routes.use("/api/merchant", MerchantRouter);
routes.use("/api/productGroup", ProductGroupRouter);
routes.use("/api/product", ProductRouter);
routes.use("/api/productDetail", ProductDetailRouter);
routes.use('/', swaggerUi.serve, swaggerUi.setup(specs))


export default routes;








