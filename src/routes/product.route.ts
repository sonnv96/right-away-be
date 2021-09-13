import { Router } from 'express';
import { productController } from '../controllers';
import { validate } from '../middlewares';
import { productValidation } from '../validations';


const router = Router();
router.get("/", validate(productValidation.getProducts), productController.getProducts);
router.get("/:productId", validate(productValidation.getProductById), productController.getProductById);
router.put("/:productId", validate(productValidation.updateProduct), productController.updateProduct);
router.put("/remove/:productId", validate(productValidation.deleteProduct), productController.removeProduct);
router.post("/", validate(productValidation.createProduct), productController.createProduct);
router.delete("/:productId", validate(productValidation.deleteProduct), productController.deleteProduct);

export default router



/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product
 */

/**
* @swagger
* '/api/product':
*    get:
*      tags: [Product]
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
*              $ref: "#/definitions/schemas/Product"
*/

/**
* @swagger
* '/api/product/{productId}':
*    get:
*      tags: [Product]
*      summary: Get product by id
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "productId"
*        in: "path"
*        description: "_id of product to return"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Product"
*        '400':
*          description: Bad request!
*        '404':
*          description: Product not found
*/

/**
* @swagger
* '/api/product/{productId}':
*    put:
*      tags: [Product]
*      summary: Update an existing product
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/xml"
*      - "application/json"
*      parameters:
*      - name: "productId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      - in: "body"
*        name: "body"
*        description: "Product object that needs to be update to the store"
*        required: true
*        schema:
*          $ref: "#/definitions/schemas/Product"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Product"
*        '400':
*          description: Bad request!
*        '404':
*          description: Product not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/product/remove/{productId}':
*    put:
*      tags: [Product]
*      summary: Update an existing product to status deleted
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "productId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Product"
*        '400':
*          description: Bad request!
*        '404':
*          description: Product not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/product':
*    post:
*      tags: [Product]
*      summary: Create new product
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - in: body
*        name: product
*        description: "Created product object"
*        schema:
*          $ref: '#/definitions/schemas/Product'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Product"
*/


/**
* @swagger
* '/api/product/{productId}':
*    delete:
*      tags: [Product]
*      summary: Delete a product
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "productId"
*        in: "path"
*        description: "_id of object need delete"
*        required: true
*        type: "string"
*      responses:
*        '400':
*          description: Bad request!
*        '404':
*          description: Product not found
*/


