import Fastify from "fastify";
import userRoutes from "./modules/user/user.route";
import { userSchema  } from './modules/user/user.schema';
const uuidv4 = require("uuid").v4;

import dotenv from "dotenv"
dotenv.config()

export const server = Fastify({
    logger: true,
    genReqId(req) {
      return uuidv4();
    },
  });


server.get('/healthcheck', async function(){
    return { status: "Ok" }
})

async function main() {

    for (const schema of [...userSchema, ]){
        server.addSchema(schema)
    }
    server.register(userRoutes, { prefix: 'api/users'})
    try{
        const port = Number(process.env.PORT) || 3000 
        await server.listen({ port: port })
        console.log('Server ready on port', port)
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

main()