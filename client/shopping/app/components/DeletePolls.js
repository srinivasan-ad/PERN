"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function DeletePolls() {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [pollSource, setPollSource] = useState("");
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      fetchPolls(storedUsername);
    } else {
      router.push("/Login");
    }
  }, []);

  const fetchPolls = async (username) => {
    try {
      const response = await fetch(`http://localhost:5000/polls/${username}/created`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPolls(data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const deletePoll = async (pollId, source) => {
    try {
      const response = await fetch(`http://localhost:5000/delete/${pollId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ source })
      });
      if (response.ok) {
        window.alert("Poll deleted successfully");
        fetchPolls(username);
      } else {
        window.alert("Error deleting poll");
      }
    } catch (error) {
      console.error("Error deleting poll:", error);
      window.alert("Error deleting poll");
    }
  };

  const handlePollSelect = (e) => {
    const selectedPollId = parseInt(e.target.value);
    const selectedPoll = polls.find(poll => poll.id === selectedPollId);
    setSelectedPoll(selectedPollId);
    setPollSource(selectedPoll.source);
    console.log("Selected Poll:", selectedPollId, "Source:", selectedPoll.source);
  };

  const handleDeleteResponse = () => {
    if (selectedPoll) {
      deletePoll(selectedPoll, pollSource);
    }
  };

  return (
    <div className="h-[100vh] w-full flex flex-col mx-auto items-center space-y-12">
      <div className="w-full bg-slate-300 flex justify-center h-16 items-center">
        <p
          className="font-bold text-black cursor-pointer"
          onClick={() => {
            router.push("/Dashboard");
          }}
        >
          Dashboard
        </p>
      </div>
      <h1 className="text-2xl font-bold mb-4">Delete Poll</h1>
      <div className="w-full h-screen flex items-center flex-col">
        <label htmlFor="poll" className="block text-xl font-semibold text-grey-600">
          Select Poll
        </label>
        <select
          id="poll"
          name="poll"
          value={selectedPoll || ""}
          onChange={handlePollSelect}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="">Select a poll</option>
          {polls.map((poll) => (
            <option key={poll.id} value={poll.id}>
              {poll.question}
            </option>
          ))}
        </select>
      </div>
      {selectedPoll && (
        <button
          onClick={handleDeleteResponse}
          className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Delete Poll
        </button>
      )}
    </div>
  );
}

export default DeletePolls;
