import { createContext, useEffect, useState } from "react";

interface AuthContextData {
    username: string | null
    isAuthenticated: boolean;
    signIn: (username: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);


interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(null);


    const isAuthenticated = !!username;


    useEffect(() => {
        const savedUsername = localStorage.getItem("codeleap:username");
        if (savedUsername) setUsername(savedUsername);
    }, []);


    const signIn = async (username: string): Promise<void> => {

        localStorage.setItem("codeleap:username", username);
        setUsername(username);
    };

    const logout = async (): Promise<void> => {
        localStorage.removeItem("codeleap:username");
        setUsername(null);
    };



    return (
        <AuthContext.Provider
            value={{
                username,
                isAuthenticated,
                logout,
                signIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};