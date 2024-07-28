'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState(null);
  const [option2, setOption2] = useState(null);
  const [option3, setOption3] = useState(null);
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push('/login');
    }
  }, []);

  async function createPoll(e) {
    e.preventDefault();
    try {
      const data = { username, question, option1, option2, option3 };
      const response = await fetch('http://localhost:5000/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        window.alert('Poll created successfully!');
      } else {
        window.alert('Failed to create poll!');
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center w-full h-16 bg-gray-300 cursor-pointer font-bold text-black" onClick={() => router.push('/Dashboard')}>
        Dashboard
      </div>
      <div className="bg-blue-200 flex items-center justify-center h-screen">
        <div className="bg-white p-9 rounded-lg shadow-lg w-96">
          <h1 className="text-center font-bold mb-7 text-3xl underline cursor-pointer">Create Poll</h1>
          <form onSubmit={createPoll}>
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-grey-600">Question</label>
              <input type="text" id="question" name="question" value={question} onChange={(e) => setQuestion(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            <div>
              <label htmlFor="option1" className="block text-sm font-medium text-grey-600">Option 1</label>
              <input type="text" id="option1" name="option1" value={option1} onChange={(e) => setOption1(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            <div>
              <label htmlFor="option2" className="block text-sm font-medium text-grey-600">Option 2</label>
              <input type="text" id="option2" name="option2" value={option2} onChange={(e) => setOption2(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            <div>
              <label htmlFor="option3" className="block text-sm font-medium text-grey-600">Option 3</label>
              <input type="text" id="option3" name="option3" value={option3} onChange={(e) => setOption3(e.target.value)} className="mt-1 p-2 w-full border rounded-md" />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-3 w-full rounded-md mt-5 hover:bg-blue-600">Create Poll</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePoll;
