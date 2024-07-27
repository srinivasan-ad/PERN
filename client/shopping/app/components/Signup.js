import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const router = useRouter();

  function checkpass() {
    return password === confirmpass;
  }

  async function onSubmition(e) {
    e.preventDefault();
    
    if (!checkpass()) {
      window.alert('Passwords do not match');
      return;
    }

    try {
      const data = { username, password };
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.status === 409) {
        window.alert('User already exists');
      } else if (response.ok) {
        const result = await response.json();
        console.log(result);
        setUsername('');
        setPassword('');
        setConfirmpass('');
        router.push('/Login');
        window.alert('Sign up successful');
      } else {
        window.alert('Failed to sign up');
      }
    } catch (err) {
      console.error(err.message);
      window.alert('Failed to sign up');
    }
  }

  return (
    <div className="bg-blue-200 flex items-center justify-center h-[100vh] w-full">
      <div className="bg-white p-9 rounded-lg shadow-lg w-96">
        <h1 className="text-center font-bold mb-7">Signup</h1>

        <form onSubmit={onSubmition}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-grey-600">Username/ Email</label>
            <input 
              type="email" 
              id="username" 
              name="username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="mt-1 p-2 w-full border rounded-md" 
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-grey-600">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="mt-1 p-2 w-full border rounded-md" 
              required 
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-grey-600">Confirm Password</label>
            <input 
              type="password" 
              id="password2" 
              name="password2" 
              value={confirmpass} 
              onChange={e => setConfirmpass(e.target.value)} 
              className="mt-1 p-2 w-full border rounded-md" 
              required 
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-3 w-full rounded-md mt-5">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
