import "./App.css";
import React, { useEffect, useState } from "react";
// import ListLaptops from "./components/ListLaptops";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/InitFirebase";
import AddLaptop from "./components/AddLaptop";
import EditLaptop from "./components/EditLaptop";
import RealtimeList from "./components/RealtimeList";

function App() {
  const [laptops, setLaptops] = useState([]);
  console.log("📌 | App | laptops", laptops);

  // Get Laptops from Firestore
  const loadLaptops = () => {
    const laptopsRef = collection(db, "laptops");
    getDocs(laptopsRef)
      .then((response) => {
        // console.log(response);
        const allLaptops = response.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setLaptops(allLaptops);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Call loadLaptops() on component mount
  useEffect(() => {
    loadLaptops();
  }, []);

  return (
    <React.Fragment>
      <h1>Firebase Firestore Database CRUD</h1>
      <button onClick={loadLaptops}>Refresh List</button>
      {/* <ListLaptops laptops={laptops} /> */}
      <RealtimeList />
      <AddLaptop />
      <EditLaptop />
    </React.Fragment>
  );
}

export default App;
