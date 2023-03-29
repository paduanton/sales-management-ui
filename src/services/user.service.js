import axios from "axios";
import { SALES_MANAGEMENT_API, authenticationHeader } from "./env";

const getUser = (id)  => {
  return axios.get(`${SALES_MANAGEMENT_API}/users/${id}`, 
    { 
      headers: authenticationHeader()
    }
  )
  .then((response) => {
    const { name, email, username, created_at} = response.data;
    return {
      name,
      username,
      email,
      createdAt: created_at,
    };
  });
};

export default {
  getUser,
};