import React, { useRef, useState, ReactDOM, useEffect } from 'react'
import { createPortal } from "react-dom" 
import { createRoot } from 'react-dom/client';
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container'
import { LeftMessage } from './LeftMessage';
import { RightMessage } from './RightMessage';

import { io } from "socket.io-client"

//Socket.io is a living creature, and the react environment is a nuclear wasteland.
//Theres a reason socket.io is outside of said nuclear wasteland. I can't quite explain why, but there is.      (basically a new connection is created in the backend whenever this command is run, and guess what happens whenever state is changed in react? yup, everything rerenders which reruns this command if i put it in there)
const socket = io('http://localhost:3002')

export const GlobalChat = () => {

  
  const [message,setMessage] = useState("")
  const chatRef = useRef(null)


  useEffect(()=> {
    socket.on('connect', ()=>{
      displayMessage(`You connected with ${socket.id}`)
    })
  },[])
  
  useEffect(()=>{
    socket.on('receive-message', (message) => {
      console.log(message)
      displayMessage(message)
    })
  },[])
  

    //this code is working to add messages with no styling
  const displayMessage = (message) => {
    const messageToAdd = document.createElement("div")
    messageToAdd.innerHTML = message
    chatRef.current.appendChild(messageToAdd)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(message === "" || message.replace(/\s/g, '').length === 0)return

    displayMessage(message)
    socket.emit('send-message', message)


    //i resorted to using default html messages for now, im having trouble with rendering react components with onSubmit
    //example: i cannot render <RightMessage msg={message}/>
    //Things i tried: createRoot, createPortal, root.render, 
    //the closest i got was replacing the whole chat box with the new message.
    //need to figure out how to keep the existing messages and append a react component to it


    //example of replacing the whole thing with a new message:

    // const chatBox = createRoot(document.getElementById("chat")) 
    // const currentChat = chatBox.current
    // chatBox.render(
    //   <React.Fragment>
    //     {currentChat}
    //     <RightMessage msg={message}/>
    //   </React.Fragment>
    // )

  
    //things i tried that didn't work

    // const messageToAdd = <RightMessage msg={message}/>
    // createPortal(messageToAdd, chatRef.current)
    
    //     and

    // const rootElement = document.getElementById("chat")
    // const newElement = React.createElement(RightMessage, {msg: message}, null)
    // rootElement.appendChild(newElement)

    setMessage("")
  }

  return (
    <>
        <div>
            <Container id="chat" ref={chatRef} sx={{
                width: "350px",
                height: "400px",
                // marginBlock: "5px",
                overflow:"auto",
                paddingInline:"12px !important",
                paddingBlock:"10px",
                backgroundColor: 'primary.dark',  
            }}>
                <LeftMessage msg="Hello"/>
                <RightMessage msg="Here is a really long text that you can do nothing about, its gonna be long wether you like it or not, so be prepared for it to go off screen. Right? Right..!"/>
                <RightMessage msg="Testes"/>
                <LeftMessage msg="Here is a really long text that you can do nothing about, its gonna be long wether you like it or not, so be prepared for it to go off screen. Right? Right..!"/>

                
            </Container>
            <Container>
              <form onSubmit={(e)=>{handleSubmit(e)}}>
                <input type={"text"} onChange={(e)=>{setMessage(e.target.value)}}/>
                <input type={"submit"} placeholder={"get foonged"}/>
              </form>
            </Container>
           
            
        </div>
    </>
  )
}
