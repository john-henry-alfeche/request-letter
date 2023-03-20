import Cookies from "js-cookie";

export const setBearerToken = (token: any) => {
  Cookies.set("bearerToken", token, { path: "/" }); // Set cookie expiration to 1 day and path to the root of the domain
};
