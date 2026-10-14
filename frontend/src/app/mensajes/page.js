"use client"

import {useSocket} from "@/hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SocketPage() {

    const { socket, isConnected } = useSocket();
    const [mensaje, setMensaje] = useState([])
    const [contador, setContador] = useState(0) 
    const router = useRouter()
    const searchParams = useSearchParams()
    const conversacion = parseInt(searchParams.get("conv"))
    const user = parseInt(searchParams.get("user"))
    const [texto, setTexto] = useState("")

    useEffect(() => {
        if (!socket) return;
        //Aquí entrará cuando reciba un evento
        if (isConnected) {
            console.log("conectado")
        }

        socket.on("respuestaPersonalizada", (data) => {
            setContador(data.contador);
        });

        socket.on("newMessage", (data) => {
            console.log("recibido")
            console.log(data);
            setMensaje((prev) => [...prev, data.message])
        });

        socket.on("pingAll", (data) => {
            console.log(data);
            setMensaje((prev) => [...prev, data.message.msg])
        });
    
}, [socket]);

    useEffect(() => {
            if (!socket) return;
            //Aquí entrará cuando reciba un evento
            if (isConnected) {
                console.log("conectado")
                socket.emit("joinRoom", {room: conversacion})
                console.log("sala:", conversacion)
            }        
    }, [isConnected]);


    useEffect(()=>{
        console.log(mensaje)
    }, [mensaje])

    function pingAll() {
        socket.emit("pingAll", { msg: "Hola desde mi compu" });
        }

    function mandarMensaje() {
        socket.emit("sendMessage", {message: texto, room: parseInt(conversacion)})
    }

        

        

    return (
        <>
             {isConnected ? (
                <p>🟢 Conectado al servidor</p>
             ) : (
                <p>🔴 Desconectado</p>
             )}


             <button onClick={pingAll}>
                Enviar ping a todos
            </button>

            <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)}></input>

            <button onClick={mandarMensaje}>
                mandar mensaje
            </button>

            
            {mensaje.map((texto, index) =>  <p key={index}> mensaje numero: {index + 1} de {user}: {texto}</p>)}

            <p> Contador: {contador}</p>
        </>
    )
}
