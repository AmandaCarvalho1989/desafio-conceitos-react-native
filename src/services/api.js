import axios from "axios";

const api = axios.create({
  // baseURL: "http://10.0.2.2:3335" - To emulate on Android Studio,
   baseURL: "http://localhost:3335",
});

export default api;
