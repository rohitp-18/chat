import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:5000/", {
  rejectUnauthorized: false,
  "force new connection": true,
  autoConnect: false,
});

socket.on("message received", (data) => {
  console.log(data);
});

export default socket;
