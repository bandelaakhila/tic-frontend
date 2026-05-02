import Square from "./Square";

function Board({ board, onClick }) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
      {board.map((val, i) => (
        <Square key={i} value={val} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

export default Board;