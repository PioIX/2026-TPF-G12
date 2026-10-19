"use client"

import { useState } from 'react';
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";


export default function HomePage() {
  let id_user = -1

  const [registrar, setRegistrar] = useState(false);

  let [foto_perfil, setFoto] = useState("");
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [nombre, setNombre] = useState("");

  const router = useRouter();


  const getFoto = (event) => { setFoto(event.target.value) }
  const getMail = (event) => { setMail(event.target.value) }
  const getContrasenia = (event) => { setContrasenia(event.target.value) }
  const getNombre = (event) => { setNombre(event.target.value) }



  async function iniciarSesion() {
    if (mail == "" || contrasenia == "") {
      alert("Todos los campos deben estar completos")
    } else {
      let response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail: mail, contrasenia: contrasenia })
      })

      let res = await response.json()

      if (res.ok == true) {
        id_user = res.id_user

        alert("Usuario VERIFICADO")

        if (res.es_admin == 0) {
          router.push(`/principal?id_user=${id_user}`);
        } else {
          router.push(`/paginaAdmin?id_user=${id_user}`);
        }

      } else {
        alert("Usuario o contraseña incorrectos")
      }
    }
  }

  async function crearCuenta() {
    let es_admin = 0

    if (nombre == "" || mail == "" || contrasenia == "") {
      alert("Todos los campos deben estar completos")
    } else {
      if (foto_perfil == "") {
        foto_perfil = "https://i.redd.it/h5abcfxalwtb1.png"
      }

      let response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, mail, contrasenia, foto_perfil, es_admin })
      })
      let res = await response.json()

      if (res.ok == true) {
        id_user = res.id_user

        alert("u uwa wa uwa")

        router.push(`/principal?id_user=${id_user}`);


      } else {
        alert("Ya existe la cuenta")
      }
    }
  }

  return (
    <div>
      <div id="login-1">

        <img src="/PionterestLogo.png"></img>
        <h1>Login</h1>

        <Button texto="Iniciar Sesion" funcion={() => setRegistrar(false)}></Button>
        <Button texto="Registrarse" funcion={() => setRegistrar(true)}></Button>

        {registrar ? (
          <div>
            <h2>Registro</h2>
            <Input text="Ej: Sayu.Crack" id="nombre" onChange={getNombre}></Input>
            <Input text="sayu@gmail.com" id="mail" onChange={getMail}></Input>
            <Input text="papita123" id="contraseña" onChange={getContrasenia}></Input>
            <Input id="fotoContacto" text="link" onChange={getFoto}></Input>
            <Button texto="Validar" funcion={crearCuenta}></Button>
          </div>

        ) : (
          <div>
            <h2>Inicio de sesión</h2>

            <Input text="sayu@gmail.com" id="mail" onChange={getMail}></Input>
            <Input text="papita123" id="contraseña" onChange={getContrasenia}></Input>

            <Button texto="Validar" funcion={iniciarSesion}></Button>
          </div>
        )}
      </div>

      <div id="login-2">
        <img src="/PionterestGatos.png"></img>
      </div>

      <footer>

      </footer>
    </div>
  )
}
