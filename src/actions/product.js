import ProductService from "../services/product.service";

// TODO
/*
  Implement Http Interceptor to handle API requests/responses
*/

export const storeProductType = (description, taxPercentage) => (dispatch) => {
  return ProductService.storeProductType(description, taxPercentage).then(
    (response) => {  
      return Promise.resolve();
    },
    (error) => {
      console.log(error);

      return Promise.reject();
    }
  );
};

export const storeProduct = (name, price, productTypeId )  => (dispatch) => {
  return ProductService.storeProduct(name, price, productTypeId ) .then(
    (response) => {  
      return Promise.resolve();
    },
    (error) => {
      console.log(error);

      return Promise.reject();
    }
  );
};