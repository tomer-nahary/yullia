import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

const userContext = React.createContext();
export function useUser(){
    return useContext(userContext);
}

export function UserContext({children}) {
    const [user, setUser] = useState();
    const [logInFailed, setlogInFailed] = useState(false);

    const login = (userId, password, keep) =>{
        axios.post('/api/login', {userId, password, keep})
        .then(res => setUser(res.data))
        .catch(err => {
            if(err.response && err.response.status === 401) setlogInFailed(true);
        });
    }
    const logout = () =>{
        axios.post('/api/logout')
        .then(() => setUser({isAuth: false}));
    }
    const getUser = () =>{
        axios.get('/api/user')
        .then(res => setUser(res.data))
        .catch(err => setUser({isAuth: false}))
    }
    const logInTry = () => setlogInFailed(false);
    useEffect(getUser, []);

    const value = {
        user,
        login,
        logout,
        logInFailed,
        logInTry
    };
    if(!user) return <></>
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}
