interface Types {
  User: User,
  AuthUser: AuthUser
}

interface User {
  email: string;
  name: string;
  password: string,
  referralCode?: string;
  referredBy?: string
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  password: string,
}

export default Types