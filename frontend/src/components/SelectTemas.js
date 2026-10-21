"use client"

export default function SelectTemas({nombre, onchangefunc}){
    return(
        <select name={nombre} onChange={onchangefunc}>
            <option value={""}>Nada (dejar vacio)</option>
            <option value={"comida"}>Comida</option>
            <option value={"memes"}>Memes</option>
            <option value={"ropa"}>Ropa</option>
            <option value={"animales"}>Animales</option>
        </select>
    )
}