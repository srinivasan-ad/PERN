'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

function CreatePoll() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400">
    <div className="bg-blue-200 w-80 h-96 flex items-center justify-center flex-col space-y-12">
 

      <button
        className="bg-green-400 p-5 rounded-md"
        onClick={() => {
          router.push("/RadioPoll");
        }}
      >
        Radio Poll
      </button>
      <button
        className="bg-green-400 p-5 rounded-md"
        onClick={() => {
          router.push("/FormData");
        }}
        >
          Text from
          </button>
        </div>
        </div>
  )
}

export default CreatePoll