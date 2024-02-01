import React, { useContext, useRef, useState } from "react";
import NoteContext from "../contexapi/NoteContex";
import NoteItem from "./NoteItem";

const Notes = () => {
  const contexData = useContext(NoteContext);
  const ref = useRef(null);
  const refclose = useRef(null);

  const { notes,fetchnotes } = contexData;
  const [currentnote, setCurrentnote] = useState({
    id: null,
    title: "",
    description: "",
    tag: "",
  });

  const updatenote = (note) => {
    ref.current.click();
    setCurrentnote(note);
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:8000/api/updatenote/${currentnote.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentnote),
    })
      .then((Response) => {
        fetchnotes();
      })
      .catch((error) => {
      });

    refclose.current.click();
  };

  return (
    <>
      <h1>My Notes</h1>
      {/* Button trigger modal */}

      <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>
        {/* Modal */}
        <div
          className="modal fade "
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form action="" onSubmit={(e) => HandleSubmit(e)}>
                  <div className="mb-3 row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">
                      title
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        minLength="5"
                        name="title"
                        className="form-control"
                        id="title"
                        value={currentnote.title}
                        onChange={(e) => {
                          setCurrentnote((value) => ({
                            ...value,
                            title: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="description"
                      className="col-sm-2 col-form-label"
                    >
                      description
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="description"
                        className="form-control"
                        id="description"
                        minLength="5"
                        value={currentnote.description}
                        onChange={(e) => {
                          setCurrentnote((value) => ({
                            ...value,
                            description: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label htmlFor="tag" className="col-sm-2 col-form-label">
                      tag
                    </label>
                    <div className="col-sm-10">
                      <input
                        minLength="5"
                        type="text"
                        name="tag"
                        className="form-control"
                        id="tag"
                        value={currentnote.tag}
                        onChange={(e) => {
                          setCurrentnote((value) => ({
                            ...value,
                            tag: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      ref={refclose}
                    >
                      Close
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Update Note
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {notes.map((note) => {
          return <NoteItem key={note.id} note={note} updatenote={updatenote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
