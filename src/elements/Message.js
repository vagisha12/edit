import React from "react";
import styled from "styled-components";

function Message({ message, time, user, studentPhoto }) {
  return (
    <ChatHolder>
      <img src={studentPhoto} alt="" />
      <ChatInfo>
        <h4>
          {user} <span>{new Date(time?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </ChatInfo>
    </ChatHolder>
  );
}

export default Message;

const ChatHolder = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;

const ChatInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
