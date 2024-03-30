import axios from "axios";

let token = JSON.parse(localStorage.getItem("token"));
if (!token) {
  token = "";
}

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
