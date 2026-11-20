"use client"
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Button from "@/components/Button";
import PinListColeccion from "@/components/PinListColeccion";
import styles from "./page.module.css";

export default function ColeccionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  let id_user = parseInt(searchParams.get("user"));
  console.log("id user: " + id_user);
  let id_coleccion = parseInt(searchParams.get("id_coleccion"));
  console.log("id coleccion: " + id_coleccion);
  let A = parseInt(searchParams.get("A"))


  function clickPin(idPin) {
    router.push("/pin?idpin=" + idPin + "&A=" + A)
  }
  function volver() { router.back() }

  return (
    <>
      <Header></Header>

      <main className={styles.contenedor}>
        <h1 className={styles.titulo}>Colección n°{id_coleccion} </h1>

        <section className={styles.pins}>
          <PinListColeccion id_log={id_user} botonOnClick={clickPin} id_coleccion={id_coleccion}></PinListColeccion>
        </section>

        <div className={styles.zonaVolver}>
          <Button funcion={volver} texto={"Volver"} className={styles.botonVolver}></Button>
        </div>

      </main>
    </>
  );
}
