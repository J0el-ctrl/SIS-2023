import React, { useContext, useEffect, useState } from 'react'
import {db} from '../../firebase/firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import {AuthContext} from '../../contextos/AuthContext';
import { Link } from 'react-router-dom';


const ListarServicios = () => {

    const {usuario} =useContext(AuthContext)

        const [listaservicios, setListaservicios] = useState([])
        useEffect(() => {
            onSnapshot(
              collection(db,'servicios'),
              (snapshot)=>{
                /* console.log((snapshot.docs[0].data())); */
                const arreglobanner=snapshot.docs.map((documento)=>{
                  /* traeme todos los doc y tambien el id para identificar el documento */
                  return {...documento.data(),id:documento.id}
                })
                setListaservicios(arreglobanner);
              },
              (error)=>{
                console.log(error);
              }
            );
        }, [])

        const eliminar =async(id)=>{
            try {
                await deleteDoc(doc(db,'servicios',id))
                    } catch (error) {
                  console.log(error);
              }
          }
  return (
    <>
    {
      usuario==null?(
        <div>
             <h2 className="text-center text-cuerpo  py-5">Nuestros Servicios </h2>
    <div className="container py-5">            
        <div className="row justify-content-center">
            {                
                listaservicios.map(item=>(
                    <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4 col-xxl-4  py-3" key={item.id}>
                     <div className="card">
                 <img src={item.imgurlservicios} className="card-img-top" alt="..."/>
            <div className="card-body text-center">
                      <h5 className="card-title">{item.nombreservicios}</h5>
                 <p className="card-text">{item.detalleservicios}</p>
                 <Link className="btn btn-info mt-3" to="/ubicanos">Contáctenos</Link>                    
           
       
        
            </div>
    </div>
                    </div>
                ))
            }

        </div>
    </div>
       
 
</div>
      ):(
        <div>
             <h2 className="text-center text-cuerpo  py-5">Nuestros Servicios </h2>
    <div className="container py-5">            
        <div className="row justify-content-center">
            {                
                listaservicios.map(item=>(
                    <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4 col-xxl-4  py-3" key={item.id}>
                     <div className="card">
                 <img src={item.imgurlservicios} className="card-img-top" alt="..."/>
            <div className="card-body text-center">
                      <h5 className="card-title">{item.nombreservicios}</h5>
                 <p className="card-text">{item.detalleservicios}</p>
                 <Link className="btn btn-info mt-3" to="/ubicanos">Contáctenos</Link>                    
           
         {
            usuario.rol ==='admin'?(
              <button 
              className="btn btn-danger w-100 mt-3"
              type="button"
              onClick={()=>eliminar(item.id)}
              >Eliminar</button>
                        ):(
                      
                           null         )
          }
        
            </div>
    </div>
                    </div>
                ))
            }

        </div>
    </div>
       
 
</div>
      )
    }

</>
  )
}

export default ListarServicios