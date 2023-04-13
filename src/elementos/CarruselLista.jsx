import React, { useEffect, useState } from 'react'
import {db} from '../firebase/firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";


const CarruselLista = () => {

    const [listabanner, setListabanner] = useState([])
    useEffect(() => {
      onSnapshot(
        collection(db,'imgbanner'),
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
     

        await deleteDoc(doc(db,'imgbanner',id))
    } catch (error) {
        console.log(error);
    }

}

  return (
    <React.Fragment>
    <div className="container py-5">
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12 col-xxl-12">
                    <h2 className="text-center text-cuerpo">Banner Publicitario </h2>
                    <ul className="list-group">
                                  
                        {
                            listabanner.map(item=>(
                                <li className="list-group-item" key={item.id}>
                                    <div className="table-responsive-md">
                                        <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="text-dark">NOMBRE</th>
                                            <th className="text-dark">IMAGEN</th>
                                        </tr>
                                    </thead>
                                            
                                    <tbody>
                                            <tr>
                                                <td className="table-info">{item.nombre}</td>
                                                <td className="table-info ">{item.urlimgbanner}</td>
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

export default CarruselLista