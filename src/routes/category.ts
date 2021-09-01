import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { authenticateToken } from '../middlewares/authenticateToken';

class CategoryRouter {
    public router: Router;
    public categoryController: CategoryController = new CategoryController();
    constructor() {
        this.router = Router();
        this.routes();
    }
    public routes() {
        this.router.get("/", this.categoryController.getCategories);
        this.router.get("/:categoryId", this.categoryController.getCategoryById);
        this.router.post("/", this.categoryController.createCategory);
        this.router.delete("/:categoryId", this.categoryController.deleteUser);
        this.router.put("/:categoryId", this.categoryController.updateCategory);
    }
}

export default CategoryRouter;


/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category
 */

 /**
 * @swagger
 * '/api/category':
 *    get:
 *      tags: [Category]
 *      summary: get list all categories
 *      produces:
 *      - application/json
 *      responses:
 *        '200':
 *          description: Success.
 *        '400':
 *          description: Bad request!
 *        '404':
 *          description: Not found
 */
 /**
 * @swagger
 * '/api/category':
 *    post:
 *      tags: [Category]
 *      summary: create new category
 *      produces:
 *      - application/json
 *      parameters: 
 *      - in: body
 *        name: category
 *        schema: 
 *          $ref: '#/definitions/schemas/Category'
 *      responses:
 *        '200':
 *          description: Success.
 *        '400':
 *          description: Bad request!
 *        '404':
 *          description: Not found
 */
        


