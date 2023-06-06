import { FastifyInstance } from "fastify";
import { registerUserHandler } from './user.controller'
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance ) {
    server.post(
        '/add-user', 
        {
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('createUserResponseSchema')
            }
        }
    }, 
    registerUserHandler
    )
}

export default userRoutes

// response: {
//     status: 201,
//     success: true,
//     message: $ref('createUserResponseSchema')
// }