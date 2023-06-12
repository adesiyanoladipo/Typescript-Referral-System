import { FastifyReply, FastifyRequest } from "fastify";
import repository from "./user.repository"
import type from './user.interface'

const user = {
    async userDashboardHandler(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        try{
            const referral = await repository.getuserReferrals(request.user as type["User"])
            return reply.code(201).send({
                status: 201,
                success: true,
                message: 
                    request.user,
                    referrals: referral!.length
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