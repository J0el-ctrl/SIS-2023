import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../firebase/firebaseConfig';
import {onAuthStateChanged,getAuth } from "firebase/auth";
import {firebaseApp} from "../firebase/firebaseConfig";

//se importa la credencial de autenticacion; onauthstatchanged escucha los cambios de sesion 
/* import { getAuth, onAuthStateChanged } from "firebase/auth"; */
import { getFirestore, doc, getDoc } from "firebase/firestore";




//creamos el contexto  
const AuthContext=React.createContext();

//creamos un hook para acceder al contexto y evitar las importaciones en cada hoja que se requiera 
const useAuth=()=>{
    return useContext(AuthContext)
}


//se crea la constante auth donde se guarda la credencial de autenticacion 
const authrol = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);





const AuthProvider = ({children}) => {



    const [usuario, setUsuario] = useState()

    //Creamos un state para saber cuando termina de cargar la comprobacion de onAuthStateChanged, saber si ya cargo el usuario y pueda mostrar los children, si no carga no muestra los children
    
    
    
    const [cargando, setCargando] = useState(true)
    
        //Efecto para ejecutar la comprobacion una sola vez
    useEffect(() => {
        //comprobamos si hay usuario o cambia de usuario
        //va a devolve resultados si hay usuario activo o inicio sesion si no incio session no devuelve nada NULL
      const cancelarSuscripcion = onAuthStateChanged(auth,(usuario)=>{
            setUsuario(usuario)
            setCargando(false)
           
        })
        return cancelarSuscripcion;
     
    }, []);


    /* PARA GESTIONAR LOS   ROLES */
 

    //se obtiene el Rol de uid o atraves de Uid
  async function getRol(uid) {
    //doc(firestore: Firestore, path: string, ...pathSegments: string[])
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    //regresar solo el ROL de la colecion 
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol
      };
      setUsuario(userData);
     /*  console.log("userData final", userData); */
    });
  }

  //establece el usuario a traves de la sesion de inicio de usuario de firebase
  //permite ver los cambios de usuario; recibe usuarioFirebase en caso exista 
  onAuthStateChanged(authrol, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final
      //si no existe el usuario corre la funcion para establecerlo
      if (!usuario) {
        //se pasa a la funcion setUserWithFirebaseAndRol
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
        setUsuario(null);
    }
  });
   
    return ( 
        //{usuario:usuario} deve devolver el propio usuario si no tiene nada devuelve  NULL
        <AuthContext.Provider value={{usuario:usuario}}>
            {/* cuando ya no estemos cargando mostraremos los children , osea ya cargo muestra los children*/}
            {!cargando && children}
        </AuthContext.Provider>
     );
}
 
export  {AuthProvider,AuthContext,useAuth};