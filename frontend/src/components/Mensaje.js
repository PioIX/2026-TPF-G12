"use client";

import { useEffect, useState } from "react";

export default function Mensaje({pruebaEffect, nuevosMensajes}) {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/getMensajesComponente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de los mensajes:", data);
        //console.log("es imagen: " +mensaje.es_imagen)
        //console.log("contenido: " +mensaje.contenido)
        //console.log("link: "+ mensaje.es_link)
        setMensajes(data.mensajes);
      });
  }, []);

  

  

  return (
    <div>
      {nuevosMensajes && nuevosMensajes.map((mensaje, index) => {
        return (<div key={mensaje.id_mensaje}>
          <p><b>Mensaje de {mensaje.sender}: </b></p>
          {mensaje.es_imagen == 1 ? (
            <img src={mensaje.contenido}></img>
          ) : mensaje.es_link == 1 ? (
            <link href={mensaje.contenido}>{mensaje.contenido}</link>
          ) : (
            <p>{mensaje.contenido} </p>
          )}
        </div>)
        
      })}
    </div>
  );
}
