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
    // async getuserPaginatedReferrals(user: type["User"], offset: Number, pageSize: Number){
    //     const userReferrals = await userService.getPaginatedReferrals(user, offset, pageSize)
    //     if(!userReferrals){
    //         return null
    //     }
    //     else {
    //         return userReferrals
    //     }
        
    // },
    async getuserReferrals(user: type["User"]){
        try{
            const userReferrals = await userService.getUserReferrals(user)
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
    } 
}

export default repository