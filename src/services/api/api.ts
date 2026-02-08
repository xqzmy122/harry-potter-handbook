import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.potterdb.com",
  headers: {
    "Content-Type": "application/json",
  },
});
