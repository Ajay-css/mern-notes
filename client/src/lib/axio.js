import axios from "axios";

const api = axios.create({
    baseURL: "https://notes-app-backend-cuif.onrender.com/api",
});

export default api;