import { openDB } from "idb";
import axios from "axios";

const DB_NAME = import.meta.env.VITE_DB_NAME;
const STORE_NAME = "auth";

const serverUrl = import.meta.env.VITE_BACKEND_URL;

async function getDb() {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function setToken(token) {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(token, "admittance_jwt");
  await tx.done;
}

export async function getAccessToken() {
  const db = await getDb();
  const token = await db
    .transaction(STORE_NAME)
    .objectStore(STORE_NAME)
    .get("admittance_jwt");
  return token.access;
}

export async function getRefreshToken() {
  const db = await getDb();
  const token = await db
    .transaction(STORE_NAME)
    .objectStore(STORE_NAME)
    .get("admittance_jwt");
  return token.refresh;
}

export async function deleteToken() {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).delete("admittance_jwt");
  await tx.done;
}

export async function login(values) {
  try {
    const response = await axios.post(`${serverUrl}/auth/api/login`, values);
    if (response.status === 200 || response.status === 201) {
      console.log("Login Successfully");
      await setToken(response.data);
      return { isError: false, message: "Login successfully" };
    } else {
      return {
        isError: true,
        message: `${response.status} Invalid credentials`,
      };
    }
  } catch (error) {
    console.log("Some Code level problems");
    if (error.response.status === 400 || error.response.status > 400) {
      return {
        isError: true,
        message: `${error.response.status} Invalid credentials`
      };
    } else {
      // Handle network errors or other exceptions
      return { isError: true, message: "Ops some error occurred!!" };
    }
  }
}

export async function register(values) {
  try {
    const response = await axios.post(`${serverUrl}/auth/api/register`, values);
    if (response.status === 200 || response.status === 201) {
      console.log("Register Successfully");
      await setToken(response.data);
      return { 
        isError: false, 
        message: "Register successfully" 
      };
    } else {
      return {
        isError: true,
        message: `${response.status} Missing require fields`,
      };
    }
  } catch (error) {
    console.log("Some Code level problems");
    if (error.response.status === 400 || error.response.status > 400) {
      return {
        isError: true,
        message: `${error.response.status} Missing require fields.`
      };
    } else {
      // Handle network errors or other exceptions
      return { isError: true, message: "unable to connect server!!" };
    }
  }
}
