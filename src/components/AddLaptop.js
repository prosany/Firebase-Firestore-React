import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/InitFirebase";

export default function AddLaptop() {
  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (name === "") return;
    const laptopsRef = collection(db, "laptops");
    addDoc(laptopsRef, { name })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <React.Fragment>
      <h4>Add New Laptop</h4>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Laptop Name"
        />
        <button type="submit">Add Laptop</button>
      </form>
    </React.Fragment>
  );
}
