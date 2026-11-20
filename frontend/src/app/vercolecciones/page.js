"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/Button";
import ColeccionList from "@/components/ColeccionList";

import styles from "./page.module.css";


export default function ColeccionesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  let id_user = parseInt(searchParams.get("id_user"));
  let A = parseInt(searchParams.get("A"))
  console.log("id user: " + id_user);

  function irColeccion(id_coleccion) {
    console.log(id_coleccion);
    router.push("/coleccion?id_coleccion=" + id_coleccion + "&user=" + id_user + "&A=" + A);
  }

  function irEditar() {
    
    router.push("/modcoleccion?id_user=" + id_user +"&A="+A);
  }

  function borrarColeccion(id_coleccion) {
    console.log(id_coleccion);
    let borrar = confirm("¿Desea borrar la colección?");
    if (borrar) {
      const resultado = fetch("http://localhost:4000/deletecoleccion", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_coleccion: id_coleccion }),
      });
      console.log(resultado);

      console.log("Se borró la colección");
      router.refresh();
    }
  }

  function nuevaColeccion(id_coleccion) {
    router.push("/modcoleccion?id_user=" + id_user +"&A="+A);
  }

  function volver() { router.back() }

  return (
    <>
      <Header></Header>

      <main className={styles.contenedor}>

        <h1 className={styles.titulo}>MIS COLECCIONES</h1>

        <div className={styles.lista}>
          <ColeccionList
            funcion1={irEditar}
            funcion2={borrarColeccion}
            funcion3={irColeccion}
          ></ColeccionList>
        </div>

        <div className={styles.acciones}>
          <Button funcion={volver} texto={"Volver"} className={styles.botonVolver}></Button>
          <Button funcion={nuevaColeccion} texto={"+"} className={styles.botonMas}></Button>
        </div>

      </main>

      <Footer> </Footer>
    </>
  );
}
