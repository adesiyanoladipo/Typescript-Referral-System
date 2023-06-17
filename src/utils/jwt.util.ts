import jwt from 'jsonwebtoken';
import Type from '../modules/auth/auth.interface';

const jwtToken = {
  async signToken(authUser: Type['AuthUser']) {
    const token = jwt.sign({ id: authUser.id?.toString() }, `${process.env.accessTokenPrivateKey}`, {
      expiresIn: `${process.env.accessTokenExpiresIn}m`,
    });
    return token;
  },
};

export default jwtToken;
