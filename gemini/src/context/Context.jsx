import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props)=>{
  const [input, setInput] = useState("") ;
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

const delayPara = (index, nextChar) => {
  setTimeout(() => {
    setResultData(prev => prev + nextChar);
  }, 20 * index); // adjust typing speed here
};

const newChat=()=>{
  setLoading(false)
  setShowResult(false)
}

const onSent = async (prompt) => {
  setResultData("");
  setLoading(true);
  setShowResult(true);
  setRecentPrompt(input);
  // setPrevPrompts([...prevPrompts, input]);
  if (!prevPrompts.includes(input)) {
  setPrevPrompts([...prevPrompts, input]);
}
  const response = await runChat(input);
  // Format the response with bold tags and line breaks
  const formattedResponse = response
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .split("*").join("<br>");

  // Split into characters
  const responseArray = formattedResponse.split("");
  

  // Typing effect
  responseArray.forEach((char, i) => {
    delayPara(i, char);
  });

  setLoading(false);
  setInput("");
};


const contextValue ={
      prevPrompts,
      setPrevPrompts,
      onSent,
      setRecentPrompt,
      recentPrompt,
      showResult,
      loading,
      resultData,
      input,
      setInput,
      newChat
}

      return (
         <Context.Provider value={contextValue}>
            {props.children}
         </Context.Provider>
      )
}

export default ContextProvider;

