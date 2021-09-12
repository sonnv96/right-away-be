import { Router } from 'express';
import { userController } from '../controllers';
import { validate } from '../middlewares';
import { userValidation } from '../validations/user.validation';


const router = Router();
router.get("/", validate(userValidation.getUsers, true), userController.getUsers)
router.get("/:userId", validate(userValidation.getUserById), userController.getUserById)
router.put("/:userId", validate(userValidation.updateUser), userController.updateUser);
router.delete("/:userId", validate(userValidation.deleteUser), userController.deleteUser)

export default router;


/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Management
 */


/**
* @swagger
* '/api/user':
*    get:
*      tags: [User]
*      summary: Get list all users
*      produces:
*      - "application/json"
*      - "application/xml"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            type: "array"
*            items:
*              $ref: "#/definitions/schemas/User"
*/

/**
* @swagger
* '/api/user/{userId}':
*    get:
*      tags: [User]
*      summary: Get user by user id
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "userId"
*        in: "path"
*        description: "Userid of userto return"
*        required: true
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/User"
*        '400':
*          description: Bad request!
*        '404':
*          description: User not found
*/

/**
* @swagger
* '/api/user/{userId}':
*    put:
*      tags: [User]
*      summary: Update an existing user
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/xml"
*      - "application/json"
*      parameters:
*      - name: "userId"
*        in: "path"
*        description: "userid of object need update"
*        required: true
*        type: "string"
*      - in: "body"
*        name: "body"
*        description: "User object that needs to be update to the store"
*        required: true
*        schema:
*          $ref: "#/definitions/schemas/User"
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/User"
*        '400':
*          description: Bad request!
*        '404':
*          description: User not found
*        '405':
*          description: Validation exception
*/


/**
* @swagger
* '/api/user/{userId}':
*    delete:
*      tags: [User]
*      summary: Delete a user
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - name: "userId"
*        in: "path"
*        description: "userid of object need delete"
*        required: true
*        type: "string"
*      responses:
*        '400':
*          description: Bad request!
*        '404':
*          description: User not found
*/
