"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Dashboard() {
  const router = useRouter();
  return (
    <>
      <div className="w-full bg-slate-300 h-16 flex text-center items-center justify-center">
        <p
          className="font-bold text-center text-black cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          Logout
        </p>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400">
        <div className="bg-blue-200 w-80 h-96 flex items-center justify-center flex-col space-y-6">
          <button
            className="bg-green-400 p-5 rounded-md"
            onClick={() => {
              router.push("/CreatePoll");
            }}
          >
            Create Poll
          </button>
          <button
            className="bg-green-400 p-5 rounded-md"
            onClick={() => {
              router.push("/ViewPoll");
            }}
          >
            View Poll
          </button>
          <button
            className="bg-green-400 p-5 rounded-md"
            onClick={() => {
              router.push("/DownloadResults");
            }}
          >
            Download Results
          </button>
          <button
            className="bg-green-400 p-5 rounded-md"
            onClick={() => {
              router.push("/DeletePolls");
            }}
          >
        Delete Polls
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
