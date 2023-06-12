import userService from "../user/user.service"

const repository = {
    async getUserById(userId: string) {
        const user = await userService.findUserById(userId)
        if(!user){
            null
        } else {
            return user
        }
    }
}

export default repository