import { FastifyInstance } from "fastify";
import userController from './user.controller'
import middleware from '../../middlewares/auth.middleware'

async function userRoutes(server: FastifyInstance ) {
    server.get('/dashboard', {
        preHandler: middleware.authenticateRequest,
        handler: userController.userDashboardHandler
    })
}

export default userRoutes