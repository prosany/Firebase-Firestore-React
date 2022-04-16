import React, { useEffect, useState } from "react";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/InitFirebase";
import sortByDate from "../helpers/sortByDate";
import realNotifications, {
  sendNotification,
} from "../helpers/getNotification";

export default function RealtimeList() {
  const [laptops, setLaptops] = useState([]);
  const [laptopsLength, setLaptopsLength] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "laptops"), (snapshot) => {
      const allLaptops = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setLaptops(allLaptops);
      setLaptopsLength(allLaptops.length);
      if (laptopsLength !== allLaptops.length && allLaptops.length !== 0)
        return realNotifications(
          sendNotification(
            "Laptop List Updated!",
            `Laptop List is Updated at ${new Date().toLocaleDateString()}`
          )
        );
    });

    return () => {
      unsubscribe();
    };
  }, [laptopsLength]);

  const deleteLaptop = (id) => {
    const laptopRef = doc(db, "laptops", id);
    deleteDoc(laptopRef)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <React.Fragment>
      <h4>Realtime List</h4>
      <ul>
        {sortByDate(laptops).map((laptop) => (
          <li key={laptop.id}>
            {laptop.name} <sup>{laptop.id}</sup>{" "}
            <button onClick={() => deleteLaptop(laptop.id)}>
              ⛔ Delete Laptop
            </button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
