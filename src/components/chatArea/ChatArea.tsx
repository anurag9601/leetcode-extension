import React from "react";
import { TbPrompt } from "react-icons/tb";
import styles from "./ChatArea.module.css";
import UserRequest from "../userRequest/UserRequest";
import AIResponse from "../aiResponse/AIResponse";
import getResponseFromAI, { prevChatDataType } from "../../services/ai";

interface ChatAreaProps {
  chat: prevChatDataType[] | [];
  setChat: React.Dispatch<React.SetStateAction<prevChatDataType[] | []>>;
}

const ChatArea: React.FC<ChatAreaProps> = ({ chat, setChat }) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const chatAreaViewRef = React.useRef<HTMLDivElement | null>(null);

  function cleanAIText(text: string) {
    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/`/g, "")
      .replace(/^- /gm, "")
      .replace(/\n{2,}/g, "\n")
      .trim();
  }

  async function handleSendRequestToAI(e: React.FormEvent) {
    e.preventDefault();

    if (!inputRef.current) return;

    const prompt = inputRef.current.value;

    if (prompt.length === 0) {
      alert("Input field is empty 🤖.");
      return;
    }

    setLoading(true);

    const userRequest: prevChatDataType = {
      role: "user",
      parts: [{ text: prompt }],
    };

    const updatedChat = [...chat, userRequest];

    setChat(updatedChat);

    const currentQuestionBody = document.body.innerText;

    inputRef.current.value = "";

    const response = await getResponseFromAI(
      prompt,
      updatedChat,
      currentQuestionBody
    );

    if (response) {
      const cleanAIResponse = cleanAIText(response);

      console.log("cleanAIResponse", cleanAIResponse);

      const aiResponseMessage: prevChatDataType = {
        role: "model",
        parts: [{ text: cleanAIResponse }],
      };

      const finalChat = [...updatedChat, aiResponseMessage];

      setChat(finalChat);
    }

    setLoading(false);
  }

  React.useEffect(() => {
    if (!chatAreaViewRef.current) return;

    chatAreaViewRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  console.log("chat", chat);

  return (
    <div className={styles.chatAreaContainer}>
      {chat.length > 0 ? (
        <div className={styles.chatArea}>
          {chat.map((message, index) =>
            message.role === "user" ? (
              <UserRequest text={message.parts[0].text} index={index} />
            ) : (
              <AIResponse text={message.parts[0].text} index={index} />
            )
          )}
          {loading && (
            <div className={styles.loading}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          <div ref={chatAreaViewRef}></div>
        </div>
      ) : (
        <div className={styles.noChatMessage}>
          <h5>
            If you need any help solving this coding problem, feel free to ask
            me for hints, guidance, or anything else you need! 🤖
          </h5>
        </div>
      )}

      <form className={styles.chatInputBox} onSubmit={handleSendRequestToAI}>
        <input type="text" ref={inputRef} placeholder="Ask anything"/>
        <button type="submit" disabled={loading === true}>
          <TbPrompt />
        </button>
      </form>
    </div>
  );
};

export default ChatArea;
