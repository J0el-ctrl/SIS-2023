import React from 'react'
import { signOut } from 'firebase/auth';
import {auth} from '../firebase/firebaseConfig';
import {NavLink, useNavigate} from 'react-router-dom'
import '../styles/Navbass.css'
/* import {useAuth} from './contextos/AuthContext'; */
const Navbar = () => {
 /*  const {usuario}=useAuth(); */
  const navigate=useNavigate();
  const cerrarSesion=async()=>{
    try {
        await signOut(auth)
        navigate('/login')
    } catch (error) {
        console.log(error);
    }
}

  return (
<div>
<nav className="navbar navbar-expand-lg bg-light">
  <div className="container">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <NavLink className="nav-link active" aria-current="page" to="/">Inicio</NavLink>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/servicios">Servicio</NavLink>
      </li>
      <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/resultados">Resultados</NavLink>
      </li>
      <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/ubicanos">Ubícanos</NavLink>
      </li>
        
      </ul>
    </div>
  
     <div>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <NavLink className="nav-link active  " aria-current="page" to="/login">Login</NavLink>
        </li>
       {/*  <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/creacuenta">Registrar</NavLink>
        </li> */}

       
       {/*  <li className="nav-item">
        <NavLink as="button" onClick={cerrarSesion} className="nav-link active" aria-current="page">Cerrar Session</NavLink>
        </li> */}
      </ul>
     </div>
         
 
  </div>
</nav>
</div>
  )
}

export default Navbar