import Layout from "../components/Layout";
import Notes from "../components/Notes";
import { useContext, useEffect } from "react";
import NoteContext from "../contexapi/NoteContex";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
 

  const contexData = useContext(NoteContext);
  const { setNotes, fetchnotes } = contexData;

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      navigate("/login");
    }
    fetchnotes();
    // eslint-disable-next-line
  }, []);

  async function addNote(url, data, token) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const myadata = await response.json();
        console.log(myadata);

        throw new Error("Request failed with status " + response.status);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata);
    e.currentTarget.reset();

    const url = "http://127.0.0.1:8000/api/addnote/";
    const token = JSON.parse(localStorage.getItem("token"));
    addNote(url, data, token);
    setNotes((preNotes) => [...preNotes, data]);
  };

  return (
    <Layout>
      <>
        <div className="container mt-4">
          <h1>Create Note</h1>
          <hr />
          <form action="" onSubmit={(e) => HandleSubmit(e)}>
            <div className="mb-3 row">
              <label htmlFor="title" className="col-sm-2 col-form-label">
                title
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="title"
                  minLength="5"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                description
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  id="description"
                  minLength="5"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="tag" className="col-sm-2 col-form-label">
                tag
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="tag"
                  className="form-control"
                  id="tag"
                  minLength="5"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Add Note
            </button>
          </form>

          <Notes />
        </div>
      </>
    </Layout>
  );
};

export default Home;
