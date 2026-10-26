"use client"


import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import ChatList from "@/components/Chatlist";

export default function ConversacionesPage(){
    const router = useRouter()
    const searchParams = useSearchParams()
    let id_user = parseInt(searchParams.get("user"))
    console.log("id user: " + id_user)


    function irAChat(idChat){
        router.push("/chat?user="+id_user+"&sala="+idChat)
    }


    return(
        <ChatList id_log={id_user} botonOnClick={irAChat} />
    )
}