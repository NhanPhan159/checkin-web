export enum status {
  NON_CHECK_IN = "non-check-in",
  CHECK_IN = "check-in",
}
export const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER;

export const KEY_SECRET = import.meta.env.VITE_KEY_SECRET;

export const PAGE_SIZE = 6;

export const firebaseConfigDB = {
  apiKey: import.meta.env.VITE_API_KEY || "",

  authDomain: import.meta.env.VITE_AUTH_DOMAIN || "",

  projectId: import.meta.env.VITE_PROJECTID || "",

  storageBucket: import.meta.env.VITE_STORAGEBUCKET || "",

  messagingSenderId: import.meta.env.VITE_STORAGEBUCKET || "",

  appId: import.meta.env.VITE_APPID || "",
  measurementId: import.meta.env.VITE_MEASUREID || "",
};

export const supaConfigStorage = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "",
  publicKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "",
  bucket: import.meta.env.VITE_BUCKET || "",
};

export enum ErrorCode {
  UNKNOWN = "UNKNOWN",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
}
