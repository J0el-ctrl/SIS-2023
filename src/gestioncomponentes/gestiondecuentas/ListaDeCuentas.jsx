import React, { useEffect, useState } from 'react'
import {db} from '../../firebase/firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import EditarCuentas from './EditarCuentas';
const ListaDeCuentas = () => {

    const [listadecuentas, setListadecuentas] = useState([])


    useEffect(() => {
        onSnapshot(
            collection(db,'usuarios'),
            (snapshot)=>{
              /* console.log((snapshot.docs[0].data())); */
              const arreglocuentas=snapshot.docs.map((documento)=>{
                /* traeme todos los doc y tambien el id para identificar el documento */
                return {...documento.data(),id:documento.id}
              })
              setListadecuentas(arreglocuentas);
            },
            (error)=>{
              console.log(error);
            }
          );
    }, [])
    
    const eliminar=async(id)=>{
        try{
            await deleteDoc(doc(db,'usuarios',id))
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div className="container py-5">
    <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12 col-xxl-12">
            <h2 className="text-center text-cuerpo">GESTION DE USUARIOS </h2>
            <ul className="list-group">
                          
                {
                    listadecuentas.map(item=>(
                        <li className="list-group-item" key={item.id}>
                            <div className="table-responsive-md">
                    <table className="table">
                            <thead>
                                <tr>
                                    
                                    <th className="text-dark">CORREO</th>
                                    <th className="text-dark">PASSWORD</th>
                                    <th className="text-dark">ROL</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        
                                        <td className="table-info">{item.correo}</td>
                                        <td className="table-info ">{item.password}</td>
                                        <td className="table-info">{item.rol}</td>
                                        
                                        <td>  <button 
                                        type="button"
                                        onClick={()=>eliminar(item.id)}
                                        className="btn btn-danger   ">
                                         Eliminar
                                            </button></td>

                                    {/* modal editar */}
                                    <td>
                                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target={`#`+(item.id)}>editar
                                 </button></td>
                                 </tr>
                                 </tbody>  
                    </table>
                                 <div className="modal fade" id={item.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

{/*  */}    
            
        
           <EditarCuentas key={item.id} id={item.id} correo={item.correo} password={item.password} rol={item.rol}/>

           
        
        

        {/*  */}
        </div>
{/* aqui el tr y tbody y table */}
                                
                           
                                    
                             
                              </div>
                        
                        </li>
                    ))
                }
            </ul>
        </div>
       
    </div>
    
</div>
  )
}

export default ListaDeCuentas