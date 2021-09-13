import { Router } from 'express';
import { productDetailController } from '../controllers';
import { validate } from '../middlewares';
import { productDetailValidation } from '../validations';


const router = Router();
router.get("/", validate(productDetailValidation.getProductDetails), productDetailController.getProductDetails);
router.get("/:productDetailId", validate(productDetailValidation.getProductDetailById), productDetailController.getProductDetailById);
router.put("/:productDetailId", validate(productDetailValidation.updateProductDetail), productDetailController.updateProductDetail);
router.put("/remove/:productDetailId", validate(productDetailValidation.deleteProductDetail), productDetailController.removeProductDetail);
router.post("/", validate(productDetailValidation.createProductDetail), productDetailController.createProductDetail);
router.delete("/:productDetailId", validate(productDetailValidation.deleteProductDetail), productDetailController.deleteProductDetail);

export default router



/**
 * @swagger
 * tags:
 *   name: ProductDetail
 *   description: ProductDetail
 */

/**
* @swagger
* '/api/productDetail':
*    get:
*      tags: [ProductDetail]
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
*              $ref: "#/definitions/schemas/ProductDetail"
*/

/**
* @swagger
* '/api/productDetail/{productDetailId}':
*    get:
*      tags: [ProductDetail]
*      summary: Get productDetail by id
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "productDetailId"
*        in: "path"
*        description: "_id of productDetail to return"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/ProductDetail"
*        '400':
*          description: Bad request!
*        '404':
*          description: ProductDetail not found
*/

/**
* @swagger
* '/api/productDetail/{productDetailId}':
*    put:
*      tags: [ProductDetail]
*      summary: Update an existing productDetail
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/xml"
*      - "application/json"
*      parameters:
*      - name: "productDetailId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      - in: "body"
*        name: "body"
*        description: "ProductDetail object that needs to be update to the store"
*        required: true
*        schema:
*          $ref: "#/definitions/schemas/ProductDetail"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/ProductDetail"
*        '400':
*          description: Bad request!
*        '404':
*          description: ProductDetail not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/productDetail/remove/{productDetailId}':
*    put:
*      tags: [ProductDetail]
*      summary: Update an existing productDetail to status deleted
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "productDetailId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/ProductDetail"
*        '400':
*          description: Bad request!
*        '404':
*          description: ProductDetail not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/productDetail':
*    post:
*      tags: [ProductDetail]
*      summary: Create new productDetail
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - in: body
*        name: productDetail
*        description: "Created productDetail object"
*        schema:
*          $ref: '#/definitions/schemas/ProductDetail'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/ProductDetail"
*/


/**
* @swagger
* '/api/productDetail/{productDetailId}':
*    delete:
*      tags: [ProductDetail]
*      summary: Delete a productDetail
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "productDetailId"
*        in: "path"
*        description: "_id of object need delete"
*        required: true
*        type: "string"
*      responses:
*        '400':
*          description: Bad request!
*        '404':
*          description: ProductDetail not found
*/


