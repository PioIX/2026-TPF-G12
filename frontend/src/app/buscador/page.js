"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/Button";
import Input from "@/components/Input";
import SelectTemas from "@/components/SelectTemas";
import Footer from "@/components/Footer"
import Header from '@/components/Header';


export default function BuscadorPage() {
    const router = useRouter();

    function volver() { router.back() }

    return (
        <div>
            <Header></Header>

            <h1>BUSCADOR</h1>

            <h2>Buscar por tema</h2>
            <SelectTemas></SelectTemas>
            <SelectTemas></SelectTemas>

            <br></br>

            <h2>Buscar por usuario</h2>
            <Input></Input>

            <Button funcion={volver} texto={"Volver"}></Button>

            <Footer></Footer>
        </div>
    )
}