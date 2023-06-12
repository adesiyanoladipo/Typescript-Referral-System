import prisma from "../../utils/prisma.util";

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
    }
}

export default service