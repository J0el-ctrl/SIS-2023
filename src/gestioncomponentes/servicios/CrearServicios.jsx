import React, { useState } from 'react'
import {db} from '../../firebase/firebaseConfig'
import {uploadFileServicios} from '../../firebase/firebaseConfig'
import Swal from 'sweetalert2';
import { collection, addDoc } from "firebase/firestore"; 
const CrearServicios = () => {

  const [imgurlservicios, setImgurlservicios] = useState('')
  const [nombreservicios, setNombreservicios] = useState('')
  const [costoservicios, setCostoservicios] = useState('')
  const [detalleservicios, setDetalleservicios] = useState('')
 
 /* nos permite agregar el firestore */
 const agregar=async(e)=>{
  e.preventDefault()
  const docRef = await addDoc(collection(db, "servicios"), {
    imgurlservicios:imgurlservicios,
    nombreservicios:nombreservicios,
    costoservicios:costoservicios,
    detalleservicios:detalleservicios
      
    });
    console.log("se creo su doc. ID: ", docRef.id);
      Swal.fire('Ok','registro de servicio completado','success')
      
      setImgurlservicios('')
      setNombreservicios('')
      setCostoservicios('')
      setDetalleservicios('')
               
}

 /* manejar el storage para imagen */
 const [file, setFile] = useState(null)
 const handleImg=async(e)=>{
     e.preventDefault();
     try {
         const result=await uploadFileServicios(file)
         console.log(result)
         setImgurlservicios(result)
     } catch (error) {
         console.log(error);
     }
 }

  return (
    <div>
    <h2 className="text-center mt-2">Gestionar servicios</h2>
<div className="py-5">
    <div className="d-block w-100 bg-info">
    <div className="container">
    <form onSubmit={agregar} className="text-center py-5">
        <div className="row">
            <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <input
                    onChange={e=>setNombreservicios(e.target.value)}
                    value={nombreservicios}
                    name="nombre"
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre"/>
            </div>
            <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <input 
                onChange={e=>setImgurlservicios(e.target.value)}
                value={imgurlservicios}
                type="text"
                name="url"
                className="form-control mb-2"
                placeholder="INGRESE URL "/>
            </div>
        </div>
        <div className="row">
            <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <input
                    onChange={e=>setCostoservicios(e.target.value)}
                    value={costoservicios}
                    name="nombre"
                    type="text"
                    className="form-control mb-2"
                    placeholder="costo"/>
            </div>
            <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <input 
                onChange={e=>setDetalleservicios(e.target.value)}
                value={detalleservicios}
                type="text"
                name="url"
                className="form-control mb-2"
                placeholder="detalle "/>
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

{imgurlservicios}
<br />
<img src={imgurlservicios} alt="" />

     </div>
</div>
  )
}

export default CrearServicios