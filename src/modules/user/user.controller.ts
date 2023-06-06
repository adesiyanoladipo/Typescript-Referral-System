import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput } from "./user.schema";
import repository from "./user.repository"

export async function registerUserHandler(
    request: FastifyRequest<{
    Body: CreateUserInput
    }>,
    reply: FastifyReply
) {
    try{
        const body = request.body
        const userExists = await repository.findUserByEmail(body.email)
        if(userExists){
            return reply.code(400).send({
                status: 400,
                success: false,
                message: "User already exists"
            })
        }
        const referralCodeExists = await repository.findUserByreferralCode(body.referredBy as string)
        if(!referralCodeExists && body.referredBy){
            return reply.code(400).send({
                status: 400,
                success: false,
                message: `User with referral code ${body.referredBy} does not exist`
            })
        }
        const user = await repository.createUser(body)
        return reply.code(201).send(user)
    }
    catch(e){
        console.log(e)
        return reply.code(500).send({
            status: 500,
            success: false,
            message: e
        })
    }
}