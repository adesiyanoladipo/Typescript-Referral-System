import { CreateUserInput } from "./user.schema";
import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import Utils from '../../helpers/utils'

const service = {
    async createUser(input: CreateUserInput) {
        const { password, ...rest } = input
        const { hash } = hashPassword(password) 
        const referralCode = Utils.generateString(5)
        const referredBy = input.referredBy !== undefined ? input.referredBy : '';
        const user = await prisma.user.create({
            data: { ...rest, password: hash, referralCode: referralCode.trim(), referredBy: referredBy}
        })
        return user;
    },
    async findUserByEmail(input: string) {
        const email = input
        const user = await prisma.user.findUnique({ 
            where: { email }
        })
        return user;
    },
    async findUserByreferralCode(input: string) {
        if(!input){
            return null
        }
        const user = await prisma.user.findUnique({ 
            where: { referralCode: input }
        }) 
        return user
    }
}

export default service