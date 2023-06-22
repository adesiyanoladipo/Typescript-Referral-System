import { FastifyReply, FastifyRequest } from 'fastify';
import repository from './auth.repository';
import hash from './../../utils/token.util';
import token from './../../utils/jwt.util';
import { z } from 'zod';

const auth = {
  async registerUserHandler(
    request: FastifyRequest<{
      Body: {
        name: string;
        email: string;
        password: string;
        referredBy: string;
      };
      Params: {
        referredBy: string;
      };
    }>,
    reply: FastifyReply
  ) {
    try {
      let referredBy = request.params.referredBy || request.body.referredBy;
      const body = request.body;
      let { name, email, password } = body;
      if (!name?.trim() || !email?.trim() || !password?.trim()) {
        return reply.code(400).send({
          status: 400,
          success: false,
          message: 'All fields are required',
        });
      }
      body.referredBy = referredBy !== null ? referredBy : '';

      const userExists = await repository.findUserByEmail(body.email);
      if (userExists) {
        return reply.code(400).send({
          status: 400,
          success: false,
          message: 'User already exists',
        });
      }
      const referralCodeExists = await repository.findUserByreferralCode(body.referredBy as string);
      if (!referralCodeExists && body.referredBy) {
        return reply.code(400).send({
          status: 400,
          success: false,
          message: `User with referral code ${body.referredBy} does not exist`,
        });
      }
      const user = await repository.createUser(body);
      return reply.code(201).send({
        status: 201,
        success: true,
        message: user,
      });
    } catch (e) {
      return reply.code(500).send({
        status: 500,
        success: false,
        message: e,
      });
    }
  },

  async loginUserHandler(
    request: FastifyRequest<{
      Body: {
        email: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) {
    try {
      let body = request.body;
      if (!body.email || !body.password) {
        return reply.code(400).send({
          status: 400,
          success: false,
          message: 'All fields are required',
        });
      }

      body.email = request.body.email.trim();
      body.password = request.body.password.trim();

      const user = (await repository.findUserByEmail(body.email)) as any;
      if (!user) {
        return reply.code(400).send({
          status: 400,
          success: false,
          message: 'Invalid credentials',
        });
      }
      const auth = (await repository.getAuthByUserId(user.id)) as any;
      const validPassword = await hash.comparePasswords(body.password, auth.password);
      if (!validPassword) {
        return reply.code(400).send({
          status: 400,
          success: false,
          message: 'Invalid credentials',
        });
      }
      const access_token = await token.signToken(user);
      return reply.code(200).send({
        status: 200,
        success: true,
        message: {
          user,
          access_token,
        },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        return reply.code(500).send({
          status: 500,
          success: false,
          message: 'Something went wrong',
        });
      }
      return reply.code(500).send({
        status: 500,
        success: false,
        message: 'Something went wrong',
      });
    }
  },
};

export default auth;
