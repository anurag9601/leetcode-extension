import React from "react";
import styles from "./SubmitForm.module.css";
import { FaCircleCheck } from "react-icons/fa6";

interface SubmitFormProps {
  apiKeySuccess: boolean;
  setApiKey: React.Dispatch<React.SetStateAction<string | null>>;
}

const SubmitForm: React.FC<SubmitFormProps> = ({
  apiKeySuccess,
  setApiKey,
}) => {
  function handleDeletePresentApiKey() {
    chrome.storage.local.remove(["leetcodeGeminiApiKey"], () => {
      setApiKey(null);
    });
  }

  return (
    <>
      {apiKeySuccess === true ? (
        <div className={styles.successMessageContainer}>
          <div className={styles.successMessage}>
            <span>Success</span>
            <FaCircleCheck className={styles.checkIcon} />
          </div>
        </div>
      ) : (
        <div className={styles.setApiMessage}>
          <div className={styles.resetBtn}>
            <button onClick={handleDeletePresentApiKey}>Reset API key</button>
          </div>
          <p>
            Your API key has been <span>successfully</span> set! You can now
            continue solving LeetCode problems with the power of <span>AI</span>
            . If you'd like to <span>reset</span> your API key, simply click the
            reset button at the top. This will delete the current API key and
            prompt you to enter a new one.
          </p>
        </div>
      )}
    </>
  );
};

export default SubmitForm;
