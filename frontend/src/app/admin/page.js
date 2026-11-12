"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function AdminPage() {

    const [pin, setPin] = useState("");
    const [usu, setUsu] = useState("");
    const router = useRouter();


    const getUsuario = (event) => { setUsu(event.target.value) }
    const getPin = (event) => { setPin(event.target.value) }

    async function matarUsuario() {
        console.log("Usuario a eliminar: " + usu)

        let borrar = confirm("quere borrar al usuario??");
        if (borrar) {
            const resultado = await fetch("http://localhost:4000/deleteusuario", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_usuario: usu }),
            });
            console.log(resultado);

            console.log("Se borró al usuario jajaxdxd");
            router.refresh();
        }
    }

    async function matarPin(pin) {
        console.log("Pin a eliminar: " + pin)

        let borrar = confirm("quere borrar el pin??");
        if (borrar) {
            const resultado = await fetch("http://localhost:4000/deletepin", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_pin: pin }),
            });
            console.log(resultado);

            console.log("Se borró al pin");
            router.refresh();
        }
    }


    return (
        <div>
            <h1>ADMIN</h1>

            <h2>Eliminar USUARIO</h2>
            <Input id={usu} texto={"ID USUARIO"} funcion={getUsuario} ></Input>
            <Button funcion={() => matarUsuario(usu)} texto={"MATAR"}></Button>

            <h2>Eliminar PIN</h2>
            <Input id={pin} texto={"ID PIN"} funcion={getPin}></Input>
            <Button funcion={() => matarPin(pin)} texto={"MATAR"}> </Button>
        </div>
    )
}