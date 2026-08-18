import axios from "axios";

export let apiurl = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
