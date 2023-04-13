import React, { useState } from 'react'
import '../styles/Login.css'
import Swal from 'sweetalert2';
//dos importaciones para ingresar a cuenta en auth
import {auth} from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate=useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  
  const handleChange=(e)=>{
    if(e.target.name==='email'){
      setCorreo(e.target.value);
    }else if(e.target.name==='password'){
      setPassword(e.target.value);
    }
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();

    // console.log(correo,password,password2)
    //comprobamos del lado del cliente que el correo sea valido.
    const expresionRegular=/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    //si el input correo es diferente a expresion regular ingrese correo valido 
    if(!expresionRegular.test(correo)){
      Swal.fire('Invalido','Correo Invalido','warning')
      return;
      }
  //comprobamos que ingrese todos los campos
  if(correo===''|| password===''){
          // console.log('llene los campos');
      Swal.fire('Llenar','Complete los campos','warning')
      return;
      }

      try {
        //esto nos permite ingresar a la cuenta en firebas auth
        await signInWithEmailAndPassword(auth, correo,password);
        // createUserWithEmailAndPassword(auth, email, password)
        // console.log('El usuario se creo con exito');
        //nos permite redireccionar a la raiz una vez creada la cuenta
        navigate('/')
      } catch (error) {
        
        
        
        console.log(error)


       // let mensaje;
    switch (error.code) {
        case 'auth/wrong-password':
            
            Swal.fire('Error','Contraseña incorrecta','error')
            break;
        case 'auth/user-not-found':
            Swal.fire('Error','No se encontro ninguna cuenta con este correo electronico','error')
            break
        
        default:
         
          Swal.fire('Error','No se pudo iniciar Session','error')
            break;
        }
         // setAlerta({tipo:'error',mensaje:mensaje})
        console.log('recibe el error en inicio sesion')
        }


  }
  return (
         
<div className='formulario'>
<h1 className='text-center'>Inicio de Sesion</h1>
  <form className='text-center' onSubmit={handleSubmit}>
    <div>
        <input 
       type="email"
       name="email"
       placeholder='Correo Electrónico'
       value={correo}
       onChange={handleChange}
        required
         />
        
    </div>
    <div>
        <input 
            type="password"
            name="password"
            placeholder='Contraseña'
            value={password}
            onChange={handleChange}
        required
         />
        
    </div>
    <div className='recordar'>
      ¿Olvido su Contraseña?
    </div>
    <div className='registrarse' >
        Quiero solicitar mi usuario
    </div>
       <button 
      type="submit"
      className='btn btn-success'
      >Ingresar
       </button>
  </form>
</div>
    
       
  ) 
}

export default Login