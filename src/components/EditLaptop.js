import React, { useState } from "react";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../lib/InitFirebase";
import { getDate } from "../helpers/getDate";

export default function EditLaptop() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleEdit = (e) => {
    e.preventDefault();
    if (name === "" && id === "") return;
    const laptopRef = doc(db, "laptops", id);
    updateDoc(laptopRef, { name })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleRMEdit = (e) => {
    e.preventDefault();
    if (name === "" && id === "") return;
    const laptopRef = doc(db, "laptops", id);
    setDoc(laptopRef, { name, created_On: getDate() })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <React.Fragment>
      <h4>Edit Laptop</h4>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Laptop ID"
        />{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Laptop Name"
        />
        <button type="submit">Edit Laptop</button>
        <button onClick={handleRMEdit}>Edit Full Doc</button>
      </form>
    </React.Fragment>
  );
}
