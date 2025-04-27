import React from "react";
import { FaRobot } from "react-icons/fa6";
import styles from "./ContentScript.module.css";
import ChatArea from "../components/chatArea/ChatArea";
import { prevChatDataType } from "../services/ai";

const ContentScript = () => {
  const [chatWindowOpen, setChatWindowOpen] = React.useState<boolean>(false);

  const [chat, setChat] = React.useState<prevChatDataType[] | []>([]);

  return (
    <div className={styles.contentContainer}>
      {chatWindowOpen === true && <ChatArea  chat={chat} setChat={setChat}/>}
      <div
        className={styles.botIcon}
        onClick={() => setChatWindowOpen((prev) => !prev)}
      >
        <FaRobot />
      </div>
    </div>
  );
};

export default ContentScript;
