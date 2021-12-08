import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ConversationHistory({ groupName, groupId, conversations }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendChat = (e) => {
    e.preventDefault();

    if (!groupId) {
      return false;
    }
    db.collection("rooms").doc(groupId).collection("messages").add({
      message: input,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      studentPhoto: user.photoURL,
    });

    conversations?.current?.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          placeholder={`Message #${groupName}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button hidden type="submit" onClick={sendChat}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ConversationHistory;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none;
  }
`;
