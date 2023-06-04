export default interface User {
    email: string;
    name: string;
    password: string,
    referralCode?: string;
    referredBy?: string
  }