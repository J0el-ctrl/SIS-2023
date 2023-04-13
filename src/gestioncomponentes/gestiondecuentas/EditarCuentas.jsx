import React, { useState } from 'react'
import {db} from '../../firebase/firebaseConfig';
import {doc,updateDoc} from 'firebase/firestore';


const EditarCuentas = ({id,correo,password,rol}) => {
  
                                                                    

    const [nuevocorreo, setNuevocorreo] = useState(correo)
    const [nuevopassword, setNuevopassword] = useState(password)
    const [nuevorol, setNuevorol] = useState(rol)

    const actualizarContacto=async(e)=>{
        e.preventDefault()

        try {
            await   updateDoc(doc(db,'usuarios',id),{
                correo:nuevocorreo,
                password:nuevopassword,
                rol:nuevorol
            })

        } catch (error) {
            console.log(error)
            console.log('no se puedo editar');
        }
     
    }


  return (
    <div>
        <div className="modal-dialog ">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{correo}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body"></div>
         <form onSubmit={actualizarContacto} >
    <div className="mb-3">
      <label for="recipient-name" className="col-form-label">Correo:</label>
      <input type="text" className="form-control" onChange={(e)=>setNuevocorreo(e.target.value)} value={nuevocorreo} />
    </div>
    <div className="mb-3">
      <label for="recipient-name" className="col-form-label">Password:</label>
      <input type="text" className="form-control" onChange={(e)=>setNuevopassword(e.target.value)} value={nuevopassword} />
    </div>
    <label>
    Rol:
    <select  name='rol'   className='form-select' onChange={(e)=>setNuevorol(e.target.value)} value={nuevorol}>
      <option >Seleccionar rol</option>
      <option value="admin">Administrador</option>
      <option value="doctor">Doctor</option>
      <option value="tecnico">Tecnico</option>
      <option value="asistente">Asistente</option>
      <option value="user">Usuario</option>
    </select>
  </label>
   
  <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" className="btn btn-success" >Guardar</button>
                
</div>
 </form>
  </div>
           
           
            </div>
        </div>
  

  )
}

export default EditarCuentas