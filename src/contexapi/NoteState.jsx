import React, { useEffect, useState } from "react";
import NoteContext from "./NoteContex";

const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const fetchnotes = async () => {
    const url = "http://127.0.0.1:8000/api/getnote/";
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      });
      if (!response.ok) {
        const myadata = await response.json();
      console.log(myadata)

        throw new Error("Request failed with status " + response.status);
      }
      const responseData = await response.json();
      setNotes(responseData.data)
    } catch (error) {
      console.error("Error:", error);
    }
  };


useEffect(() => {
    fetchnotes();
  }, []);
  


  const contextData = {
    notes: notes,
    setNotes: setNotes,
    fetchnotes:fetchnotes
  };
  return (
    <>
      <NoteContext.Provider value={contextData}>
        {children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
