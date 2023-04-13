import React, { useEffect, useState } from 'react'
import {db} from '../../firebase/firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";


const ListaContactoMensajes = () => {

    const [listabanner, setListabanner] = useState([])
    useEffect(() => {
      onSnapshot(
        collection(db,'contactanos'),
        (snapshot)=>{
          /* console.log((snapshot.docs[0].data())); */
          const arreglobanner=snapshot.docs.map((documento)=>{
            /* traeme todos los doc y tambien el id para identificar el documento */
            return {...documento.data(),id:documento.id}
          })
          setListabanner(arreglobanner);
        },
        (error)=>{
          console.log(error);
        }
      );
  }, [])

  const eliminar =async(id)=>{
  try {
      await deleteDoc(doc(db,'contactanos',id))
          } catch (error) {
        console.log(error);
    }
}

  return (
    <React.Fragment>
    <div className="container py-5">
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12 col-xxl-12">
                    <h2 className="text-center text-cuerpo">Bandeja de Mensaje </h2>
                    <ul className="list-group">
                                  
                        {
                            listabanner.map(item=>(
                                <li className="list-group-item" key={item.id}>
                                    <div className="table-responsive-md">
                                        <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="text-dark">NOMBRE</th>
                                            <th className="text-dark">APELLIDO</th>
                                            <th className="text-dark">CORREO</th>
                                            <th className="text-dark">TELEFONO</th>
                                            <th className="text-dark">MENSAJE</th>
                                        </tr>
                                    </thead>
                                            
                                    <tbody>
                                            <tr>
                                                <td className="table-info">{item.contactoNombre}</td>
                                                <td className="table-info ">{item.contactoApellido}</td>
                                                <td className="table-info">{item.contactoEmail}</td>
                                                <td className="table-info ">{item.contactoTelefono}</td>
                                                <td className="table-info">{item.contactoMensaje}</td>
                                                <td>  <button 
                                                type="button"
                                                onClick={()=>eliminar(item.id)}
                                                className="btn btn-danger  float-end ">
                                                 Eliminar
                                                    </button></td>
                                            </tr>
                                    </tbody>
                                            
                                        </table>
                                      </div>
                                
                                </li>
                            ))
                        }
                    </ul>
                </div>
               
            </div>
            
        </div>
   </React.Fragment>
  )
}

export default ListaContactoMensajes