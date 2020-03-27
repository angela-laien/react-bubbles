import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
    const [user, setUser] = useState({
      username: "",
      password: ""
    })
    const handleChange = e => {
      setUser({
        ...user, 
        [e.target.name]: e.target.value
      })
    }
    const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
        .post("/api/login", user)
        .then(res => {
          console.log(res);
          localStorage.setItem('token', JSON.stringify(res.data.payload));
          props.history.push("/bubble-page")
        })
        .catch(err =>{
          console.log(err)
        })
    }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <h4>Username</h4>
        <input
          type="username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <h4>Password</h4>
        <input
          type="password"
          name="password"
          value={user.passwword}
          onChange={handleChange}
        />
        <button type="submuit">Login</button>
      </form>
    </>
  );
};

export default Login;
