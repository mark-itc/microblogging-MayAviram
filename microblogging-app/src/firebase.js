import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB4UjwCihP3Benr_R0tbY2vEy9lOdyhYgA",
  authDomain: "microblogging--app.firebaseapp.com",
  projectId: "microblogging--app",
  storageBucket: "microblogging--app.appspot.com",
  messagingSenderId: "876888444915",
  appId: "1:876888444915:web:885ae8c5c067adc9f9cc86",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
