import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
}  from "@google/generative-ai"

const MODEL_NAME ="gemma-3-1b-it";
const API_KEY ="AIzaSyAaDIDOwzW4m_DPOSfkPtPZoieJb__7a0Y";

async function runChat(prompt){
    const genAI =new GoogleGenerativeAI ( API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME }); 

 const generationConfig ={
    temperature:0.9,
    topK:1,
    topP:1,
    maxOutputTokens:2048,
 };

 const SafetySettings =[
    {
        category :HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,

    },
    {
        category:HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,

    },
    {
        category:HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_Above,
    },
    {
        category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    }
 ];

  const chat = model.startChat({
    generationConfig,
    SafetySettings,
    history:[   
    ],
  });

  const result = await chat.sendMessage(prompt);
  const response =result.response;
  console.log(response.text());
  return response.text();

}

export default runChat;