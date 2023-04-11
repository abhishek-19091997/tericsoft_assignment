import React from 'react'
import Login from '../Components/Login';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
  return (
      <div>
          {token ? children : <Navigate to="/login" />}
    </div>
  )
}
