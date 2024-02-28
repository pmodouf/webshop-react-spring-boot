import React, { createContext, useContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode';



const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const login = (token) => {
        localStorage.setItem('token', token); // Spara token i localStorage
        const decoded = jwtDecode(token); // Dekryptera token för att få användarinformation
        setUser({ email: decoded.sub }); // Spara användarinformation i state
    };



    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
