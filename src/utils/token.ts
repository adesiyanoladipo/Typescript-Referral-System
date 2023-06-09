import bcrypt from 'bcrypt'
import Type from '../modules/auth/auth.interface'
import jwtToken from '../utils/jwt'

const token = {
    async hashPassword(password: string){
        return await bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    },
    async comparePasswords (
      candidatePassword: string,
      userPassword: string
    ) {
        const isMatch = await bcrypt.compare(candidatePassword, userPassword);  
        return isMatch  
    },
    async signToken(user: Type["AuthUser"]){
      return jwtToken.signJwt(user)
    }
  }

export default token