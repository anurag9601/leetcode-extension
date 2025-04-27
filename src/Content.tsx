import React from "react";
import { createRoot } from "react-dom/client";
import ContentScript from "./contentScript/ContentScript";
import "./index.css"

chrome.storage.local.get(["leetcodeGeminiApiKey"], (result) => {
  if (result.leetcodeGeminiApiKey) {
    const root = document.createElement("div");
    root.id = "__leetcode_ai_supporter_using_gemini_api_key__";
    document.body.append(root);

    createRoot(root).render(
      <React.StrictMode>
        <ContentScript />
      </React.StrictMode>
    );
  }
});
