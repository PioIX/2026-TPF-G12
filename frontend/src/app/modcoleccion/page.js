"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function ModColeccionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  let id_user = parseInt(searchParams.get("id_user"));
  let A = parseInt(searchParams.get("A"));

  // ver desde acá

  const [nombreCol, setNombreCol] = useState("");
  const [pins, setPins] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [inputPin, setInputPin] = useState(0)
  const [yaExistePin, setYaExistePin] = useState(false)
  const [inputUser, setInputUser] = useState(0)
  const [yaExisteUser, setYaExisteUser] = useState(false)

useEffect(()=>{
console.log(pins)

},[pins])

  function prueba(){
    console.log("id user : "+id_user)
    console.log("A: "+A)
    console.log("nombre col: "+nombreCol)
    console.log("pins: "+pins)
    console.log("usuarios: "+usuarios)
    console.log("input pin: "+inputPin)
    console.log("input user: "+inputUser)

  }

  function ponerPin(){
    const noSePuede = pins.some(numero => inputPin == numero)
    console.log(noSePuede)
    if (noSePuede== false) {
      setPins((prev)=>[...prev,inputPin])
      setYaExistePin(false)
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
    if (noSePuede== false) {
      setUsuarios((prev)=>[...prev,inputUser])
      setYaExisteUser(false)
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
          
        {textoExistePin()}
         
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
        <p>Usuarios hasta ahora:  </p>
        {usuarios.map((u,i)=><p key={i}>{u}</p>)}
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