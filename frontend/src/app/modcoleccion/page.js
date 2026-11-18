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

  const [nombre, setNombre] = useState("");
  const [pins, setPins] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [pinAColocar, setPinAColocar] = useState("");
  const [pinAQuitar, setPinAQuitar] = useState("");
  const [usuarioAColocar, setUsuarioAColocar] = useState("");
  const [usuarioAQuitar, setUsuarioAQuitar] = useState("");

  function colocarPin() {
    const id = Number(pinAColocar);
    if (!pinAColocar.trim() || isNaN(id))
      return alert("Ingresá un ID de foto válido");
    if (pins.includes(id)) return alert("Esa foto ya está en la colección");
    setPins([...pins, id]);
    setPinAColocar("");
  }

  function quitarPin() {
    const id = Number(pinAQuitar);
    if (!pins.includes(id)) return alert("Esa foto no está en la colección");
    setPins(pins.filter((p) => p !== id));
    setPinAQuitar("");
  }

  function colocarUsuario() {
    const u = usuarioAColocar.trim();
    if (!u) return;
    if (usuarios.includes(u)) return alert("Ese usuario ya tiene acceso");
    setUsuarios([...usuarios, u]);
    setUsuarioAColocar("");
  }

  function quitarUsuario() {
    const u = usuarioAQuitar.trim();
    if (!usuarios.includes(u)) return alert("Ese usuario no tiene acceso");
    setUsuarios(usuarios.filter((x) => x !== u));
    setUsuarioAQuitar("");
  }

  return (
    <div>
      <div>
        <h1>Nueva colección</h1>
        <Input texto={"Nombre de la colección"} funcion={getNombreColeccion}></Input>

        <Input texto={"ID Pin"} funcion={getPinColocar}></Input>
        <Button></Button>
        <Input texto={"ID Pin"} funcion={getPinQuitar}></Input>
        <Button></Button>

        <Input texto={"ID Usuario"} funcion={getUsuarioColocar}></Input>
        <Button></Button>
        <Input texto={"ID Usuario"} funcion={getUsuarioQuitar}></Input>
        <Button></Button>
      </div>
    </div>
  );
}
