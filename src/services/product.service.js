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

const storeProduct = (name, price, productTypeId )  => {
  return axios.post(`${SALES_MANAGEMENT_API}/product`,
    {
      name,
      price,
      product_type_id: productTypeId
    },
  )
  .then((response) => {
    const { name, price, product_type_id, id } = response.data;
    return {
      id,
      name,
      price,
      productTypeId: product_type_id
    };
  });
};

const getProducts = ()  => {
  return axios.get(`${SALES_MANAGEMENT_API}/product`, 
  )
  .then((response) => {
    const products = response.data;

    const parsedProduct = products.map((product) => {
      const { name, price, product_type_id, id } = product;
      
      return {
        id,
        name,
        price,
        productTypeId: product_type_id
      };
    });

    return parsedProduct;
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
  getProducts,
  storeProduct,
  storeProductType,
  getProductTypes,
};