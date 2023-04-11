import React from 'react'
import { Route,Routes } from 'react-router-dom'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'
import Home from '../Components/Home'
import PrivateRoute from './PrivateRoute'

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
