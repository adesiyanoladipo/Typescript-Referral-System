import userService from '../user/user.service';
import authService from './auth.service';
import type from '../user/user.interface';

const repository = {
  async findUserByEmail(email: string) {
    const user = await userService.findUserByEmail(email);
    if (user) {
      return user;
    }
    return null;
  },

  async createUser(userPayload: type['userwithAuth']) {
    const user = await authService.createUser(userPayload);
    if (user) {
      return user;
    }
    return null;
  },

  async findUserByreferralCode(referralCode: string) {
    const user = await userService.findUserByreferralCode(referralCode);
    if (!user) {
      null;
    } else {
      return user;
    }
  },
  async getAuthByUserId(userId: string) {
    const user = await authService.getAuthByUserId(userId);
    if (!user) {
      null;
    } else {
      return user;
    }
  },
};

export default repository;
