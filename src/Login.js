import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    // Check if the passwords match during signup
    if (enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDA0MnYovAyBq-q5_FGCq5ZyxG_OYvpF50";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDA0MnYovAyBq-q5_FGCq5ZyxG_OYvpF50";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.idToken);
        console.log("User logged in");
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        confirmPasswordInputRef.current.value='';
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p
          className="d-flex justify-content-center mb-4"
          style={{
            color: "blue",
            textShadow: "0 0 10px rgba(0, 0, 255, 0.8)",
            fontWeight: "bold",
          }}
        >
          Please Sign-in/ Sign-Up
        </p>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordInputRef}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button onClick={submitHandler} variant="primary" type="submit">
            {isLogin ? "Login" : "Create Account"}
          </Button>
        </div>

        <div
          onClick={switchAuthModeHandler}
          type="submit"
          className="d-flex justify-content-center mt-2"
        >
          {isLogin ? "Create Account" : "Login with an existing account"}
        </div>
      </Form>
    </div>
  );
};

export default Login;