interface Types {
    User: User
}
  
interface User {
    email: string;
    name: string;
    password: string,
    referralCode?: string;
    referredBy?: string
}
  
export default Types