import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSource";
import ConversationHistory from "./ConversationHistory";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

function Conversation() {
  const chatWindowID = useSelector(selectRoomId);
  const [windowInfo] = useDocument(
    chatWindowID && db.collection("rooms").doc(chatWindowID)
  );
  const conversations = useRef(null);

  const [roomMessages, loading] = useCollection(
    chatWindowID &&
      db
        .collection("rooms")
        .doc(chatWindowID)
        .collection("messages")
        .orderBy("time", "asc")
  );

  useEffect(() => {
    conversations?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatWindowID, loading]);

  return (
    <ChatContainer>
      {windowInfo && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{windowInfo?.data().name}</strong>
                <StarBorderOutlinedIcon />
              </h4>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, time, user, studentPhoto } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  time={time}
                  user={user}
                  studentPhoto={studentPhoto}
                />
              );
            })}
            <ChatBottom ref={conversations} />
          </ChatMessages>

          <ConversationHistory
            groupName={windowInfo?.data().name}
            groupId={chatWindowID}
            conversations={conversations}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Conversation;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 8px;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
