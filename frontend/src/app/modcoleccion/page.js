"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useSegmentState } from "next/dist/next-devtools/userspace/app/segment-explorer-node";

export default function ModColeccionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  let id_user = parseInt(searchParams.get("id_user"));
  let A = parseInt(searchParams.get("A"));

  // ver desde acá

  const [nombreCol, setNombreCol] = useState("");
  const [pins, setPins] = useState([]);
  const [usuarios, setUsuarios] = useState([id_user]);
  const [inputPin, setInputPin] = useState(0)
  const [yaExistePin, setYaExistePin] = useState(false)
  const [inputUser, setInputUser] = useState(0)
  const [yaExisteUser, setYaExisteUser] = useState(false)
  const [pinExiste, setPinExiste] = useState(0)
  const [userExiste, setUserExiste] = useState(0)
  const [cargando, setCargando] = useState(0)
  const [idColeccion, setIdColeccion] = useState(0)

// ----------------------------------------------- Use effects ------------------------------------------

  useEffect(()=>{
    console.log(pins)

  },[pins])


  useEffect(() => {
    fetch("http://localhost:4000/getpinespec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_pin: inputPin })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos del pin especifico:", data);
        if (data.pin.length == 0) {
          console.log("vacio")
          setPinExiste(0)
          console.log(pinExiste)
        } else {
          setPinExiste(1)
          console.log(pinExiste)
        }
      });
  }, [inputPin])

  useEffect(() => {
    fetch("http://localhost:4000/getuserespec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usuario: inputUser })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos del usuario especifico:", data);
        if (data.user.length == 0) {
          console.log("vacio")
          setUserExiste(0)
          console.log(userExiste)
        } else {
          setUserExiste(1)
          console.log(userExiste)
        }
      });
  }, [inputUser])


// ------------------------------------------------ Funciones ---------------------------------------------

  function prueba(){
    console.log("id user : "+id_user)
    console.log("A: "+A)
    console.log("nombre col: "+nombreCol)
    console.log("pins: "+pins)
    console.log("usuarios: "+usuarios)
    console.log("input pin: "+inputPin)
    console.log("input user: "+inputUser)
    console.log("idcoleccion: "+ idColeccion)
  }

  function ponerPin(){
    const noSePuede = pins.some(numero => inputPin == numero)
    console.log(noSePuede)
    if (noSePuede == false) {
      if (pinExiste == 1) {
        setPins((prev)=>[...prev,inputPin])
        setYaExistePin(false)
      }
        
    } else {
      setYaExistePin(true)
    }
  }

  function textoExistePin(){
    if (yaExistePin == true) {
      return(
        <p>Este pin ya está en la lista</p>
      )
    } else {
      return(
        <p></p>
      )
    }
  }

  function ponerUser(){
    const noSePuede = usuarios.some(numero => inputUser == numero)
    console.log(noSePuede)
    if (noSePuede == false) {
      if (userExiste == 1){
        setUsuarios((prev)=>[...prev,inputUser])
        setYaExisteUser(false)
      }
      
    } else {
      setYaExisteUser(true)
    }
  }


  function textoExisteUser(){
    if (yaExisteUser == true) {
      return(
        <p>Este usuario ya está en la lista</p>
      )
    } else {
      return(
        <p></p>
      )
    }
  }

  function condicionBoton(){
    if (usuarios.length > 0) {
      if (pins.length > 0) {
        if (nombreCol != "") {
          if (cargando == 0) {
            return (
              <Button funcion={crearColeccion} texto={"Crear la Colección"}></Button>
            )
          } else {
            return (<h4>Creando coleccion...</h4>)
          } 
          
        }   return (<p><b>¡Cuidado! la colección tiene que tener un nombre</b></p>)
      } else{
        return (<p><b>¡Cuidado! la colección tiene que tener al menos un pin</b></p>)
      }  

    } else{
      return (<p><b>¡Cuidado! la colección tiene que tener al menos un usuario</b></p>)
    }  
  }
  
  function crearColeccion(){
    setCargando(1)
    const cuerpo1 = {nombre_coleccion: nombreCol}

        fetch('http://localhost:4000/coleccionnueva', {
    
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuerpo1)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos', data);
            setIdColeccion(data.id_coleccion)
            console.log(idColeccion)
            
            if (data.ok == true) {
                console.log("se puede seguir")
                for (let indice; indice < pins.length; indice++) {
                  const cuerpo2 = {
                    id_pin: pins[indice],
                    id_coleccion: idColeccion
                  }
                }
                

            } else {
                console.log("error")
            }
        });
        
  }



  return (
    <div>
      <div>
        <h1>Nueva colección</h1>
        <input type="text" value={nombreCol} onChange={(e) => setNombreCol(e.target.value)} placeholder="Nombre de la colección"></input>
        <Button funcion={prueba} texto={"prueba scar luego console log"}></Button>   
        <br></br>
        <input type="number" onChange={(e) =>{if(e.target.value<=999) setInputPin(e.target.value)} } placeholder="Escribir el id de los pines acá"></input>
        {
          inputPin == 0 ? (
            <p></p>
          ) : (
            <Button funcion={ponerPin} texto={"Poner pin"}></Button>
          )
        }
          
        {yaExistePin == true? (
          <p>Ya existe este pin</p>
        ):(<p></p>)}

        {pinExiste == 1? (
          <p></p>
        ):(
          <p>¡Este Pin no existe!</p>
        )
        }
         
        <p>Pines hasta ahora: </p>
        {pins.map((p,i)=><p key={i}>{p}</p>)}
        <br></br>
        <input type="number" onChange={(e) =>{if(e.target.value<=999) setInputUser(e.target.value)} } placeholder="Escribir el id de los usuarios acá"></input>
        {
          inputUser == 0 ? (
            <p></p>
          ) : (
            <Button funcion={ponerUser} texto={"Poner User"}></Button>
          )
        }
        {textoExisteUser()}
        {userExiste == 1? (
          <p></p>
        ):(
          <p>¡Este usuario no existe!</p>
        )
        }
        <p>Usuarios hasta ahora (el primero sos vos):  </p>
        {usuarios.map((u,i)=><p key={i}>{u}</p>)}

        <br></br>

        {condicionBoton()}


      </div>
    </div>
  );
}

/*
 <Input texto={"ID Pin"} funcion={getPinColocar}></Input>
        <Button></Button>
        <Input texto={"ID Pin"} funcion={getPinQuitar}></Input>
boton
         <Input texto={"ID Usuario"} funcion={getUsuarioColocar}></Input>
        <Button></Button>
        <Input texto={"ID Usuario"} funcion={getUsuarioQuitar}></Input>
        <Button></Button>
*/