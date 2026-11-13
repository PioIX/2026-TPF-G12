"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import SelectTemas from "@/components/SelectTemas";
import Footer from "@/components/Footer"
import Header from '@/components/Header';


export default function BuscadorPage() {
    const router = useRouter();
    const [tag1, setTag1] = useState("")
    const [tag2, setTag2] = useState("")
    const [nombreUser, setNombreUser] = useState("")
    const [idBuscar, setIdBuscar] = useState(0)

    useEffect(() => {
        fetch("http://localhost:4000/getiduser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({nombre: nombreUser})
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("id del usuario con este nombre especifico:", data);
            if (data.id.length == 0){
                console.log("vacio")
                if (nombreUser == "") {
                    setIdBuscar(0)
                } else {
                    setIdBuscar(-1)
                }
                
                
            } else {
                console.log("no esta vacio")
                console.log("bine hecho: "+ data.id[0].id_usuario) 
                setIdBuscar(data.id[0].id_usuario)
            }            
        });
    },[nombreUser])










    function volver() { router.back() }

    function test(){
        console.log("tag 1:"+ tag1)
        console.log("tag 2:"+ tag2)
        console.log("nombre del usuario:"+ nombreUser)
        console.log("id de user a buscar:"+ idBuscar)
    }

    function buscar(){
        console.log("hola")
    }

    function condicionTags() {
        if (tag1 == tag2) {
            if (tag1== "") {
                if (idBuscar != -1) {
                    return (
                        <Button funcion={buscar} texto={"Buscar"}></Button>
                    )
                } else {
                    return (
                        <p>¡Cuidado! Usuario no encontrado</p>
                    )
                }
                
            } else {
                return (
                    <p>¡Cuidado! las etiquetas no pueden ser iguales</p>
                )
            }
        } else {
            if (idBuscar != -1) {
                    return (
                        <Button funcion={buscar} texto={"Buscar"}></Button>
                    )
            } else {
                return (
                    <p>¡Cuidado! Usuario no encontrado</p>
                )
                
            }
        }
    }

    return (
        <div>
            <Header></Header>

            <h1>BUSCADOR</h1>

            <Button funcion={volver} texto={"Volver"}></Button>
            <br></br>

            <h4>Instrucciones: </h4>
            <p>Para buscar solo por tema, dejar el espacio de usuario en blanco. Para buscar por tema y por usuario, llenar todos los campos. Para buscar solo por usuario, dejar los temas en "nada"</p>

            <h2>Buscar por tema</h2>
            <SelectTemas nombre={"tag1"} onchangefunc={(select) =>  setTag1(select.target.value)}></SelectTemas>
            <SelectTemas nombre={"tag2"} onchangefunc={(select) => setTag2(select.target.value)}></SelectTemas>

            <Button funcion={test} texto={"prueba borrar despueslog tags"}></Button>
            <br></br>

            <h2>Buscar por usuario</h2>
            <Input id={"nombreUsuario"} texto={"ingresar nombre del usuario"} funcion={(e) => setNombreUser(e.target.value)} ></Input>

            {condicionTags()}
            

            <Footer></Footer>
        </div>
    )
}