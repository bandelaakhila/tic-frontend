function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 flex items-center justify-center text-2xl font-semibold rounded-lg 
      transition-all duration-150
      ${value === "X" ? "text-indigo-400" : "text-pink-400"}
      bg-white/90 hover:bg-white active:scale-95 shadow-sm`}
    >
      {value}
    </button>
  );
}

export default Square;