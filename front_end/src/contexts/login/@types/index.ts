export interface iDefaultProviderProps {
   children: React.ReactNode;
}

export interface IloginContext{
   userLogin: (data: iUserLogin) => Promise<void>
   user: iUser | null
   userLogout: () => void
}

export interface iUser {
   id: string;
   name: string;
   email: string;
}

export interface iUserLogin {
   email_user: string;
   password_user: string;
}