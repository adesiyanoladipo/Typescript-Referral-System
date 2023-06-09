import { FastifyInstance } from "fastify";
import auth from './auth.controller'
import { $ref } from "./auth.schema";

async function userRoutes(server: FastifyInstance ) {
    server.post( '/register',  {
        schema: { body: $ref('createUserSchema') }
    }, 
    auth.registerUserHandler
    ),
    server.post('/login', auth.loginUserHandler
    )
}


export default userRoutes