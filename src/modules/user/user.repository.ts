import service from "./user.service"
import user from './user.interface'

const repository = {
    async findUserByEmail(email:string) {
        const user = await service.findUserByEmail(email) 
        if(user){
            return user
        }
        return null
    },

    async createUser(input: user) {
        const user = await service.createUser(input) 
        if(user){
            return user
        }
        return null
    },

    async findUserByreferralCode(input: string) {
        const user = await service.findUserByreferralCode(input)
        if(!user){
            null
        } else {
            return user
        }
    }
}

export default repository