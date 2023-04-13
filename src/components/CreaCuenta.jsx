import React, { useState } from 'react'

//para crear el usuario en firebase e iniciar
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase/firebaseConfig'
import Swal from 'sweetalert2';
//import {useNavigate} from 'react-router-dom'
import { doc ,setDoc } from 'firebase/firestore';
import {db} from '../firebase/firebaseConfig';
const CreaCuenta = () => {

   // const navigate=useNavigate()

    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
     const [rol, setRol] = useState('')


     //recoje el evento y con target.name indica si el caso es email o password selecciona ell valor
     const handleChange=(e)=>{
        // console.log(e.target.name)
        switch (e.target.name) {
          case 'email':
            setCorreo(e.target.value);    
            break;
        
          case 'password':
            setPassword(e.target.value);    
            break;
        
          case 'password2':
            setPassword2(e.target.value);    
            break;
          case 'rol':
            setRol(e.target.value);    
            break;
        
          default:
            break;
        }
      }

    //manejando el Submit del formulario
    const handleSubmit=async(e)=>{
        e.preventDefault();

    //comprobamos del lado del cliente que el correo sea valido.
      const expresionRegular=/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    //si el input correo es diferente a expresion regular ingrese correo valido 
    if(!expresionRegular.test(correo)){
        Swal.fire('Invalido','Correo Invalido','warning')
        return;
        }
    //comprobamos que ingrese todos los campos
    if(correo===''|| password==='' || password2===''){
            // console.log('llene los campos');
        Swal.fire('Llenar','Complete los campos','warning')
        return;
        }
          
    // comprobamos que las contraseñas sean iguales
    if(password !== password2){
            console.log('las compraseñas no son iguales');
    Swal.fire('Error','Las contraseñas no son iguales','warning')
    return;
        }
    //Se registro correctamente 
      Swal.fire('Ok','Registro satisfactorio','success')

    //manejando la limpieza de los campos de los inputs
     setCorreo('')
    setPassword('')
    setPassword2('')




    //manejando el tryCath para registro de usuario
    try {
        //esto nos crear la cuenta en firebas auth
       const infoUsuario= await createUserWithEmailAndPassword(auth, correo,password)
       .then((usuarioFirebase)=>{
        return usuarioFirebase
       });
        // createUserWithEmailAndPassword(auth, email, password)
        // console.log('El usuario se creo con exito');
        //nos permite redireccionar a la raiz una vez creada la cuenta
        // navigate('/')
        const docuRef=doc(db,`usuarios/${infoUsuario.user.uid}`);
        setDoc(docuRef, { correo: correo, rol: rol , password:password});
  
    } catch (error) {
                console.log(error)
        // let mensaje;
        switch (error.code) {
          case 'auth/invalid-password':
            //   mensaje='La contraseña tiene que ser de al menos 6 caracteres'
              Swal.fire('Error','Ingreso una contraseña invalida','error')
            break;
        
          case 'auth/email-already-in-use':
            Swal.fire('Error','Ya existe una cuenta con el correo electrónico proporcionado','error')
            //   mensaje='Ya existe una cuenta con el correo electrónico proporcionado'
              //analizar con otro metodo de alerta para evitar tantas complicaciones cpon sweet alert
            break;
          case 'auth/weak-password':
            Swal.fire('Error','La contraseña tiene que ser de al menos 6 caracteres','error')
            //   mensaje='Ya existe una cuenta con el correo electrónico proporcionado'
              //analizar con otro metodo de alerta para evitar tantas complicaciones cpon sweet alert
            break;
        
          case 'auth/invalid-email':
            Swal.fire('Error','El correo electrónico no es válido','error')
            //   mensaje='El correo electrónico no es válido'
            break;
        
          default:
            // Swal.fire('Error','Hubo un error al intentar crear la cuenta','error')
            // mensaje='Hubo un error al intentar crear la cuenta'
            break;
        }
        // Swal.fire('Error',mensaje,'warning')
        console.log('recibe el error');
        
    }
    



    }


  return (
    <>
    <div className='formulario'>
    <h1 className='text-center'>Registrar</h1>
      <form className='text-center py-2'  onSubmit={handleSubmit}>
        <div>
            <input 
            type="email" 
            name="email"
            className='form-control'
            placeholder='Email' 
            value={correo}
            onChange={handleChange}
            id='email'
            required />
            
        </div>
        <br />
        <div>
            <input 
            type="password"
            name='password'
            className='form-control'
            placeholder='Ingrese su contraseña'
            value={password}
            onChange={handleChange}
            id='password'
            required />
            
        </div>
        <br />
        <div>
            <input 
            type="password"
            name='password2' 
            className='form-control'
            placeholder='Repita su contraseña'
            value={password2}
            onChange={handleChange}
            id='password2'
            required />
            
        </div>
        <br />
        <label>
          Rol:
          <select  name='rol'   onChange={handleChange} className='form-select'>
            <option >Seleccionar rol</option>
            <option value="admin">Administrador</option>
            <option value="doctor">Doctor</option>
            <option value="tecnico">Tecnico</option>
            <option value="asistente">Asistente</option>
            <option value="user">Usuario</option>
          </select>
        </label>
        <br />
        <br />
        <button 
          type='submit'
          className='btn btn-success w-100'
          >Registrar
           </button>
      </form>
      
    
    </div>
    </>
  )
}

export default CreaCuenta