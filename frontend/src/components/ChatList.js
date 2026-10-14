"use client"

import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";

export default function ChatList({id_log, botonOnClick}) {

    const [chats, setChats] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/getchatsej4', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({id_usuario: id_log})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data);
            if (data.id_usuario == id_log) {
                setChats(data.chats);
            } else {
                setChats([])
            }
        });

    },[])
    
    return (
        <>
           {chats.map((chat, index) => {
                return(
                    <ChatItem key={index} foto={chat.foto} nombre={chat.nombre_chat} onClick={() => botonOnClick(chat.id_chat)}>
                    </ChatItem>
                )
           })} 
        </>
    );
}