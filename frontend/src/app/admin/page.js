"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [usu, setUsu] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  let id_user = parseInt(searchParams.get("id_user"));

  const getUsuario = (event) => {
    setUsu(event.target.value);
  };
  const getPin = (event) => {
    setPin(event.target.value);
  };

  async function matarUsuario() {
    console.log("Usuario a eliminar: " + usu);

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
    console.log("Pin a eliminar: " + pin);

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

  function irPrincipal() {
    router.push(`/principal?id_user=${id_user}&A=${1}`);
  }

  return (
    <main className={styles.contenedor}>
      <h1 className={styles.titulo}>ADMIN</h1>

      <section className={styles.seccion}>
        <h2 className={styles.subtitulo}>Eliminar USUARIO</h2>
        <div className={styles.fila}>
          <Input id={usu} texto={"ID USUARIO"} funcion={getUsuario}></Input>
          <Button funcion={() => matarUsuario(usu)} texto={"MATAR"} className={styles.botonMatar}></Button>
        </div>
      </section>

      <section className={styles.seccion}>
        <h2 className={styles.subtitulo}>Eliminar PIN</h2>
        <div className={styles.fila}>
          <Input id={pin} texto={"ID PIN"} funcion={getPin}></Input>
          <Button funcion={() => matarPin(pin)} texto={"MATAR"} className={styles.botonMatar}></Button>
        </div>
      </section>

      <div className={styles.volver}>
        <Button funcion={irPrincipal} texto={"Página principal"} className={styles.botonPrincipal}></Button>
      </div>
    </main>
  );
}
