import React, { useContext } from 'react';
import { AccountContext } from '../hooks/AccountContext';
import Navbar from "../Navbar"


function UserSettings() {
  const {user,setUser} = useContext(AccountContext)
  return (
    <>
      <Navbar />
      <h1> This is settings page</h1>
      <h1>{user.email}</h1>
    </>
  )
}

export default UserSettings
