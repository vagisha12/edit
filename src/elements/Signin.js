import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <SignInHolder>
      <SignInsideHolder>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Northeastern_Huskies_primary_logo.svg/1200px-Northeastern_Huskies_primary_logo.svg.png"
          alt=""
        />
        <h1>Sign in to NEU Social</h1>
        <p>neu.social.com</p>

        <Button onClick={signIn}>Sign in with Google</Button>
      </SignInsideHolder>
    </SignInHolder>
  );
}

export default Login;

const SignInHolder = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const SignInsideHolder = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit;
    background-color: #0a8d48;
    color: white;

    :hover {
      background-color: #0a8d48;
      color: white;
      opacity: 0.8;
      transition: all 0.2s;
    }
  }
`;
