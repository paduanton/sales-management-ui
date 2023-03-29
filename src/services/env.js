const SALES_MANAGEMENT_API = "http://localhost:8080";

const authenticationHeader = () => {
	const accessToken = localStorage.getItem("accessToken");
      
	if (accessToken) {
	  return { Authorization: `Bearer ${accessToken}`};
	}
	  return {};
      }
      
module.exports = { SALES_MANAGEMENT_API, authenticationHeader } ;
