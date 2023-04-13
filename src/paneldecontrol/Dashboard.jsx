import React, { useContext, useState } from 'react'
import './EstiloDashboard.css';
import { useNavigate,Link} from 'react-router-dom'
import { signOut } from 'firebase/auth';
import {auth} from '../firebase/firebaseConfig';
/* import {useAuth} from '../contextos/AuthContext'; */
import {AuthContext} from '../contextos/AuthContext';
import { FaConfluence } from "react-icons/fa";
import { FaShopify,FaCuttlefish,FaMapMarkerAlt,FaReceipt } from "react-icons/fa"
const Dashboard = () => {

const {usuario} =useContext(AuthContext)



console.log(usuario,'clg de usuario')


/* controlar el Dashboard */
const [show, setShow] = useState(false);

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
    
    <main className={show ? 'space-toggle' : null}>
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
        </div>
      </header>

      <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            <Link to='/' className='nav-logo'>
              <i className={`fas fa-home-alt nav-logo-icon`}></i>
              <span className='nav-logo-name'>Inicio</span>
            </Link>
            
            <h6 className='nav-logo nav-logo-name'>{usuario.email}</h6>
            <h6 className='nav-logo nav-logo-name'>{usuario.rol}</h6>

            <div className='nav-list'>
              <Link to='/servicios' className='nav-link active'>
                <i className='nav-link-icon'><FaShopify/></i>
                <span className='nav-link-name'>servicios</span>
              </Link>
              <Link to='/crearservicios' className='nav-link active'>
                <i className=' nav-link-icon'><FaCuttlefish/></i>
                <span className='nav-link-name'>Crear servicio</span>
              </Link>
              <Link to='/resultados' className='nav-link'>
                <i className='fas fa-hotel nav-link-icon'></i>
                <span className='nav-link-name'>resultados</span>
              </Link>
              <Link to='/ubicanos' className='nav-link'>
                <i className=' nav-link-icon'><FaMapMarkerAlt/></i>
                <span className='nav-link-name'>ubicanos</span>
              </Link>


              {
                usuario.rol==='admin' || usuario.rol==='doctor'?(
                  <Link to='/contactomensajes' className='nav-link'>
                  <i className='nav-link-icon'><FaReceipt/></i>
                  <span className='nav-link-name'>M. de contacto</span>
                </Link>
                  
                ):(
                null
                )
              }
              {
                usuario.rol==='admin'?(
                  <Link to='/creacuenta' className='nav-link'>
                  <i className='fas fa-dollar-sign nav-link-icon'></i>
                  <span className='nav-link-name'>creacuenta</span>
                </Link>
                  
                ):(
                null
                )
              }
              {
                usuario.rol==='admin'?(
                  <Link to='/listadecuentas' className='nav-link'>
                  <i className='fas fa-dollar-sign nav-link-icon'></i>
                  <span className='nav-link-name'>L. de cuentas</span>
                </Link>
                  
                ):(
                null
                )
              }
              {
                usuario.rol==='admin'?(
                  <Link to='/creacarrusel' className='nav-link'>
                  <i className='nav-link-icon'><FaConfluence/></i>
                  <span className='nav-link-name'>crea banner</span>
                </Link>
                  
                ):(
                null
                )
              }
              {
                usuario.rol==='admin'?(
                  <Link to='/listabanner' className='nav-link'>
                  <i className='nav-link-icon'><FaConfluence/></i>
                  <span className='nav-link-name'>lista banner</span>
                </Link>
                  
                ):(
                null
                )
              }
                        
            </div>
          </div>

          <Link to='/login' className='nav-link'  onClick={cerrarSesion} >
            <i className='fas fa-sign-out nav-link-icon'></i>
            <span className='nav-link-name'>Cerrar sesion</span>
          </Link>
        </nav>
      </aside>

      {/* <p>contenido</p> */}
    </main>
  )
}

export default Dashboard