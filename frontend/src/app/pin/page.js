"use client"

import {useSocket} from "@/hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SocketPage() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const user = 1//parseInt(searchParams.get("user"))
    const [descripcion, setDescripcion] = useState("")
    const [link, setLink] = useState("")
    const [tag1, setTag1] = useState("")
    const [tag2, setTag2] = useState("")
    const [subido, setSubido] = useState(false)

        

        

    return (
        <>
             
        </>
    )
}
