import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput } from "./user.schema";
import service from "./user.service"

export async function registerUserHandler(
    request: FastifyRequest<{
    Body: CreateUserInput
    }>,
    reply: FastifyReply
) {
    try{
        const body = request.body
        const userExists = await service.findUserByEmail(body.email)
        if(userExists){
            return reply.code(400).send({
                status: 400,
                success: false,
                message: "User already exists"
            })
        }
        const user = await service.createUser(body)
        return reply.code(200).send({
            status: 200,
            success: true,
            message: user
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