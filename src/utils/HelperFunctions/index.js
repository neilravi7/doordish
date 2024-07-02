import { openDB } from "idb";

const DB_NAME = import.meta.env.VITE_DB_NAME;
const STORE_NAME = "auth";


// Make db instances
async function getDb() {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

// Setting and getting tokens
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
  if (token) {
    return token.access;
  } else {
    return null;
  }
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

// Decode the user information
export const getUser = async () => {
  const userInfo = await getAccessToken();
  if (userInfo) {
    const [, payload] = userInfo.split(".");
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  } else {
    return undefined;
  }
};

export const getUserData = async () => {
  const userInfo = await getAccessToken();
  if (userInfo) {
    const [, payload] = userInfo.split(".");
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  } else {
    return undefined;
  }
};

// Location Preferences
export async function setLocation(userLocation) {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(userLocation, "userLocationPreferences");
  await tx.done;
}

export async function getLocation() {
  const db = await getDb();
  const userLocation = await db
    .transaction(STORE_NAME)
    .objectStore(STORE_NAME)
    .get("userLocationPreferences");
  return userLocation.location;
}