import { createContext, ReactNode, useState } from "react";

type AuthContextProviderProps = {
    children: ReactNode;
};

type AuthContextType = {
    auth: {
        username: string;
        password: string;
        accessToken: string;
    };
    setAuth: React.Dispatch<
        React.SetStateAction<{
            username: string;
            password: string;
            accessToken: string;
        }>
    >;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = (props: AuthContextProviderProps) => {
    const [auth, setAuth] = useState({
        username: "",
        password: "",
        accessToken: "",
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
