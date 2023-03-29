import axios from "axios";
import { SALES_MANAGEMENT_API, authenticationHeader } from "./env";

const deleteFeedPreference = (id)  => {
  return axios.delete(`${SALES_MANAGEMENT_API}/feed_preferences/${id}`, 
    { 
      headers: authenticationHeader()
    }
  );
};

const storeFeedPreference = (userId, content, type)  => {
  return axios.post(`${SALES_MANAGEMENT_API}/users/${userId}/feed_preferences`,
    {
      content,
      type
    },
    { 
      headers: authenticationHeader()
    }
  )
  .then((response) => {
    const { type, content, created_at } = response.data;
    return {
      type,
      content,
      createdAt: created_at,
    };
  });
};



const getUserFeedPreferences = (id)  => {
  return axios.get(`${SALES_MANAGEMENT_API}/users/${id}/feed_preferences`, 
    { 
      headers: authenticationHeader()
    }
  )
  .then((response) => {
    const feedPreferences = response.data;

    const parsedFeedPreferences = feedPreferences.map((feedPreference) => {
      const { id, type, content, created_at } = feedPreference;
      
      return {
        id,
        type,
        content,
        createdAt: created_at,
      };
    });

    return parsedFeedPreferences;
  });
};

export default {
  deleteFeedPreference,
  storeFeedPreference,
  getUserFeedPreferences,
};