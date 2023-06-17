import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { request } from 'http';

async function indexRoutes(server: FastifyInstance) {
  server.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.code(200).send({
        status: 200,
        success: true,
        message: 'Referral API is up and active!',
      });
  })
}

export default indexRoutes;
