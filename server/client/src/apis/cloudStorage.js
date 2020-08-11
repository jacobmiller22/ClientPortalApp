import axios from "axios";

export default (token) => {
  axios.create({
    baseURL: "",
    headers: {
      Authorizaton: `Client-ID ${token}`,
    },
  });
};
