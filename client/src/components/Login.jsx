import React, { useState } from 'react';
import axios from 'axios';
import "../public/styles/login.css"
import { useEffect } from 'react';

	async function loginUser(email,password) {
		axios.post(`/login`, { email, password })
		.then(res => {
		 if (res.status === 200) {
			 console.log('Logging in...');
			 console.log('Redirecting');
			 window.location.reload(true);
		 } else {
			 const error = new Error(res.error);
			 throw error;
		 }
		})
		 .catch(err => {
			 console.error(err);
			 alert('Error. Please try again');
		 });
	 }
	 
	 export default function Login() {
		 const [email, setEmail] = useState();
		 const [password, setPassword] = useState();
	 
		 const handleSubmit = async e => {
			 e.preventDefault();
			 await loginUser(
				 email,
				 password
			 );
		 }
	
  return(
    <div className="login-wrapper">
      <form id='loginForm' onSubmit={handleSubmit}>
      <h1><span className='primaryColor'>Log</span><span className='secondaryColor'> In</span></h1>
        <label>
          <p>Email</p>
          <input type="text" name="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button id='submitBtn' class='btn' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}