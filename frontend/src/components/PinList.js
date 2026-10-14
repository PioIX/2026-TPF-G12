"use client"

import { useEffect, useState } from "react";
import Pin from "./Pin";

export default function PinList({id_log, botonOnClick}) {

    const [pines, setPines] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/getPinesMain', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data);
            if (data.id_usuario == id_log) {
                setPines(data.pines);
            } else {
                setPines([])
            }
        });

    },[])
    
    return (
        <>
           {pines.map((pin, index) => {
                return(
                    <Pin key={index} link={pin.foto} me_gusta={pin.me_gusta} onClick={() => botonOnClick(pin.id_chat)}>
                    </Pin>
                )
           })} 
        </>
    );
}