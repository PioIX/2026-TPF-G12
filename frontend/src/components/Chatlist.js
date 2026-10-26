"use client"

import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";


export default function ChatList({id_log, botonOnClick}) {


    const [chats, setChats] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/getUsuariosChats', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data);
            setChats(data.usuarios);
            setChats([])
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