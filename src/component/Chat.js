import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import React from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRoomId } from "../features/appSlice";
import { db } from "../firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";

const Chat = () => {
  const chatRef = React.useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamps", "asc")
  );

  React.useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <React.Fragment>
          <ChatHeader>
            <ChatHeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlined />
            </ChatHeaderLeft>
            <ChatHeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </ChatHeaderRight>
          </ChatHeader>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamps, user, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamps={timestamps}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </React.Fragment>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const ChatHeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 80%;
`;

const ChatBottom = styled.div`
  margin-bottom: 90px;
`;
