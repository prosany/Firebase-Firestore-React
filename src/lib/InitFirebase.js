import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx23I751Y8wnCdi1FQ5MM9-R6VhgT5KvA",
  authDomain: "fir-firestore-a9916.firebaseapp.com",
  projectId: "fir-firestore-a9916",
  storageBucket: "fir-firestore-a9916.appspot.com",
  messagingSenderId: "450785071252",
  appId: "1:450785071252:web:bc92825657cde99ec26481",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
