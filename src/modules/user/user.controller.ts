import { FastifyReply, FastifyRequest } from "fastify";

const user = {
    async userDashboardHandler(
        request: FastifyRequest<{
        }>,
        reply: FastifyReply
    ) {
        try{
            return reply.code(201).send({
                status: 201,
                success: true,
                message: request.user
            })
        }
        catch(e){
            return reply.code(500).send({
                status: 500,
                success: false,
                message: e
            })
        }
    }
}

export default user