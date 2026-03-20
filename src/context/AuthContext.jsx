import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
    const [role, setRole] = useState(localStorage.getItem("userRole") || null);

    const login = (newToken, userRole) => {
        setToken(newToken);
        setRole(userRole);
        localStorage.setItem("accessToken", newToken);
        if (userRole) localStorage.setItem("userRole", userRole);
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, role, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
