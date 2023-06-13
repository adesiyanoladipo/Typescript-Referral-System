import userService from "../user/user.service"
import type from './user.interface'

const repository = {
    async getUserById(userId: string) {
        const user = await userService.findUserById(userId)
        if(!user){
            return null
        } else {
            return user
        }
    },
    async getuserPaginatedReferrals(user: type["User"], offset: number, pageSize: number){
        const userReferrals = await userService.getPaginatedReferrals(user, offset, pageSize)
        if(!userReferrals){
            return null
        }
        else {
            return userReferrals
        }
        
    },
    async getuserReferrals(user: type["User"], offset?: number, pageSize?: number){
        try{
            if(!offset && !pageSize){
                const page = 1;
                pageSize = 5
                offset = (page - 1) * Number(pageSize)
            }

            const userReferrals = await userService.getUserReferrals(user, offset!, pageSize!)
            if(!userReferrals){
                return null
            }
            else {
                return userReferrals
            }
        }
        catch(err){
            console.log(err)
        }
    },
    async deleteUserByEmail(email: string){
        try{
            const user = await userService.deleteUserByEmail(email)
            return user
        }
        catch(err){
            console.log(err)
        }
    }
}

export default repository