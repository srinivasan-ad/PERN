'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function ViewPolls() {
  const [polls, setPolls] = useState([]);
  const [poll, setPoll] = useState(null);
  const [option, setOption] = useState('');
  const router = useRouter();
  const user = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      getPolls();
    }
  }, []);

  const getPolls = async () => {
    try {
      const res = await fetch(`http://localhost:5000/polls/${user}/unanswered`);
      if (!res.ok) {
        throw new Error('Failed to fetch polls');
      }
      const data = await res.json();
      setPolls(data);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  const getPoll = async (pollId) => {
    try {
      const res = await fetch(`http://localhost:5000/polls/${pollId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch poll details');
      }
      const data = await res.json();
      setPoll(data);
      setOption('');
    } catch (error) {
      console.error('Error fetching poll details:', error);
    }
  };

  const handlePollChange = (e) => {
    const pollId = parseInt(e.target.value);
    getPoll(pollId);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const submitResponse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/responses', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          pollId: poll.id,
          username: user,
          response: option
        })
      });
      if (!res.ok) {
        throw new Error('Failed to submit response');
      }
      alert('Response submitted successfully');
      getPolls();
      setPoll(null);
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  return (
    <div className="h-[100vh] w-full  mx-auto  flex flex-col space-y-12 items-center">
        <div className='w-full bg-slate-300  flex items-center justify-center h-16'>
<p className='font-bold  text-black cursor-pointer'onClick={()=>{router.push('/Dashboard')}}>Dashboard</p>
        </div>
      <h1 className="text-2xl font-bold mb-4">Unanswered Polls</h1>
      <form onSubmit={submitResponse}>
        <div className='space-y-12 items-center flex flex-col'>
          <label  className=" text-xl font-semibold  text-grey-600">Select Poll</label>
          <select id="poll" name="poll" value={poll?.id || ''} onChange={handlePollChange} className="mt-1 p-2 w-full border rounded-md">
            <option value="">Select a poll</option>
            {polls.map((p) => (
              <option key={p.id} value={p.id}>{p.question}</option>
            ))}
          </select>
        </div>
        {poll && (
          <div>
            <h2 className="mt-4 mb-2 text-xl font-semibold">{poll.question}</h2>
            <div>
              <label>
                <input type="radio" name="response" value={poll.option1} onChange={handleOptionChange} />
                {poll.option1}
              </label>
            </div>
            <div>
              <label>
                <input type="radio" name="response" value={poll.option2} onChange={handleOptionChange} />
                {poll.option2}
              </label>
            </div>
            {poll.option3 && (
              <div>
                <label>
                  <input type="radio" name="response" value={poll.option3} onChange={handleOptionChange} />
                  {poll.option3}
                </label>
              </div>
            )}
            <button type="submit" className="bg-blue-500 text-white p-3 w-full rounded-md mt-5 hover:bg-blue-600">Submit Response</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ViewPolls;
