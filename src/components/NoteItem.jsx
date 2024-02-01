import React, { useContext } from "react";
import NoteContext from "../contexapi/NoteContex";

const NoteItem = (props) => {
  const contextData = useContext(NoteContext);
  const { notes, setNotes } = contextData;
  const DeleteNote = (id) => {
    fetch(`http://127.0.0.1:8000/api/deletenote/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // The DELETE request was successful
        } else {
          // The DELETE request failed
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const newnotes = notes.filter((note) => {
      return note.id !== id;
    });
    setNotes(newnotes);
  };
  const note = props.note;
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-item-center justify-content-between">
              <h5 className="card-title">{note.title}</h5>
              <div>
                <i
                  className="fa-solid fa-trash mx-4"
                  onClick={() => DeleteNote(note.id)}
                ></i>
                <i
                  className="fa-regular fa-pen-to-square mx-4"
                  onClick={() => props.updatenote(note)}
                ></i>
              </div>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
