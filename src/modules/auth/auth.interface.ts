interface Types {
  AuthUser: AuthUser;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

export default Types;
