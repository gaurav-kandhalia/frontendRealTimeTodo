import { io } from "socket.io-client";

const socket = io("http://localhost:5911");

export default socket;