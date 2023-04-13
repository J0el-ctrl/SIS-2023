import React from 'react'

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Servicios from './components/Servicios';
import Resultados from './components/Resultados';
import Ubicanos from './components/Ubicanos';
import Navbar from './vistas/Navbar';
import Inicio from './components/Inicio';
import Login from './components/Login';
import CreaCuenta from './components/CreaCuenta';
import {useAuth} from './contextos/AuthContext';
import Dashboard from './paneldecontrol/Dashboard';
import CrearCarrusel from './elementos/CrearCarrusel';
import CarruselLista from './elementos/CarruselLista';
import ListaContactoMensajes from './gestioncomponentes/contacto/ListaContactoMensajes';
import CrearServicios from './gestioncomponentes/servicios/CrearServicios';
import ListaDeCuentas from './gestioncomponentes/gestiondecuentas/ListaDeCuentas';
function App() {

  const {usuario}=useAuth();
  return (
    <div>
       <BrowserRouter>
       {
        usuario==null?(

          <Navbar/>
          ):(
            <Dashboard/>
        )
       }   
       <Routes>
       <Route path='/' element={<Inicio/>}/> 
       <Route path='/servicios' element={<Servicios/>}/> 
       <Route path='/crearservicios' element={<CrearServicios/>}/> 
       <Route path='/login' element={<Login/>}/> 
       <Route path='/resultados' element={<Resultados/>}/> 
       <Route path='/ubicanos' element={<Ubicanos/>}/> 
       <Route path='/contactomensajes' element={<ListaContactoMensajes/>}/> 
       <Route path='/creacuenta' element={<CreaCuenta/>}/> 
       <Route path='/listadecuentas' element={<ListaDeCuentas/>}/> 
       <Route path='/creacarrusel' element={<CrearCarrusel/>}/> 
       <Route path='/listabanner' element={<CarruselLista/>}/> 
       </Routes>
       </BrowserRouter>
       
    </div>
  );
}

export default App;
