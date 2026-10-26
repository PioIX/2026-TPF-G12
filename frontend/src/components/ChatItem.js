"use client"

import Button from "./Button";

export default function ChatItem({id, idfunc, foto, nombre, onClick}) {


    
    return (
        <div>
            <img src={foto}></img>
            <h5>{nombre}</h5>
            <Button funcion={onClick} texto={"Conversar con este usuario"}></Button>


        </div>
    );
}