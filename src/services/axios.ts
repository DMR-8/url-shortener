import axios from "axios";

const key = "dffa0d2a15bdc7356ea31d9fef5052bc81e37f55";

const api = axios.create({
  baseURL: "https://api-ssl.bitly.com/v4/",
  headers: {
    Authorization: `Bearer ${key}`,
  },
});

export default api;
