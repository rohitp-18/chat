import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:5000/", {
  rejectUnauthorized: false,
});

export default socket;
