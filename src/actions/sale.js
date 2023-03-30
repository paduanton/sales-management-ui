import SaleService from "../services/sale.service";

// TODO
/*
  Implement Http Interceptor to handle API requests/responses
*/

export const storeSale = (description, products)  => (dispatch) => {
  return SaleService.storeSale(description, products).then(
    (response) => {  
      return Promise.resolve();
    },
    (error) => {
      console.log(error);

      return Promise.reject();
    }
  );
};