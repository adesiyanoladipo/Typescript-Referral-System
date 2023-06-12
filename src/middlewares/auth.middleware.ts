import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import authUserRepository from '../modules/auth/auth.repository'
import userRepository from '../modules/user/user.repository'
import userTypes from '../modules/user/user.interface'

declare module 'fastify' {
    interface FastifyRequest {
      user: userTypes["User"];
    }
}

const authMiddleware = {
    async authenticateRequest (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        try {
            const token: string | undefined | string[] = request.headers.authorization || request.headers.Authorization
            if (!token) {
                return reply.code(400).send({
                    status: 400,
                    success: false,
                    message: "No Authorization was provided"
                })
            }
        
            const decoded: JwtPayload = jwt.verify(token as any, `${process.env.accessTokenPrivateKey}`) as JwtPayload;
            const authUserId = await authUserRepository.getAuthByUserId(decoded.id)
            if(!authUserId){
                return reply.code(400).send({
                    status: 400,
                    success: false,
                    message: "Login to proceed"
                })
            }
            const user = await userRepository.getUserById(authUserId.userId)
            request.user = user as (userTypes["User"]);
        } 
        catch (error) {
            if(error instanceof jwt.TokenExpiredError){
                return reply.code(400).send({
                    status: 400,
                    success: false,
                    message: "Session expired, please login again"
                })
            }
            return reply.code(400).send({
                status: 400,
                success: false,
                message: "Login to proceed"
            })
        } 
    }
}

export default authMiddleware