import React, { useState } from 'react'
import {db} from '../firebase/firebaseConfig'
import Swal from 'sweetalert2';
import { collection, addDoc } from "firebase/firestore"; 
import '../styles/Login.css'

import MyComponent from '../elementos/MapasGoogle';


const Ubicanos = () => {
  const [contactoNombre, setContactoNombre] = useState('')
    const [contactoApellido, setContactoApellido] = useState('')
    const [contactoEmail, setContactoEmail] = useState('')
    const [contactoTelefono, setContactoTelefono] = useState('')
    const [contactoMensaje, setContactoMensaje] = useState('')
    
     /* nos permite agregar el firestore */
     const agregar=async(e)=>{
      e.preventDefault()
      const docRef = await addDoc(collection(db, "contactanos"), {
        contactoNombre: contactoNombre,
        contactoApellido: contactoApellido,
        contactoEmail:contactoEmail,
        contactoTelefono:contactoTelefono,
        contactoMensaje:contactoMensaje,
        });
        Swal.fire('Ok','registro completado','success')
          setContactoNombre('')
          setContactoApellido('')
          setContactoEmail('')
          setContactoTelefono('')
          setContactoMensaje('') 
                   
  }

  return (
    <>
<div>
      <div>
            <div className="container">
                <div className="row py-5">
                    <div className="text-center  col mb-5 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 display-4 fst-italic">
                        <h2>FORMULARIO DE CONTACTO</h2>
                        <p>Nuestra especilidad : Su sonrisa</p>
                        </div>
                </div>
           </div>
      </div>
                           
            

           <div className="d-block w-100 bg-info">
            <div className="container">
            <form onSubmit={agregar} className="text-center py-5">
                <div className="row">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input
                        onChange={e=>setContactoNombre(e.target.value)}
                        value={contactoNombre}
                        type="text"
                        className="form-control mb-2"
                        placeholder="Nombre"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setContactoApellido(e.target.value)}
                        value={contactoApellido}
                        type="text"
                        className="form-control mb-2"
                        placeholder="Apellidos"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setContactoEmail(e.target.value)}
                        value={contactoEmail}
                        type="email"
                        className="form-control mb-2"
                        placeholder="Email"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setContactoTelefono(e.target.value)}
                        value={contactoTelefono}
                        type="text"
                        className="form-control mb-2"
                        placeholder="Telefono"/>
                    </div>
                </div>
                <textarea  
                        onChange={e=>setContactoMensaje(e.target.value)}
                        value={contactoMensaje}
                        type="text"
                        className="form-control mb-2 w-100"
                        placeholder="Mensaje"  ></textarea>
            <button 
            type="submit"
            className="btn btn-secondary w-100">Enviar</button>

              </form>
             </div>
             </div>

             <div className="container py-5">
             
             <div className="row">
                 <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                     <h2 className="text-titulo text-center">UBICANOS</h2>
                     <br /><br />
                     <h2><i className="fas fa-home"></i></h2> 
                     <p className="text-cuerpo fs-5">  Prolg. AV. Pacasmayo Mz A Lote 02 - Residencial las vegas - SMP
                    
                    </p> 

                    <h2><i className="fas fa-home"></i></h2> 
                     <p className="text-cuerpo fs-5">  Av. Cesar Vallejo Mz B Lote 15 - El Agustino
                         
                    </p> 
                    
                 </div>
                 <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                 <MyComponent/>
                </div>
             </div>
             </div>


        </div>
    </>
  )
}

export default Ubicanos