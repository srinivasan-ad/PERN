'use client'; // This must be at the very top

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function onLogin(e) {
    e.preventDefault();
    try {
      const data = { username, password };
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.status === 404) {
        window.alert('Not registered, please signup first :)');
      } else if (response.status === 401) {
        window.alert('Entered wrong password!');
      } else if (response.status === 200) {
        setUsername('');
        setPassword('');
        window.alert('Logged in successfully ;)');
        router.push('/Dashboard');
      } else {
        window.alert('Failed to Login !');
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center w-full bg-gray-300 cursor-pointer font-bold text-black" onClick={() => router.push('/')}>
        Home
      </div>
      <div className="bg-blue-200 flex items-center justify-center h-screen">
        <div className="bg-white p-9 rounded-lg shadow-lg w-96">
          <h1 className="text-center font-bold mb-7 text-3xl underline cursor-pointer">Login</h1>
          <form onSubmit={onLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-grey-600">Username</label>
              <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 p-2 w-full border rounded-md"></input>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-grey-600">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 w-full border rounded-md"></input>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-3 w-full rounded-md mt-5 hover:bg-blue-600">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

