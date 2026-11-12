"use client"
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Button from "@/components/Button";
import PinListColeccion from "@/components/PinListColeccion";

export default function ColeccionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  let id_user = parseInt(searchParams.get("user"));
  console.log("id user: " + id_user);
  let id_coleccion = parseInt(searchParams.get("id_coleccion"));
  console.log("id coleccion: " + id_coleccion);

  function clickPin(idPin) {
    router.push("/pin?idpin="+idPin) 
  }
  function volver(){router.back()}

  return (
    <>
      <Header></Header>
      <p>Coleccion numero {id_coleccion} </p>
      <Button funcion={volver} texto={"Volver"}></Button>
      <PinListColeccion id_log={id_user} botonOnClick={clickPin} id_coleccion={id_coleccion}></PinListColeccion>
    </>
  );
}
