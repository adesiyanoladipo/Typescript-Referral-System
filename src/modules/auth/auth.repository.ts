import service from "./auth.service"
import type from './auth.interface'

const repository = {
    async findUserByEmail(email:string) {
        const user = await service.findUserByEmail(email) 
        if(user){
            return user
        }
        return null
    },

    async createUser(userPayload: type["User"]) {
        const user = await service.createUser(userPayload) 
        if(user){
            return user
        }
        return null
    },

    async findUserByreferralCode(referralCode: string) {
        const user = await service.findUserByreferralCode(referralCode)
        if(!user){
            null
        } else {
            return user
        }
    },
    async getAuthByUserId(userId: string) {
        const user = await service.getAuthByUserId(userId)
        if(!user){
            null
        } else {
            return user
        }
    }
}

export default repository