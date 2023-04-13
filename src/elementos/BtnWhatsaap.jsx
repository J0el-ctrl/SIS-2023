import React from 'react'
import wspicon from '../imagenes/wsp-icon.png';
import './ElementosEstilos.css'
const BtnWhatsaap = () => {

    const numero='+51982562304'
    const mensaje='Deseo mas Información doctor muelas'

    const enlace =`https://wa.me/${numero}?text=${mensaje}`
  return (
    <div className="container-boton-wsp">
    <a href={enlace} target="_blank" rel="noopener noreferrer">
  <img className="boton-wsp" src={wspicon} alt=""/>
</a>
  
</div>
  )
}

export default BtnWhatsaap