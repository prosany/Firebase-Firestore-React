import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/InitFirebase";

export default function ListLaptops({ laptops }) {
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
      <h4>List All The Laptops</h4>
      <ul>
        {laptops.map((laptop) => (
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
