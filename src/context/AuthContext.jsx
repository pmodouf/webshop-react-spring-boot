import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';



const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Om token är giltig sätt användarinformationen i state
                setUser({ email: decoded.sub });
            } catch (error) {
                // Om det finns ett problem med token, exempelvis om det inte är giltigt, logga ut användaren
                logout();
            }
        }
    }, []);

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