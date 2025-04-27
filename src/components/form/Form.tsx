import React from "react";
import styles from "./Form.module.css";
import SubmitForm from "../submitForm/SubmitForm";

const Form = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [apiKey, setApiKey] = React.useState<string | null>("api-key");

  const [apiKeySuccess, setApiKeySuccess] = React.useState<boolean>(false);

  function setApikeyInChromeStore(value: string) {
    chrome.storage.local.set({ leetcodeGeminiApiKey: value }, () => {
      setApiKeySuccess(true);

      const timeOut = setTimeout(() => {
        setApiKeySuccess(false);
        clearInterval(timeOut);
      }, 3 * 1000);
    });
  }

  function handleUserFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!inputRef.current) return;

    const value = inputRef.current.value;

    if (value.length === 0) {
      alert("Oops!! Input field is empty 🤖.");
      return;
    }

    if (value.length < 8) {
      alert("Invalid API key ❌.");
      return;
    }

    setApikeyInChromeStore(value);
  }

  React.useEffect(() => {
    chrome.storage.local.get(["leetcodeGeminiApiKey"], function (result) {
      if (result.leetcodeGeminiApiKey) {
        setApiKey(result.leetcodeGeminiApiKey);
      }
    });
  }, [apiKeySuccess]);

  return (
    <>
      {apiKey === null ? (
        <form className={styles.formContainer} onSubmit={handleUserFormSubmit}>
          <p>
            <span>Enter your Google Gemini API key here.</span> <br />
            Creating a key is completely free you just need a Google account.
            Once you're signed in, you can easily generate your API key by
            visiting this link:{" "}
            <a href="https://aistudio.google.com/app/apikey" target="_blank">
              {" "}
              https://aistudio.google.com/app/apikey
            </a>
          </p>
          <input type="text" ref={inputRef} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <SubmitForm apiKeySuccess={apiKeySuccess} setApiKey={setApiKey} />
      )}
    </>
  );
};

export default Form;
