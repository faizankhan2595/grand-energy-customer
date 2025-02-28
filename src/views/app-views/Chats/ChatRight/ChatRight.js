import React from 'react'
import Bottom from './Bottom'
import Header from './Header'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function ChatRight() {

  const tok = localStorage.getItem('token')  

  const url = new URL(document.URL);
  const params = url.searchParams;  
  const id = params.get('id')

  const [allChats, setallChats] = useState([])

    const getAllChats = () =>{
        axios({
            method:"POST",
            url:'/api/chat/get-chat-messages',
            headers:{
                Authorization: `Bearer ${tok}`
            },
            data:{
              chat_id: id
            }
        }).then((res)=>{
            console.log(res)
            setallChats(res.data.messages.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
      getAllChats()
    }, [id])
  

  return (
    id ? <>
    <Header id={id} allChats={allChats}/>
    <Bottom id={id} allChats={allChats}/>
    </> : <p></p>
  )
}

export default ChatRight