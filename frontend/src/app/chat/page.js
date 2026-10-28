"use client"

import {useSocket} from "@/hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";

export default function SocketPage() {

    const { socket, isConnected } = useSocket();
    const [mensaje, setMensaje] = useState([])
    const [contador, setContador] = useState(0) 
    const router = useRouter()
    const searchParams = useSearchParams()
    const conversacion = parseInt(searchParams.get("sala"))
    const user = parseInt(searchParams.get("user"))
    const [texto, setTexto] = useState("")
    const [sender, setSender] = useState("")
    const [nombre, setNombre] = useState("")

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
            setMensaje((prev) => [...prev, [data.message, data.sender]])
        });

    
}, [socket]);

    useEffect(() => {
            if (!socket) return;
            //Aquí entrará cuando reciba un evento
            if (isConnected) {
                console.log("conectado")
                socket.emit("joinRoom", {room: conversacion})
                console.log("sala:", conversacion)
                console.log("usuario:" + user)
            }        
    }, [isConnected]);


    useEffect(()=>{
        console.log(mensaje)
    }, [mensaje])


    function mandarMensaje() {
        socket.emit("sendMessage", {message: texto, room: parseInt(conversacion), sender: user})
    }

    function volver(){
        router.back()
    }


    useEffect(() => {
        fetch('http://localhost:4000/getnombreuser', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_usuario: conversacion})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data);
            if (data.nombre.length != 0) {
                setNombre(data.nombre[0].nombre);
            }
        });
    },[])

   

        

        

    return (
        <>
             {isConnected ? (
                <p>🟢 Conectado al servidor</p>
             ) : (
                <p>🔴 Desconectado</p>
             )}

            <h1>Chat de {nombre}</h1>
            <Button funcion={volver} texto={"Volver"}></Button>
            <br></br>
            

            {
                conversacion == user ? (
                    <p><b>¡Esta es tu sala!</b></p>
                ) : (
                    <p></p>
                )
            }

            <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escribir mensaje aca"></input>

            <Button funcion={mandarMensaje} texto={"Mandar Mensaje"}></Button>

            
            {mensaje.map((datos, index) =>  <p key={index}> mensaje de {datos[1]}: {datos[0]}</p>)}

            
        </>
    )
}