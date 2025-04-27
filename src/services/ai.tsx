import { GoogleGenAI } from "@google/genai";

export interface partsDataType {
  text: string;
}

export interface prevChatDataType {
  role: "user" | "model";
  parts: partsDataType[];
}

async function getUserApiKey(): Promise<string> {
  const result = await chrome.storage.local.get(["leetcodeGeminiApiKey"]);

  return result.leetcodeGeminiApiKey;
}

export default async function getResponseFromAI(
  prompt: string,
  prevChats: prevChatDataType[],
  pageContent: string
) {
  try {
    const apiKey = await getUserApiKey();

    const ai = new GoogleGenAI({ apiKey: apiKey });

    const SYSTEM_PROMPT = `
    You are an AI Leetcode professional problem solver you have knowledge of every programming language like python, javascript, typescript, java, c++, c# etc.

    Here the user will ask you questions related to the problem they are solving, and the question will be provided to you:

    Question: ${pageContent}

    Based on this question, you will assist the user in solving it. 
    - If the user asks for a hint or a better approach, you will provide guidance accordingly. 
    - If the user asks for the complete code, you will provide the full code solution for that specific problem.

    Example input prompt:
    "how can I solve this problem"

    Example output:
    "To solve this problem, using a Hash Map would be the best approach."
    `;

    ai.chats.create({
      model: "gemini-2.0-flash",
      history: prevChats,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 500,
        temperature: 1,
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return response.text;
  } catch (error) {
    console.log("error from ai model", error);
    return `error from ai model: ${error}`;
  }
}
