import axios from "axios";

const instance = axios.create({
  //To breakdown a link in by default link
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
