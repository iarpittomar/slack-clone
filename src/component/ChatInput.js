import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [input, setInput] = React.useState("");
  const [user] = useAuthState(auth);

  const sendMessage = React.useCallback(
    (e) => {
      e.preventDefault();

      if (!channelId) {
        return;
      }

      db.collection("rooms").doc(channelId).collection("messages").add({
        message: input,
        timestamps: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });

      chatRef.current.scrollIntoView({
        behavior: "smooth",
      });

      setInput("");
    },
    [channelId, input, chatRef]
  );

  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

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
