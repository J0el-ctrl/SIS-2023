import React, { useState } from 'react'
import {db} from '../firebase/firebaseConfig'
import {uploadFile} from '../firebase/firebaseConfig'
import Swal from 'sweetalert2';
import { collection, addDoc } from "firebase/firestore"; 
   
   
const CrearCarrusel = () => {

    const [imgurlpublicacion, setImgurlpublicacion] = useState('')
   
    const [nombre, setNombre] = useState('')
   
    /* nos permite agregar el firestore */
    const agregar=async(e)=>{
        e.preventDefault()
        const docRef = await addDoc(collection(db, "imgbanner"), {
            nombre: nombre,
            urlimgbanner: imgurlpublicacion
          });
          console.log("se creo su doc. ID: ", docRef.id);
            Swal.fire('Ok','registro completado','success')
            setNombre('')
            setImgurlpublicacion('')    
                     
    }


    /* manejar el storage para imagen */
    const [file, setFile] = useState(null)
    const handleImg=async(e)=>{
        e.preventDefault();
        try {
            const result=await uploadFile(file)
            console.log(result)
            setImgurlpublicacion(result)
        } catch (error) {
            console.log(error);
        }
    }
   

  return (
    <div>
    <h2 className="text-center mt-2">Gestionar Banner Inicio</h2>
<div className="py-5">
    <div className="d-block w-100 bg-info">
    <div className="container">
    <form onSubmit={agregar} className="text-center py-5">
        <div className="row">
            <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <input
                    onChange={e=>setNombre(e.target.value)}
                    value={nombre}
                    name="nombre"
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre"/>
            </div>
            <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <input 
                onChange={e=>setImgurlpublicacion(e.target.value)}
                value={imgurlpublicacion}
                type="text"
                name="url"
                className="form-control mb-2"
                placeholder="INGRESE URL "/>
            </div>
        </div>
        
             <button 
                 type="submit"
                className="btn btn-secondary w-100">Enviar</button>
    </form>
            

     </div>
     </div>
     </div>
     <div className="text-center">
     <input type="file" className="btn btn-warning" onChange={e=>setFile(e.target.files[0])} />
<button className="btn btn-info" onClick={handleImg}>Subir Foto</button>
<br /><br /><br /><hr />

{imgurlpublicacion}
<br />
<img src={imgurlpublicacion} alt="" />

     </div>
</div>
  )
}

export default CrearCarrusel