"use client"

import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import SelectTemas from "@/components/SelectTemas";
import styles from './page.module.css'

export default function SubirPinPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const user = parseInt(searchParams.get("user"))
    const [descripcion, setDescripcion] = useState("")
    const [link, setLink] = useState("")
    const [tag1, setTag1] = useState("")
    const [tag2, setTag2] = useState("")
    const [subido, setSubido] = useState(false)
    const [errorSubida, setErrorSubida] = useState(false)


    function volver() {
        router.back()
    }

    function postPin() {

        const cuerpo = {
            link: link,
            tag1: tag1,
            tag2: tag2,
            descripcion: descripcion,
            id_usuario: user
        }


        fetch('http://localhost:4000/pinnuevo', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuerpo)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Datos', data);
                if (data.ok == true) {
                    setSubido(true)
                    setErrorSubida(false)
                } else {
                    console.log("error")
                    setErrorSubida(true)
                }
            });

    }




    return (
        <div className={styles.paginaCompleta}>
            <h1 className={styles.tituloExterior}>Nuevo Pin</h1>
            
            <div className={styles.tarjeta}>
                <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="descripcion" className={styles.cajaTexto}></input>

                <div className={styles.filaCampos}>                                                                                   
                    <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="link de la imagen" className={styles.inputBuscador}></input>
                </div> 


                

                <div className={styles.columnaDerecha}>                                                                               
                    <div className={styles.selectorContenedor}>                                                                          
                        <SelectTemas nombre={"tag1"} onchangefunc={(select) => setTag1(select.target.value)}></SelectTemas>           
                    </div>   

                    <div className={styles.selectorContenedor}>                                                                          
                        <SelectTemas nombre={"tag2"} onchangefunc={(select) => setTag2(select.target.value)}></SelectTemas>           
                    </div>                                                                                                            
                </div>      

                <br></br>               




                <div className={styles.mensajes}>                                                                                     
                    {                                                                                                                 
                        tag1 == tag2 ? (                                                                                              
                            <p className={styles.mensajeError}><b>¡Cuidado! Las etiquetas no pueden ser iguales</b></p>               
                        ) : (                                                                                                         
                            link == "" ? (                                                                                            
                                <p className={styles.mensajeError}><b>¡El link está vacío!</b></p>                                    
                            ) : (                                                                                                     
                                subido ? (                                                                                            
                                    <p className={styles.mensajeExito}><b>¡Subido! Fijate los pines</b></p>                           
                                ) : (                                                                                                 
                                    <div className={styles.botonSubir}>                                                               
                                    <Button funcion={postPin} texto={"Subir"}></Button>                                               
                                    </div>                                                                                            
                                )                                                                                                     
                            )                                                                                                         
                        )                                                                                                             
                    }                                                                                                                 
                    {                                                                                                                 
                        errorSubida ? (                                                                                               
                            <p className={styles.mensajeError}><b>¡Error! El link es demasiado largo, usá otro</b></p>                                                
                        ) : (                                                                                                         
                            <p></p>                                                                                                   
                        )                                                                                                             
                    }                                                                                                                 
                </div>                                                                                                                
                                                                                                                                      
                                                                                                                                      
                <div className={styles.botonVolver}>                                                                                  
                    <Button funcion={volver} texto={"Volver"}></Button>                                                               


                </div>
           </div>  
         </div>
    )
}