import { Router } from 'express';
import { categoryController } from '../controllers';
import { validate } from '../middlewares';
import { categoryValidation } from '../validations';


const router = Router();
router.get("/", validate(categoryValidation.getCategories), categoryController.getCategories);
router.get("/:categoryId", categoryController.getCategoryById);
router.put("/:categoryId", categoryController.updateCategory);
router.put("/remove/:categoryId", categoryController.removeCategory);
router.post("/", categoryController.createCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

export default router



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
*      summary: Get list all categories
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "page"
*        in: "query"
*        description: "page number of list"
*        required: false
*        type: "number"
*        default: 1
*      - name: "limit"
*        in: "query"
*        description: "page size of list"
*        required: false
*        type: "number"
*        default: 10
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            type: "array"
*            items:
*              $ref: "#/definitions/schemas/Category"
*/

/**
* @swagger
* '/api/category/{categoryId}':
*    get:
*      tags: [Category]
*      summary: Get category by id
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "categoryId"
*        in: "path"
*        description: "_id of category to return"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Category"
*        '400':
*          description: Bad request!
*        '404':
*          description: Category not found
*/

/**
* @swagger
* '/api/category/{categoryId}':
*    put:
*      tags: [Category]
*      summary: Update an existing category
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/xml"
*      - "application/json"
*      parameters:
*      - name: "categoryId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      - in: "body"
*        name: "body"
*        description: "Category object that needs to be update to the store"
*        required: true
*        schema:
*          $ref: "#/definitions/schemas/Category"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Category"
*        '400':
*          description: Bad request!
*        '404':
*          description: Category not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/category/remove/{categoryId}':
*    put:
*      tags: [Category]
*      summary: Update an existing category to status deleted
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "categoryId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Category"
*        '400':
*          description: Bad request!
*        '404':
*          description: Category not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/category':
*    post:
*      tags: [Category]
*      summary: Create new category
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - in: body
*        name: category
*        description: "Created category object"
*        schema:
*          $ref: '#/definitions/schemas/Category'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Category"
*/


/**
* @swagger
* '/api/category/{categoryId}':
*    delete:
*      tags: [Category]
*      summary: Delete a category
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "categoryId"
*        in: "path"
*        description: "_id of object need delete"
*        required: true
*        type: "string"
*      responses:
*        '400':
*          description: Bad request!
*        '404':
*          description: Category not found
*/


