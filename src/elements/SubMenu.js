import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SubmenuOption from "./SubMenuOpt";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [Rooms] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);

  return (
    <SubmenuHolder>
      <SubmenuHeader>
        <SubmenuInfo>
          <h2>NEU SOCIAL </h2>
          <h3>
            <FiberManualRecordIcon />
            {user.displayName}
          </h3>
        </SubmenuInfo>
        <CreateIcon />
      </SubmenuHeader>

      <SubmenuOption Icon={InsertCommentIcon} title="Threads" />
      <SubmenuOption Icon={InboxIcon} title="Mentions" />
      <SubmenuOption Icon={DraftsIcon} title="Saved items" />
      <SubmenuOption Icon={BookmarkBorderIcon} title="Room Collection" />
      <SubmenuOption Icon={PeopleAltIcon} title="People" />
      <SubmenuOption Icon={AppsIcon} title="Apps" />
      <SubmenuOption Icon={FileCopyIcon} title="All files" />
      <SubmenuOption Icon={ExpandLessIcon} title="Display minimize" />
      <hr />

      <SubmenuOption Icon={ExpandMoreIcon} title="Rooms" />
      <hr />
      <SubmenuOption Icon={AddIcon} addChannelOption title="Add Channel" />

      {Rooms?.docs.map((doc) => (
        <SubmenuOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SubmenuHolder>
  );
}

export default Sidebar;

const SubmenuHolder = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  overflow-y: scroll;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  > hr {
    height: 1px;
    border: 0;
    background-color: #49474b;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const SubmenuHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SubmenuInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
