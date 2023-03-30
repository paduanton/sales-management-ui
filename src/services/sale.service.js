import axios from "axios";
import { SALES_MANAGEMENT_API } from "./env";

const getSales = (review = false, products = [])  => {
  let queryParams = '';

  if(review && products) {
    const parsedProducts = products.map((productInfo) => {
      return `${productInfo.id}*${productInfo.quantity}`
    })

    queryParams = `?type=review&productIds=${parsedProducts.toString()}`
  }

  return axios.get(
    `${SALES_MANAGEMENT_API}/sale${queryParams}`, 
  ).then((response) => {
    return response.data;
  }).catch((response) => {
    alert("Not able to get sales, please try again!")
  });
};

const storeSale = (description, products )  => {
  return axios.post(`${SALES_MANAGEMENT_API}/sale`,
    {
      description,
      products
    },
  )
  .then((response) => {
    return response.data;
  }).catch((response) => {
    alert("Not able to store sale, please review the data and try again!")
  });
};
export default {
  getSales,
  storeSale,
};