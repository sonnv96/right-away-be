import { Router } from 'express';
import { authController } from '../controllers';


const router = Router();
router.post('/login', authController.authenticate)
router.post('/getUserByToken', authController.getUserbyToken)
router.post('/refresh-token',authController.refreshToken)
router.post('/change-password', authController.changePassword)
router.post('/register', authController.register)

export default router;



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */


/**
* @swagger
* '/api/auth/login':
*    post:
*      tags: [Auth]
*      summary: Login
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
*          $ref: '#/definitions/schemas/LoginModel'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/User"
*/

/**
* @swagger
* '/api/auth/getUserByToken':
*    post:
*      tags: [Auth]
*      summary: Get user infomation by token
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - in: body
*        name: Access token
*        description: "Access token valid"
*        schema:
*          $ref: '#/definitions/schemas/AccessToken'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/User"
*/


/**
* @swagger
* '/api/auth/refresh-token':
*    post:
*      tags: [Auth]
*      summary: Get user infomation by refesh token
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - in: body
*        name: refresh token
*        description: "Refesh token valid"
*        schema:
*          $ref: '#/definitions/schemas/RefeshToken'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/User"
*/

/**
* @swagger
* '/api/auth/change-password':
*    post:
*      tags: [Auth]
*      summary: Change password of user existed
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - in: body
*        name: Change password
*        description: "Change password"
*        schema:
*          $ref: '#/definitions/schemas/ChangePasswordModel'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/User"
*/

/**
* @swagger
* '/api/auth/register':
*    post:
*      tags: [Auth]
*      summary: Register new user
*      consumes:
*      - "application/json"
*      - "application/xml"
*      produces:
*      - "application/json"
*      - "application/xml"
*      parameters:
*      - in: body
*        name: Register new user
*        description: "Register new user"
*        schema:
*          $ref: '#/definitions/schemas/User'
*      responses:
*        '200':
*          description: "successful operation"
*          schema:
*            $ref: "#/definitions/schemas/User"
*/





