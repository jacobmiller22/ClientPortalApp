import axios from "axios";

export default (url, token) => {
  axios.create({
    baseURL: "",
    url,
    headers: {
      jwt: `JWT-Token ${token}`,
    },
  });
};
