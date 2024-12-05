import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PublickPages = () => {
    const user = useSelector(state => state.user);
    if(user){
        return <Navigate to='/home' replace/>
    }else{
        return <Outlet/>
    }
}

export default PublickPages
