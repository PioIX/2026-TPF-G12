"use client"

import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";


export default function ChatList({id_log, botonOnClick}) {


    const [usuarios, setUsuarios] = useState([]);

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
            setUsuarios(data.usuarios);
        });

    },[])
    
    return (
        <>
           {usuarios.map((usuario, index) => {
                return(
                    <ChatItem key={index} id={usuario.id_usuario} foto={usuario.foto_perfil} nombre={usuario.nombre} onClick={() => botonOnClick(usuario.id_usuario)}>
                    </ChatItem>
                )
           })} 
        </>
    );
}