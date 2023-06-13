import fastify, { FastifyInstance } from 'fastify';
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import { authSchema  } from './modules/auth/auth.schema';
const uuidv4 = require("uuid").v4;

import dotenv from "dotenv"
dotenv.config()

export const port = Number(process.env.PORT) || 3000 

export const server = fastify({
    logger: true,
    genReqId(req) {
      return uuidv4();
    },
  });

server.get('/healthcheck', async function(){
    return { status: "Ok" }
})

async function main() {
    server.setErrorHandler(async (err, request, reply) => {
        return reply.code(500).send({
            status: 500,
            success: false,
            message: "Something went wrong"
        })
    }),
    server.setNotFoundHandler(async (request, reply) => {
        return reply.code(404).send({
            status: 404,
            success: false,
            message: "Page does not exist"
        })
    })
    
    for (const schema of [...authSchema, ]){
        server.addSchema(schema)
    }
    server.register(authRoutes, { prefix: 'api/auth/'})
    server.register(userRoutes, { prefix: 'api/user/'})

    try{
        await server.listen({ port: port })
        console.log('Server ready on port', port)
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

main()