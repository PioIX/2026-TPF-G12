"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useSegmentState } from "next/dist/next-devtools/userspace/app/segment-explorer-node";

export default function ModColeccionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  let id_user = parseInt(searchParams.get("id_user"));
  let A = parseInt(searchParams.get("A"));
  let id_coleccion = parseInt(searchParams.get("id_coleccion"))

  // ver desde acá

  const [nombreCol, setNombreCol] = useState(""); 
  const [pins, setPins] = useState([]);
  const [usuarios, setUsuarios] = useState([id_user]);
  const [inputPin, setInputPin] = useState("")
  const [yaExistePin, setYaExistePin] = useState(false)
  const [inputUser, setInputUser] = useState("")
  const [yaExisteUser, setYaExisteUser] = useState(false)
  const [pinExiste, setPinExiste] = useState(0)
  const [userExiste, setUserExiste] = useState(0)
  const [cargando, setCargando] = useState(0)
  const [okColeccion, setOkColeccion] = useState(0)
  const [okUsuarios, setOkUsuarios] = useState(0)
  const [listoUsuarios, setListoUsuarios] = useState(0)
  const [listoColeccion, setListoColeccion] = useState(0)
  const [okColeccion2, setOkColeccion2] = useState(0)
  const [okUsuarios2, setOkUsuarios2] = useState(0) 

// ----------------------------------------------- Use effects ------------------------------------------

  useEffect(() => {
    fetch("http://localhost:4000/getcoleccionespec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_coleccion: id_coleccion })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de la coleccion especifica:", data);
        if (data.pines.length == 0) {
          console.log("vacio")
          
        } else {
          setPins(data.pines.map((pin) => pin.id_pin))
          setUsuarios(data.usuarios.map((user) => user.id_usuario))
          setNombreCol(data.nombre[0].nombre_coleccion)
        }
      });
  }, [])

  useEffect(() => {
    fetch("http://localhost:4000/getpinespec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_pin: inputPin })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos del pin especifico:", data);
        if (data.pin.length == 0) {
          console.log("vacio")
          setPinExiste(0)
          console.log(pinExiste)
        } else {
          setPinExiste(1)
          console.log(pinExiste)
        }
      });
  }, [inputPin])


  useEffect(() => {
    fetch("http://localhost:4000/getuserespec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usuario: inputUser })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos del usuario especifico:", data);
        if (data.user.length == 0) {
          console.log("vacio")
          setUserExiste(0)
          console.log(userExiste)
        } else {
          setUserExiste(1)
          console.log(userExiste)
        }
      });
  }, [inputUser])







 useEffect(() => {
    let cuerpo2;
    console.log("coleccion effect ")
     console.log(okColeccion)
    console.log(okColeccion2)

    if (okColeccion == 1 && okColeccion2 == 1) {
      console.log("holal")
      console.log(id_coleccion)
      console.log(pins)
      pins.map((p, i) => {
        console.log("hola estoyy en el map")
        cuerpo2 = {
          id_pin: p,
          id_coleccion: id_coleccion
        }

        console.log(cuerpo2)
        fetch('http://localhost:4000/pinporcoleccionnuevo', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cuerpo2)
        })
          .then(response => response.json())
          .then(data => {
            console.log('Datos', data);

            if (data.ok == true) {
              console.log("funcionó pin por colec")
            } else {
              console.log("error")
            }
            if (i == pins.length - 1) {
              setOkColeccion(0)
              setOkColeccion2(0)
              setListoColeccion(1)
            }
          });
      })
    };
  }, [okColeccion2, okColeccion])



  useEffect(() => {
    let cuerpo3;
        console.log("usuarios effect ")
     console.log(okUsuarios)
    console.log(okUsuarios2)
    if (okUsuarios == 1 && okUsuarios2 == 1) {
      console.log("hola2")
      console.log(id_coleccion)
      console.log(usuarios)
      usuarios.map((u, i) => {
        console.log("hola estoy en el map de usuarios")
        cuerpo3 = {
          id_usuario: u,
          id_coleccion: id_coleccion
        }

        console.log(cuerpo3)
        fetch('http://localhost:4000/coleccionporusuarionueva', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cuerpo3)
        })
          .then(response => response.json())
          .then(data => {
            console.log('Datos', data);

            if (data.ok == true) {
              console.log("funcionó user por colec")
            } else {
              console.log("error")
            }
            if (i == usuarios.length - 1) {
              setOkUsuarios(0)
              setOkUsuarios2(0)
              setListoUsuarios(1)
            }
          });
      })
    };
  }, [okUsuarios, okUsuarios2])

  useEffect(() => {
    if (listoColeccion == 1 && listoUsuarios == 1) {
      console.log("tiki tiki")
      router.push("/vercolecciones?id_user="+id_user+"&A="+A)
    }
  }, [listoColeccion, listoUsuarios])

  



  

