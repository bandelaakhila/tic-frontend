import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

 const joinGame = () => {
  if (!username.trim() || !room.trim()) {
    alert("Please enter username and room ID");
    return;
  }

  navigate("/game", { state: { username, room } });
};

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div
        className="bg-white/10 backdrop-blur-md p-7 rounded-2xl shadow-xl w-full max-w-sm border border-white/10"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        <h1 className="text-2xl font-semibold text-white mb-5 text-left">
          Play Tic-Tac-Toe
        </h1>

        <p className="text-sm text-gray-300 mb-4">
          Enter your name and a room ID to start playing.
        </p>

        <input
          placeholder="Your name"
          className="w-full p-2.5 mb-3 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-1 focus:ring-indigo-400"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Room ID (e.g. 123)"
          className="w-full p-2.5 mb-4 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-1 focus:ring-indigo-400"
          onChange={(e) => setRoom(e.target.value)}
        />

        <button
          onClick={joinGame}
          className="w-full bg-indigo-500 text-white py-2.5 rounded-md hover:bg-indigo-600 transition"
        >
          Join Game
        </button>
      </div>
    </div>
  );
}

export default Home;