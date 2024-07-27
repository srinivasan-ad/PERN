'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Intro() {
    const router=useRouter()
  return (
    <div className="flex  flex-col items-center justify-center min-h-screen bg-blue-100">
        <div className='bg-white w-80 h-80 flex items-center justify-center flex-col space-y-12 '>

      <Image
        src="/images/USERICON.png" 
        alt="Profile Icon"
        width={100}
        height={100}
        className="rounded-full "
      />
      <button 
        className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-700 space-y-12" onClick={()=>router.push('/Login')}
      >
        Login
      </button>
      <div className="text-gray-600 text-lg mt-20 cursor-pointer flex space-x-2"><p className='italic font-semibold text-slate-600'>Register Now? </p><p className='underline font-bold text-slate-600 hover:text-black' onClick={()=>router.push('/Signup')} >Signup</p> </div>
        </div>
    </div>
  );
}

export default Intro;