// ------------------------------------------------ Funciones ---------------------------------------------

  function prueba(){
    console.log("id user : "+id_user)
    console.log("A: "+A)
    console.log("nombre col: "+nombreCol)
    console.log("pins: "+pins)
    console.log("usuarios: "+usuarios)
    console.log("input pin: "+inputPin)
    console.log("input user: "+inputUser)
    console.log("id coleccion: "+ id_coleccion)
    console.log("ok nombre de la coleccion: "+ okColeccion)
  }

  function ponerPin(){
    const noSePuede = pins.some(numero => inputPin == numero)
    console.log(noSePuede)
    if (noSePuede == false) {
      if (pinExiste == 1) {
        setPins((prev)=>[...prev,inputPin])
        setYaExistePin(false)
        setInputPin("")
      }
        
    } else {
      setYaExistePin(true)
    }
  }

  function textoExistePin(){
    if (yaExistePin == true) {
      return(
        <p>Este pin ya está en la lista</p>
      )
    } else {
      return(
        <p></p>
      )
    }
  }

  function ponerUser(){
    const noSePuede = usuarios.some(numero => inputUser == numero)
    console.log(noSePuede)
    if (noSePuede == false) {
      if (userExiste == 1){
        setUsuarios((prev)=>[...prev,inputUser])
        setYaExisteUser(false)
        setInputUser("")
      }
      
    } else {
      setYaExisteUser(true)
    }
  }


  function textoExisteUser(){
    if (yaExisteUser == true) {
      return(
        <p>Este usuario ya está en la lista</p>
      )
    } else {
      return(
        <p></p>
      )
    }
  }

  function condicionBoton(){
    if (usuarios.length > 0) {
      if (pins.length > 0) {
        if (nombreCol != "") {
          if (cargando == 0) {
            return (
              <Button funcion={modColeccion} texto={"Editar la Colección"}></Button>
            )
          } else {
            return (<h4>Modificando coleccion...</h4>)
          } 
          
        }   return (<p><b>¡Cuidado! la colección tiene que tener un nombre</b></p>)
      } else{
        return (<p><b>¡Cuidado! la colección tiene que tener al menos un pin</b></p>)
      }  

    } else{
      return (<p><b>¡Cuidado! la colección tiene que tener al menos un usuario</b></p>)
    }  
  }


  // ------------------------------------------------ Crear coleccion ---------------------------------------------
  
  function modColeccion(){
    setCargando(1)
    const cuerpo1 = {nombre_coleccion: nombreCol, id_coleccion: id_coleccion}
    const cuerpoId = {id_coleccion: id_coleccion}

    fetch('http://localhost:4000/modificarcoleccion', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cuerpo1)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos', data);

        if (data.ok == true) {
          console.log("se puede seguir")
          setOkColeccion(1)
          setOkUsuarios(1)
        } else {
          console.log("error")
        }
      });

    fetch('http://localhost:4000/pinporcoleccionmodificar', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cuerpoId)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos pinporcolec', data);
        console.log(cuerpoId)

        if (data.ok == true) {
          console.log("se puede seguir colec")
          setOkColeccion2(1)
        } else {
          console.log("error")
        }
      });

    fetch('http://localhost:4000/coleccionporusuariomodificar', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cuerpoId)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos', data);

        if (data.ok == true) {
          console.log("se puede seguir user")
          setOkUsuarios2(1)
        } else {
          console.log("error")
        }
      });
  
}


  function volver(){
    router.back()
  }

  function quitarPin(){
    const noSePuede = pins.some(numero => inputPin == numero)
    console.log(noSePuede)
    if (noSePuede == true) {
      if (pinExiste == 1) {
        let t =pins.filter((p)=>p!=inputPin)
        setPins(t)
        setInputPin("")
      }
    } else {
      
    }
  }


  function quitarUser(){
    const noSePuede = usuarios.some(numero => inputUser == numero)
    console.log(noSePuede)
    if (noSePuede == true) {
      if (userExiste == 1&&inputUser!=id_user) {
        let t =usuarios.filter((p)=>p!=inputUser)
        setUsuarios(t)
        setInputUser("")
      }
    } else {
      
    }
  }












  return (
    <div>
      <div>
        <h1>Editar colección</h1>
        <Button funcion={prueba} texto={"consnole logs"}></Button>
        <br></br>
        <Button funcion={volver} texto={"Volver"}></Button>
        <br></br>
        <input type="text" value={nombreCol} onChange={(e) => setNombreCol(e.target.value)} placeholder="Cambiar nombre de la colección"></input>
        <br></br>
        <input type="number" onChange={(e) =>{if(e.target.value<=999) setInputPin(e.target.value)} } value={inputPin} placeholder="Escribir el id de los pines acá"></input>
        {
          inputPin == 0 ? (
            <p></p>
          ) : (
            <>
            
              <Button funcion={ponerPin} texto={"Poner pin"}></Button>
              <Button funcion={quitarPin} texto={"Quitar pin"}></Button>
            </>
          )
        }
          
        {yaExistePin == true? (
          <p>Ya existe este pin</p>
        ):(<p></p>)}

        {pinExiste == 1? (
          <p></p>
        ):(
          inputPin != ""? (<p>¡Este Pin no existe!</p>):(
            <p></p>
          )
          
        )
        }
         
        <p>Pines hasta ahora: </p>
        {pins.map((p,i)=><p key={i}>{p}</p>)}
        <br></br>
        <input type="number" onChange={(e) =>{if(e.target.value<=999) setInputUser(e.target.value)} } value={inputUser} placeholder="Escribir el id de los usuarios acá"></input>
        {
          inputUser == 0 ? (
            <p></p>
          ) : (
            <>
              <Button funcion={ponerUser} texto={"Poner Usuario"}></Button>
              <Button funcion={quitarUser} texto={"Quitar usuario"}></Button>
            </>
          )
        }
        {textoExisteUser()}
        {userExiste == 1? (
          <p></p>
        ):(
          inputUser != ""? ( <p>¡Este usuario no existe!</p>):(
            <p></p>
          )
         
        )
        }
        <p>Usuarios hasta ahora (el primero sos vos):  </p>
        {usuarios.map((u,i)=><p key={i}>{u}</p>)}

        <br></br>

        {condicionBoton()}


      </div>
    </div>
  );
}

