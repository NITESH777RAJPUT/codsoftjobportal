// context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(savedUsers);
    }, []);

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    const addUser = (user) => {
        setUsers([...users, { ...user, id: Date.now() }]);
    };

    const updateUser = (userId, updatedData) => {
        setUsers(users.map(u => u.id === userId ? { ...u, ...updatedData } : u));
    };

    return (
        <UserContext.Provider value={{ users, addUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
