import React, { useEffect, useState } from 'react'
import {db} from '../firebase/firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
const Carrusel = () => {

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


  return (
    <React.Fragment>
    

  
  
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">   
   {
     listabanner.map( (banners)=>(
     <div className="carousel-item active" key={banners.id }>
       <img src={banners.urlimgbanner} className="d-block w-100" width='1802' height='580' alt='...'/>
     </div>
     ))
 }
      
   </div>
   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
     <span className="visually-hidden">Previous</span>
   </button>
   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
     <span className="carousel-control-next-icon" aria-hidden="true"></span>
     <span className="visually-hidden">Next</span>
   </button>
 </div>
 
 
   </React.Fragment>
    
  )
}

export default Carrusel