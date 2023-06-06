import { FastifyInstance } from "fastify";
import { registerUserHandler } from './user.controller'
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance ) {
    server.post(
        '/add-user', 
        {
        schema: {
            body: $ref('createUserSchema')
        }
    }, 
    registerUserHandler
    )
}

export default userRoutes