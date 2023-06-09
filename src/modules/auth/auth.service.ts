import { CreateUserInput } from "./auth.schema";
import token from "../../utils/token";
import prisma from "../../utils/prisma";
import Utils from '../../helpers/utils'

const service = {
    async findUserByEmail(userEmail: string) {
        const email = userEmail
        const user = await prisma.user.findUnique({ 
            where: { email }
        })
        return user;
    },
    async createUser(userPayload: CreateUserInput) {
        const { password, ...rest } = userPayload
        const hash = await token.hashPassword(password) 
        const referralCode = Utils.generateString(5)
        const referredBy = userPayload.referredBy !== undefined ? userPayload.referredBy : '';
        const user = await prisma.user.create({
            data: { ...rest, referralCode: referralCode.trim(), referredBy: referredBy as any}
        })
        await prisma.auth.create({
            data: { userId: user.id, password: hash }
        })
        return user;
    },
    async findUserByreferralCode(referralCode: string) {
        if(!referralCode){
            return null
        }
        const user = await prisma.user.findUnique({ 
            where: { referralCode: referralCode }
        }) 
        return user
    },
    async getAuthByUserId(userId: string) {
        if(!userId){
            return null
        }
        const auth = await prisma.auth.findUnique({ 
            where: { userId: userId }
        }) 
        return auth
    }
}

export default service