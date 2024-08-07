import { getAccessToken } from "../AuthServices";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const serverUrl = import.meta.env.VITE_BACKEND_URL;

const serviceCaller = async (
  methodType,
  urlPostfix,
  successMessage,
  errorMessage,
  values = null
) => {
  const API_URL = `${serverUrl}${urlPostfix}`;
  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  let response = null;

  if (methodType === "GET") {
    response = await axios.get(API_URL, { headers });
  } else if (methodType === "POST") {
    response = await axios.post(API_URL, values, { headers });
  } else if (methodType === "PUT") {
    response = await axios.put(API_URL, values, { headers });
  } else if (methodType === "DELETE") {
    console.log("will be implemented");
  }

  if (response) {
    if (response.status === 200 || response.status === 201) {
      return { data: response.data, isError: false, message: successMessage };
    } else if (response.status >= 401) {
      return { message: `${response.status}: ${errorMessage}`, isError: true };
    } else if (response.status >= 400) {
      console.log({
        message: `${response.status}: ${errorMessage}`,
        isError: true,
      });
      return { message: `${response.status}: ${errorMessage}`, isError: true };
    }
  }
};

export async function getCategory() {
  const API_URL = "/menu/api/category/list";
  const response = await serviceCaller(
    "GET",
    API_URL,
    "Data fetched successfully.",
    "Unable to fetch data"
  );
  return response;
}

export async function getAllProducts(vendorId) {
  const API_URL = `/menu/api/food/${vendorId}/items`;
  const response = await serviceCaller(
    "GET",
    API_URL,
    "Product fetched successfully.",
    "Unable to fetch product data"
  );
  return response;
}

export async function createProduct(values) {
  const API_URL = "/menu/api/food/item/create";
  const response = await serviceCaller(
    "POST",
    API_URL,
    "New Product Added.",
    "Unable to add new product",
    values
  );
  console.log("Some Error: ", response);
  return response;
}

export async function updateProduct(values, productId) {
  const API_URL = `/menu/api/food/item/${productId}/`;
  const response = await serviceCaller(
    "PUT",
    API_URL,
    "Product details updated.",
    "Unable update product details.",
    values
  );
  return response;
}

export async function getProduct(productId) {
  const API_URL = `/menu/api/food/item/${productId}/`;
  const response = await serviceCaller(
    "GET",
    API_URL,
    "Product fetched.",
    "Unable to fetched product."
  );
  return response;
}

// Vendor services

export async function getVendorData(vendorId) {
  const API_URL = `/vendor/api/${vendorId}/profile`;
  const response = await serviceCaller(
    "GET",
    API_URL,
    "Vendor Data Fetched",
    "Unable to fetch vendor data"
  );
  return response;
}

export async function updateVendorProfile(values, vendorId) {
  const API_URL = `/vendor/api/${vendorId}/profile`;
  const response = await serviceCaller(
    "PUT",
    API_URL,
    "Profile data updated successfully",
    "Unable to update profile data.",
    values
  );
  return response;
}

export async function getAllVendors() {
  const API_URL = "/vendor/api/list";
  const response = await serviceCaller(
    "GET",
    API_URL,
    "Vendor List Fetched",
    "Unable to fetch vendors"
  );
  return response;
}

// Cart services

export async function getCustomerCart() {
  /**
   * Fetches the customer's cart data from the API.
   * @returns {Promise} A promise that resolves to the customer's cart data.
   * @throws {Error} If an error occurs during the API request.
   */

  const API_URL = "/cart/api/items";
  const response = await serviceCaller(
    "GET",
    API_URL,
    "Cart data fetched successfully.",
    "Unable to fetch cart data."
  );
  return response;
}

export async function addToCart(values) {
  /**
   * Add an item into the cart.
   * values is an object which contains item and quantity data
   */

  console.log("Add to cart is calling");
  const API_URL = "/cart/api/items";
  const response = await serviceCaller(
    "POST",
    API_URL,
    "Item added into cart",
    "unable to add item into the cart",
    values
  );
  console.log("response", response);
  return response;
}

export async function updateCart(values) {
  /**
   * Add an item into the cart.
   * values is an object which contains item and quantity data
   */

  console.log("Add to cart is calling");
  const API_URL = "/cart/api/items";
  const response = await serviceCaller(
    "POST",
    API_URL,
    "Item added into cart",
    "unable to add item into the cart",
    values
  );
  console.log("response", response);
  return response;
}

export async function createCheckoutSession() {
  /**
   * request for an checkout to server
   * server return stripe hosted URL
   */
  console.log("Checkout in progress");
  const API_URL = "/checkout/api";
  const response = await serviceCaller(
    "POST",
    API_URL,
    "Checkout session started",
    "Unable to perform checkout"
  );
  return response;
}

// Customer services
export async function fetchCustomer(userId) {
  const API_URL = `/customer/api/${userId}/profile`;
  const response = await serviceCaller(
    "GET",
    API_URL,
    "Customer data fetched successfully.",
    "Unable to fetched customer data."
  );
  return response;
}

export async function fetchCustomerOrders() {
  const API_URL = "/order/api/list";
  const response = serviceCaller(
    "GET",
    API_URL,
    "User orders fetched successfully.",
    "Unable to fetched user orders."
  );
  return response;
}

export async function updateCustomerProfile(userId, values) {
  const API_URL = `/customer/api/${userId}/profile`;
  const response = serviceCaller(
    "PUT",
    API_URL,
    "Customer profile updated successfully",
    "Unable to fetched customer profile",
    values
  );
  return response;
}
