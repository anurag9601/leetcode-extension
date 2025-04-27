import React from "react";
import { RiRobot3Fill } from "react-icons/ri";
import styles from "./AIResponse.module.css";

const AIResponse = ({ text, index }: { text: string; index: number }) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  function adjustHeight() {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  React.useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <div className={styles.aiRequestContainer} key={index}>
      <div className={styles.aiRequest}>
        <div className={styles.aiIcon}>
          <RiRobot3Fill />
        </div>
        <textarea value={text} readOnly ref={textareaRef}></textarea>
      </div>
    </div>
  );
};

export default AIResponse;
