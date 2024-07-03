import { getAccessToken } from "../AuthServices";
import axios from "axios";

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
