import { Router } from 'express';
import { merchantDetailController } from '../controllers';
import { validate } from '../middlewares';
import { merchantDetailValidation } from '../validations';


const router = Router();
router.get("/", validate(merchantDetailValidation.getMerchantDetails), merchantDetailController.getMerchantDetails);
router.get("/:merchantDetailId", validate(merchantDetailValidation.getMerchantDetailById), merchantDetailController.getMerchantDetailById);
router.put("/:merchantDetailId", validate(merchantDetailValidation.updateMerchantDetail), merchantDetailController.updateMerchantDetail);
router.put("/remove/:merchantDetailId", validate(merchantDetailValidation.deleteMerchantDetail), merchantDetailController.removeMerchantDetail);
router.post("/", validate(merchantDetailValidation.createMerchantDetail), merchantDetailController.createMerchantDetail);
router.delete("/:merchantDetailId", validate(merchantDetailValidation.deleteMerchantDetail), merchantDetailController.deleteMerchantDetail);

export default router



/**
 * @swagger
 * tags:
 *   name: MerchantDetail
 *   description: MerchantDetail
 */

/**
* @swagger
* '/api/merchantDetail':
*    get:
*      tags: [MerchantDetail]
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
*              $ref: "#/definitions/schemas/MerchantDetail"
*/

/**
* @swagger
* '/api/merchantDetail/{merchantDetailId}':
*    get:
*      tags: [MerchantDetail]
*      summary: Get merchantDetail by id
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "merchantDetailId"
*        in: "path"
*        description: "_id of merchantDetail to return"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/MerchantDetail"
*        '400':
*          description: Bad request!
*        '404':
*          description: MerchantDetail not found
*/

/**
* @swagger
* '/api/merchantDetail/{merchantDetailId}':
*    put:
*      tags: [MerchantDetail]
*      summary: Update an existing merchantDetail
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/xml"
*      - "application/json"
*      parameters:
*      - name: "merchantDetailId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      - in: "body"
*        name: "body"
*        description: "MerchantDetail object that needs to be update to the store"
*        required: true
*        schema:
*          $ref: "#/definitions/schemas/MerchantDetail"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/MerchantDetail"
*        '400':
*          description: Bad request!
*        '404':
*          description: MerchantDetail not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/merchantDetail/remove/{merchantDetailId}':
*    put:
*      tags: [MerchantDetail]
*      summary: Update an existing merchantDetail to status deleted
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "merchantDetailId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/MerchantDetail"
*        '400':
*          description: Bad request!
*        '404':
*          description: MerchantDetail not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/merchantDetail':
*    post:
*      tags: [MerchantDetail]
*      summary: Create new merchantDetail
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - in: body
*        name: merchantDetail
*        description: "Created merchantDetail object"
*        schema:
*          $ref: '#/definitions/schemas/MerchantDetail'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/MerchantDetail"
*/


/**
* @swagger
* '/api/merchantDetail/{merchantDetailId}':
*    delete:
*      tags: [MerchantDetail]
*      summary: Delete a merchantDetail
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "merchantDetailId"
*        in: "path"
*        description: "_id of object need delete"
*        required: true
*        type: "string"
*      responses:
*        '400':
*          description: Bad request!
*        '404':
*          description: MerchantDetail not found
*/


