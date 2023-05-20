import Fastify from "fastify";

import dotenv from "dotenv"
dotenv.config()

export const server = Fastify()

server.get('/healthcheck', async function(){
    return { status: "Ok" }
})

async function main() {
    try{
        const port = process.env.PORT || 3000
        await server.listen(port, '0.0.0.0')
        console.log('Server ready on port', port)
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

main()