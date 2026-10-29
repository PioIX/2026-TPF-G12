"use client"

import {useSocket} from "@/hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Mensaje from "@/components/Mensaje";

export default function SocketPage() {

    const { socket, isConnected } = useSocket();
    const [mensaje, setMensaje] = useState([])
    const [contador, setContador] = useState(0) 
    const router = useRouter()
    const searchParams = useSearchParams()
    const conversacion = parseInt(searchParams.get("sala"))
    const user = parseInt(searchParams.get("user"))
    const [texto, setTexto] = useState("")
    const [nombre, setNombre] = useState("")
    const [idPin, setIdPin] = useState("")
    
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





      function mandarMensaje() {
        socket.emit("sendMessage", {message: texto, room: parseInt(conversacion), sender: user})
         const cuerpo = {
            contenido: texto,
            es_imagen: 0,
            es_link: 0,
            sender: user,
            id_usuario: conversacion
        }


        fetch('http://localhost:4000/mensajenuevo', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuerpo)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data);
            if (data.ok == true) {
                console.log("funciona el post")
                
            } else {
                console.log("error")
                
            }
        });
    }



    function mandarImagen(){
        console.log("imagen")
    }

    function mandarLink(){
        console.log("link")
    }

    function mandarPin(){
        console.log(idPin)
    }
    
    

        

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
                    <h4><b>¡Esta es tu sala!</b></h4>
                ) : (
                    <p></p>
                )
            }

            <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escribir mensaje aca"></input>

            <Button funcion={mandarMensaje} texto={"Mandar Mensaje"}></Button>
            <Button funcion={mandarImagen} texto={"Enviar como imagen"}></Button>
            <Button funcion={mandarLink} texto={"Enviar como link"}></Button>
            <br></br>
            <input type="number" value={idPin} onChange={(e) =>{if(e.target.value<=999) setIdPin(e.target.value)} } placeholder="Escribir el id del pin acá"></input>
            {
                //poner el boton de mandar el pin en un use effect que verifique que el pin existe
            }
            <Button funcion={mandarPin} texto={"Enviar un Pin"}></Button>

            
            <Mensaje></Mensaje>
            

            
        </>
    )
}

//  {mensaje.map((datos, index) =>  <p key={index}> mensaje de {datos[1]}: {datos[0]}</p>)}