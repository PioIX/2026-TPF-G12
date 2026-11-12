"use client"

import { useEffect, useState } from "react";
import Pin from "./Pin";

export default function PinList({botonOnClick, id_coleccion}) {

    const [pines, setPines] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/getpinesporcoleccion', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }, body: JSON.stringify({id_coleccion : id_coleccion})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data);
            setPines(data.pines);
        });

    },[])
    
    return (
        <>
           {pines.map((pin, index) => {
                return(
                    <Pin key={index} link={pin.link} me_gusta={pin.me_gusta} onclick={() => botonOnClick(pin.id_pin)}>
                    </Pin>
                )
           })} 
        </>
    );
}