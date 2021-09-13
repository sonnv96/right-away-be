import { Router } from 'express';
import { productGroupController } from '../controllers';
import { validate } from '../middlewares';
import { productGroupValidation } from '../validations';


const router = Router();
router.get("/", validate(productGroupValidation.getProductGroups), productGroupController.getProductGroups);
router.get("/:productGroupId", validate(productGroupValidation.getProductGroupById), productGroupController.getProductGroupById);
router.put("/:productGroupId", validate(productGroupValidation.updateProductGroup), productGroupController.updateProductGroup);
router.put("/remove/:productGroupId", validate(productGroupValidation.deleteProductGroup), productGroupController.removeProductGroup);
router.post("/", validate(productGroupValidation.createProductGroup), productGroupController.createProductGroup);
router.delete("/:productGroupId", validate(productGroupValidation.deleteProductGroup), productGroupController.deleteProductGroup);

export default router



/**
 * @swagger
 * tags:
 *   name: ProductGroup
 *   description: ProductGroup
 */

/**
* @swagger
* '/api/productGroup':
*    get:
*      tags: [ProductGroup]
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
*              $ref: "#/definitions/schemas/ProductGroup"
*/

/**
* @swagger
* '/api/productGroup/{productGroupId}':
*    get:
*      tags: [ProductGroup]
*      summary: Get productGroup by id
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "productGroupId"
*        in: "path"
*        description: "_id of productGroup to return"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/ProductGroup"
*        '400':
*          description: Bad request!
*        '404':
*          description: ProductGroup not found
*/

/**
* @swagger
* '/api/productGroup/{productGroupId}':
*    put:
*      tags: [ProductGroup]
*      summary: Update an existing productGroup
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/xml"
*      - "application/json"
*      parameters:
*      - name: "productGroupId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      - in: "body"
*        name: "body"
*        description: "ProductGroup object that needs to be update to the store"
*        required: true
*        schema:
*          $ref: "#/definitions/schemas/ProductGroup"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/ProductGroup"
*        '400':
*          description: Bad request!
*        '404':
*          description: ProductGroup not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/productGroup/remove/{productGroupId}':
*    put:
*      tags: [ProductGroup]
*      summary: Update an existing productGroup to status deleted
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "productGroupId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/ProductGroup"
*        '400':
*          description: Bad request!
*        '404':
*          description: ProductGroup not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/productGroup':
*    post:
*      tags: [ProductGroup]
*      summary: Create new productGroup
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - in: body
*        name: productGroup
*        description: "Created productGroup object"
*        schema:
*          $ref: '#/definitions/schemas/ProductGroup'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/ProductGroup"
*/


/**
* @swagger
* '/api/productGroup/{productGroupId}':
*    delete:
*      tags: [ProductGroup]
*      summary: Delete a productGroup
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "productGroupId"
*        in: "path"
*        description: "_id of object need delete"
*        required: true
*        type: "string"
*      responses:
*        '400':
*          description: Bad request!
*        '404':
*          description: ProductGroup not found
*/


