import axios from "axios";
import { SALES_MANAGEMENT_API, authenticationHeader } from "./env";

const signup = (name, username, email, password, rememberMe)  => {
  return axios.post(`${SALES_MANAGEMENT_API}/signup`, {
    name,
    username,
    email,
    password,
    remember_me: rememberMe,
  })
  .then((response) => {
      const responseBody = response.data;
    return responseBody;
  });
};

const login = (email, password, rememberMe) => {
  return axios
    .post(`${SALES_MANAGEMENT_API}/login`, {
      email,
      password,
      remember_me: rememberMe,
    })
    .then((response) => {
      const responseBody = response.data;
      return responseBody;
    });
};

const logout = () => {
  return axios
    .post(`${SALES_MANAGEMENT_API}/logout`, 
    {},  
    { 
      headers: authenticationHeader()
    })
    .then((response) => {

      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");

      return response;
    });
};


export default {
  signup,
  login,
  logout,
};

