"use client"

export default function ChatItem({foto, nombre, onClick}) {

    
    return (
        <div>
            <img src={foto}></img>
            <h5>{nombre}</h5>
            <button onClick={onClick}>Ir al chat</button>
        </div>
    );
}