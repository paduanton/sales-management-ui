import axios from "axios";
import { SALES_MANAGEMENT_API } from "./env";


const storeProductType = (description, taxPercentage)  => {
  return axios.post(`${SALES_MANAGEMENT_API}/product_type`,
    {
      description,
      tax_percentage: taxPercentage
    },
  )
  .then((response) => {
    const { description, tax_percentage, id } = response.data;
    return {
      id,
      description,
      taxPercentage: tax_percentage,
    };
  });
};



const getProductTypes = ()  => {
  return axios.get(`${SALES_MANAGEMENT_API}/product_type`, 
  )
  .then((response) => {
    const productTypes = response.data;

    const parsedProductTypes = productTypes.map((productType) => {
      const { id, description, tax_percentage } = productType;
      
      return {
        id,
        description,
        taxPercentage: tax_percentage,
      };
    });

    return parsedProductTypes;
  });
};

export default {
  storeProductType,
  getProductTypes,
};