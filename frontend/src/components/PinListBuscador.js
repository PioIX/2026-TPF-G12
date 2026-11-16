"use client"

import { useEffect, useState } from "react";
import Pin from "./Pin";

export default function PinListBuscador({botonOnClick, listaDatos}) {
    return (
        <>
           {listaDatos.map((pin, index) => {
                return(
                    <Pin key={index} link={pin.link} me_gusta={pin.me_gusta} onclick={() => botonOnClick(pin.id_pin)}>
                    </Pin>
                )
           })} 
        </>
    );
}