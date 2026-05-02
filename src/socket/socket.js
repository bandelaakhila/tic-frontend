import { io } from "socket.io-client";

const socket = io("https://tic-backend-faj0.onrender.com");

export default socket;