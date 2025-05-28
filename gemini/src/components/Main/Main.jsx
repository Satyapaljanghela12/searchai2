import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context)    
  

return (
    <div className='main'>
        <div className="nav">
            <p>Search.Ai</p>
            <img src={assets.user_icon} alt="" />
        </div>
       <div className="main-container">
        {!showResult
        ? <>
        <div className="greet">
            <p><span>Hello,Dev</span></p>
            <p>How can i help you today? </p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Who is the prime minister of India</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>what is price of gold</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>what is the currency of India</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Who is the president of India</p>
                    <img src={assets.code_icon} alt="" />
                
            </div>
        </div></>
        : <div className='result'> 
         <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>

         </div>
         <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading
            ? <div className="loader">
                <hr />
                <hr />
                <hr />
            </div>
          :<div className='htl' dangerouslySetInnerHTML={{ __html: resultData }}></div>  }
            

         </div>  
        </div>}
        

        <div className="main-bottom">
            <div className="searchbox">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon}  alt="" />
                   { input? <img onClick={()=>onSent()} src={assets.send_icon} alt=""/>:null}
                </div>
            </div>
            <p className="bottom-info">
                Gemini may display inaccurate info,including about people,so double check your responses 
            </p>
            
        </div>
       </div>
    </div>
  )
}
 
export default Main