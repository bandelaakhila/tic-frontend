function GameStatus({ player, turn, winner }) {
  return (
    <div className="mb-3 text-left">
      {winner ? (
  winner === "draw" ? (
    <p className="text-yellow-400">It's a Draw 🤝</p>
  ) : (
    <p className="text-green-400">
      {winner === player ? "You won 🎉" : "You lost"}
    </p>
  )
) : (
  <p>{turn === player ? "Your move" : "Waiting..."}</p>
)}
    </div>
  );
}

export default GameStatus;