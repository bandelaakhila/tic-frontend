import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import Board from "../components/Board";
import GameStatus from "../components/GameStatus";

function Game() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ SAFE CHECK (prevents crash)
  const state = location.state;

  if (!state) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <div>
          <p>No game data found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-3 px-4 py-2 bg-indigo-500 rounded"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const { username, room } = state;

  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("");
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // ✅ join game
    socket.emit("join_game", { room, username });

    // ✅ assign player
    const handlePlayer = (p) => {
      setPlayer(p);
    };

    // ✅ update game
    const handleGame = (game) => {
      if (!game) return;
      setBoard(game.board || Array(9).fill(null));
      setTurn(game.turn || "X");
      setWinner(game.winner || null);
    };

    socket.on("player_assigned", handlePlayer);
    socket.on("game_state", handleGame);

    // ✅ cleanup
    return () => {
      socket.off("player_assigned", handlePlayer);
      socket.off("game_state", handleGame);
    };
  }, [room, username]);

  const handleClick = (index) => {
    if (!player) return;
    if (board[index] || winner) return;
    if (turn !== player) return;

    socket.emit("make_move", { room, index });
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-sm">
            Room: <span className="font-medium">{room}</span>
          </h2>

          <span className="text-xs text-gray-300">
            {player ? `You: ${player}` : "Connecting..."}
          </span>
        </div>

        {/* Status */}
        <GameStatus player={player} turn={turn} winner={winner} />

        {/* Board */}
        <Board board={board} onClick={handleClick} />
        <button
  onClick={() => socket.emit("restart_game", { room })}
  className="mt-4 w-50px bg-indigo-500 text-white py-2 rounded-md"
>
  Restart Game 🔄
</button>

      </div>
      
    </div>
    
  );
}

export default Game;