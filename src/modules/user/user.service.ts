import prisma from "../../utils/prisma.util";
import type from './user.interface'

const service = {
    async findUserByEmail(userEmail: string) {
        const email = userEmail
        const user = await prisma.user.findUnique({ 
            where: { email }
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
    async findUserById(userId: string) {
        if(!userId){
            return null
        }
        const user = await prisma.user.findUnique({ 
            where: { id: userId }
        }) 
        return user
    },
    // async getPaginatedReferrals(user: type["User"], offset: Number, pageSize: Number){
    //     const users = await prisma.user.findMany({
    //         where: {
    //             referredBy: user.referralCode,
    //         },
    //         skip: offset,
    //         take: pageSize
    //     })
    // },
    async getUserReferrals(user: type["User"]){
        const users = await prisma.user.findMany({
            where: {
                referredBy: user.referralCode,
            }
        })
        return users
    }
}

export default service