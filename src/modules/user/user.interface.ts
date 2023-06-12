interface Types {
    User: User,
    userwithAuth: userwithAuth
}
  
interface userwithAuth {
    email: string;
    name: string;
    password: string,
    referralCode?: string;
    referredBy?: string
}

interface User {
    email: string;
    name: string;
    referralCode?: string;
    referredBy?: string
}
  
export default Types