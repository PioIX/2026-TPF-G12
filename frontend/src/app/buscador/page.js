"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import SelectTemas from "@/components/SelectTemas";
import Footer from "@/components/Footer"
import Header from '@/components/Header';
import PinListBuscador from "@/components/PinListBuscador";
import styles from './page.module.css';


export default function BuscadorPage() {
    const router = useRouter();
    const [tag1, setTag1] = useState("")
    const [tag2, setTag2] = useState("")
    const [nombreUser, setNombreUser] = useState("")
    const [idBuscar, setIdBuscar] = useState(0)
    const [datosBusqueda, setDatosBusqueda] = useState([])

    const searchParams = useSearchParams();
    let A = parseInt(searchParams.get("A"))


    useEffect(() => {
        fetch("http://localhost:4000/getiduser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre: nombreUser })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("id del usuario con este nombre especifico:", data);
                if (data.id.length == 0) {
                    console.log("vacio")
                    if (nombreUser == "") {
                        setIdBuscar(0)
                    } else {
                        setIdBuscar(-1)
                    }

                } else {
                    console.log("no vacio, bien hecho: " + data.id[0].id_usuario)
                    setIdBuscar(data.id[0].id_usuario)
                }
            });
    }, [nombreUser])

    function volver() { router.back() }


    async function buscar() {
        console.log("hola voy a buscar :P")

        if (tag1 == "" && tag2 == "" && nombreUser == "") {
            alert("Completá algún filtro")
        }

        else {
            const resultado = await fetch("http://localhost:4000/getpinesbuscador", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tag1: tag1,
                    tag2: tag2,
                    id_usuario: idBuscar
                })
            })

            const datos = await resultado.json()
            console.log(datos)
            setDatosBusqueda(datos)
        }
    }

    function condicionTags() {
        if (tag1 == tag2) {
            if (tag1 == "") {
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

    function clickPin(idPin) {
        router.push("/pin?idpin=" + idPin + "&A=" + A)
    }

    return (
        <div className={styles.paginaCompleta}>
            <Header></Header>
            <div className={styles.contenido}>
                <h1>BUSCADOR</h1>
                <div className={styles.seccionInstrucciones}>
                    <h4>Instrucciones: </h4>
                    <p>Para buscar solo por tema, dejar el espacio de usuario en blanco. Para buscar por tema y por usuario, llenar todos los campos. Para buscar solo por usuario, dejar los temas en "nada"</p>
                </div>

                <div className={styles.filaBusquedas}>
                    <div className={styles.seccionTemas}>
                        <div className={styles.seccionTemaimg}>
                            <h2>Buscar por tema</h2>
                            <SelectTemas nombre={"tag1"} onchangefunc={(select) => setTag1(select.target.value)}></SelectTemas>
                            <SelectTemas nombre={"tag2"} onchangefunc={(select) => setTag2(select.target.value)}></SelectTemas>


                        </div>


                        <div className={styles.seccionUsuario}>
                            <h2>Buscar por usuario</h2>
                            <Input id={"nombreUsuario"} texto={"ingresar nombre del usuario"} funcion={(e) => setNombreUser(e.target.value)} ></Input>

                        </div>

                        <div className={styles.botonBusqueda}>
                        </div>
                    </div>
                </div>
            </div>

            {condicionTags()}
            <div className={styles.grillaPines}>

                <PinListBuscador listaDatos={datosBusqueda} botonOnClick={clickPin}></PinListBuscador>
            </div>

            <Button funcion={volver} texto={"Volver"}></Button>
            <Footer></Footer>
        </div>
    )
}