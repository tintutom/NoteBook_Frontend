import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const nevigate=useNavigate()
  
  async function createUser(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const myadata = await response.json();
        console.log(myadata)
        throw new Error("Request failed with status " + response.status);
      }

      const responseData = await response.json();
      
      if(responseData.success)
      {
      localStorage.setItem('token',JSON.stringify(responseData.token) );
      nevigate("/")
      } 
      
    } catch (error) {
      console.error("Error:", error);
    }
  }


  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata);
    e.currentTarget.reset();

    const url = "http://127.0.0.1:8000/api/login/";
    createUser(url, data);
  };
  return (
    <Layout>
      <>
        <div className="container  mt-4">
          <form action="" onSubmit={(e) => HandleSubmit(e)}>
            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                />
              </div>
            </div>
            
            <div className="mb-3 row">
              <label htmlFor="Password" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="Password"
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default Login;
