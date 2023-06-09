import jwt from 'jsonwebtoken';
import config from 'config';
import Type from '../modules/auth/auth.interface'

const jwtToken = {
   async signJwt(user: Type["AuthUser"]){
    const token = jwt.sign({ id: user.id?.toString() }, `${process.env.accessTokenPrivateKey}`, {
       expiresIn: `${process.env.accessTokenExpiresIn}m`,
     });
     return token
  }
}

export default jwtToken