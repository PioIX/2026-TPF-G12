"use client"

import {useSocket} from "@/hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Mensaje from "@/components/Mensaje";
import { pingPrefetchScheduler } from "next/dist/client/components/segment-cache/scheduler";

export default function SocketPage() {

    const { socket, isConnected } = useSocket();
    const [mensajes, setMensajes] = useState([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const conversacion = parseInt(searchParams.get("sala"))
    const user = parseInt(searchParams.get("user"))
    const [texto, setTexto] = useState("")
    const [nombre, setNombre] = useState("")
    const [idPin, setIdPin] = useState("")
    const [prueba, setPrueba] = useState(0)
    const [pinExiste, setPinExiste] = useState(0)
    

// ------------------------------------- socket --------------------------------------
    useEffect(() => {
        if (!socket) return;
        //Aquí entrará cuando reciba un evento
        if (isConnected) {
            console.log("conectado")
        }

        socket.on("newMessage", (data) => {
            console.log("recibido")
            console.log(data);
            const msg = {contenido: data.message, sender: data.sender, es_link: data.es_link, es_imagen: data.es_imagen, id_mensaje: data.id_mensaje}
            setMensajes((prev) => [...prev, msg])
            setPrueba(2)
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











// ------------------------------- funciones pequeñas ---------------------------------------
    useEffect(()=>{
        console.log(mensajes)
    }, [mensajes])

    function volver(){
        router.back()
    }













// --------------------------------- use effects ----------------------------------------------

    useEffect(() => {
        fetch("http://localhost:4000/getMensajesComponente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id_usuario: conversacion})
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Datos de los mensajes:", data);
            //console.log("es imagen: " +mensaje.es_imagen)
            //console.log("contenido: " +mensaje.contenido)
            //console.log("link: "+ mensaje.es_link)
            setMensajes(data.mensajes);
        });
  }, []);


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


    useEffect(() => {
        fetch("http://localhost:4000/getpinespec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id_pin: idPin})
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Datos del pin especifico:", data);
            if (data.pin.length == 0){
                console.log("vacio")
                setPinExiste(0)
                console.log(pinExiste)
            } else {
                setPinExiste(1)
                console.log(pinExiste)
            }            
        });
    },[idPin])
















// -------------------------------------------------- botones de mandar -------------------------------------------

      function mandarMensaje() {
        
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
                setPrueba(1)
                socket.emit("sendMessage", {message: texto, room: parseInt(conversacion), sender: user, es_link: 0, es_imagen: 0, id_mensaje: data.id_mensaje})
                
            } else {
                console.log("error")
                
            }
        });
    }



    function mandarImagen(){
        const cuerpo = {
            contenido: texto,
            es_imagen: 1,
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
                setPrueba(1)
                socket.emit("sendMessage", {message: texto, room: parseInt(conversacion), sender: user, es_link: 0, es_imagen: 1, id_mensaje: data.id_mensaje})
                
            } else {
                console.log("error")
                
            }
        });
    }

    function mandarLink(){
        const cuerpo = {
            contenido: texto,
            es_imagen: 0,
            es_link: 1,
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
                setPrueba(1)
                socket.emit("sendMessage", {message: texto, room: parseInt(conversacion), sender: user, es_link: 1, es_imagen: 0, id_mensaje: data.id_mensaje})
                
            } else {
                console.log("error")
                
            }
        });
    }

    function mandarPin(){
        const cuerpo = {
            contenido: "http://localhost:3000/pin?idpin="+idPin,
            es_imagen: 0,
            es_link: 1,
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
                setPrueba(1)
                socket.emit("sendMessage", {message: "http://localhost:3000/pin?idpin="+idPin, room: parseInt(conversacion), sender: user, es_link: 1, es_imagen: 0, id_mensaje: data.id_mensaje})
                
            } else {
                console.log("error")
                
            }
        });
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
                pinExiste == 1? (
                    <Button funcion={mandarPin} texto={"Enviar un Pin"}></Button>
                ):(
                    <p><b>¡Este Pin no existe!</b></p>
                )
            }
            

            
            <Mensaje pruebaEffect={prueba} nuevosMensajes={mensajes}></Mensaje>
            

            
        </>
    )
}