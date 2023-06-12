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
            return reply.code(200).send({
                status: 200,
                success: true,
                data: {
                    user: request.user,
                    referrals: referral
                }
            })
        }
        catch(e){
            return reply.code(500).send({
                status: 500,
                success: false,
                message: e
            })
        }
    },
    async userReferralHandler(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        try{
            const query = request.query as Record<string, unknown>
            const page = Number(query.page) || 1
            const pageSize = Number(query.pageSize) || 5
            const offset = (page - 1) * pageSize;

            const referral = await repository.getuserPaginatedReferrals(request.user as type["User"], offset, pageSize);
            return reply.code(200).send({
                status: 200,
                success: true,
                data: {
                    referrals: referral
                }
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