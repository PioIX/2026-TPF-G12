"use client"

import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Footer from "@/components/Footer"
import Header from '@/components/Header';
import Button from "@/components/Button";
import ColeccionList from "@/components/ColeccionList";

export default function ColeccionesPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    let id_user = parseInt(searchParams.get("id_user"))
    console.log("id user: " + id_user)


    function irColeccion(id_coleccion) {
        console.log(id_coleccion)
        //router.push("/coleccion?id_coleccion=" + id_coleccion + "&user=" + id_user)
    }

    function irEditar(id_coleccion) {
        router.push("/modcoleccion?id_coleccion=" + id_coleccion)
    }

    function borrarColeccion() {
        let borrar = confirm("¿Desea borrar la colección?")
        if (borrar) {
            const resultado = fetch("http://localhost:4000/deletecoleccion", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_coleccion: id_coleccion })
            })
            console.log(resultado)
            
            console.log("Se borró la colección")
        }
    }

    function nuevaColeccion() {
        router.push("/modcoleccion?id_coleccion=" + id_coleccion)
    }

    return (
        <>
            <Header></Header>

            <h1>MIS COLECCIONES</h1>


            <ColeccionList funcion1={irEditar} funcion2={borrarColeccion} funcion3={irColeccion}></ColeccionList>

            <Button funcion={nuevaColeccion} texto={"+"}></Button>


            <Footer> </Footer>
        </>
    )
}