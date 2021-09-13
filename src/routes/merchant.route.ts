import { Router } from 'express';
import { merchantController } from '../controllers';
import { validate } from '../middlewares';
import { merchantValidation } from '../validations';


const router = Router();
router.get("/", validate(merchantValidation.getCategories), merchantController.getCategories);
router.get("/:merchantId", validate(merchantValidation.getMerchantById), merchantController.getMerchantById);
router.put("/:merchantId", validate(merchantValidation.updateMerchant), merchantController.updateMerchant);
router.put("/remove/:merchantId", validate(merchantValidation.deleteMerchant), merchantController.removeMerchant);
router.post("/", validate(merchantValidation.createMerchant), merchantController.createMerchant);
router.delete("/:merchantId", validate(merchantValidation.deleteMerchant), merchantController.deleteMerchant);

export default router



/**
 * @swagger
 * tags:
 *   name: Merchant
 *   description: Merchant
 */

/**
* @swagger
* '/api/merchant':
*    get:
*      tags: [Merchant]
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
*              $ref: "#/definitions/schemas/Merchant"
*/

/**
* @swagger
* '/api/merchant/{merchantId}':
*    get:
*      tags: [Merchant]
*      summary: Get merchant by id
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "merchantId"
*        in: "path"
*        description: "_id of merchant to return"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Merchant"
*        '400':
*          description: Bad request!
*        '404':
*          description: Merchant not found
*/

/**
* @swagger
* '/api/merchant/{merchantId}':
*    put:
*      tags: [Merchant]
*      summary: Update an existing merchant
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/xml"
*      - "application/json"
*      parameters:
*      - name: "merchantId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      - in: "body"
*        name: "body"
*        description: "Merchant object that needs to be update to the store"
*        required: true
*        schema:
*          $ref: "#/definitions/schemas/Merchant"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Merchant"
*        '400':
*          description: Bad request!
*        '404':
*          description: Merchant not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/merchant/remove/{merchantId}':
*    put:
*      tags: [Merchant]
*      summary: Update an existing merchant to status deleted
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "merchantId"
*        in: "path"
*        description: "_id of object need update"
*        required: true
*        type: "string"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Merchant"
*        '400':
*          description: Bad request!
*        '404':
*          description: Merchant not found
*        '405':
*          description: Validation exception
*/

/**
* @swagger
* '/api/merchant':
*    post:
*      tags: [Merchant]
*      summary: Create new merchant
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - in: body
*        name: merchant
*        description: "Created merchant object"
*        schema:
*          $ref: '#/definitions/schemas/Merchant'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/Merchant"
*/


/**
* @swagger
* '/api/merchant/{merchantId}':
*    delete:
*      tags: [Merchant]
*      summary: Delete a merchant
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "merchantId"
*        in: "path"
*        description: "_id of object need delete"
*        required: true
*        type: "string"
*      responses:
*        '400':
*          description: Bad request!
*        '404':
*          description: Merchant not found
*/


