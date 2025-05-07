export enum status {
  NON_CHECK_IN="non-check-in",
  CHECK_IN="check-in"
}
export const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER

console.log(444,import.meta.env.VITE_AUTH_DOMAIN)
export const firebaseConfigDB = {
  apiKey: "AIzaSyCWxgr8dU1uUNZwPdn-26h55uJPwB57Q1I",

  authDomain: "checkin-494fd.firebaseapp.com",

  projectId: "checkin-494fd",

  storageBucket: "checkin-494fd.firebasestorage.app",

  messagingSenderId: "65384939807",

  appId: "1:65384939807:web:358b7d7d3b5f92df27b02a",

  measurementId: "G-B9FFQVWKPG"

};

export const firebaseConfigStorage = {
  apiKey: "AIzaSyAkMYiVcgNPSXE5nSns-tZJeou4xu1p_mQ",

  authDomain: "tripdly-8f271.firebaseapp.com",

  projectId: "tripdly-8f271",

  storageBucket: "tripdly-8f271.appspot.com",

  messagingSenderId: "352575218992",

  appId: "1:352575218992:web:15782e13030225c5a7d4f5",

  measurementId: "G-ZKH77Y1XY3"

};
