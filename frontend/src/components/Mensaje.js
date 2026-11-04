"use client";

import { useEffect, useState } from "react";

export default function Mensaje({pruebaEffect, nuevosMensajes}) {

  return (
    <div>
      {nuevosMensajes && nuevosMensajes.map((mensaje, index) => {
        return (<div key={mensaje.id_mensaje}>
          <p><b>Mensaje de {mensaje.sender}: </b></p>
          {mensaje.es_imagen == 1 ? (
            <img src={mensaje.contenido}></img>
          ) : mensaje.es_link == 1 ? (
            <a href={mensaje.contenido}>{mensaje.contenido}</a>
          ) : (
            <p>{mensaje.contenido} </p>
          )}
        </div>)
        
      })}
    </div>
  );
}
