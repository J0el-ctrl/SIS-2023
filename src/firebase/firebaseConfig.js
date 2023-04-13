// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';
// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyDv_ruNUCKTotJZwnFZZanN473EfVQ7Y5o",
  authDomain: "roles-obdent.firebaseapp.com",
  projectId: "roles-obdent",
  storageBucket: "roles-obdent.appspot.com",
  messagingSenderId: "358107317621",
  appId: "1:358107317621:web:53d343b9c1b7f5b6f33f3c"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp=initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
const auth=getAuth();
const db=getFirestore();
const storage=getStorage(firebaseApp)
export {db,auth,firebaseApp,storage};

/* para subir archivo stoarge  BANNER*/
export async function uploadFile(file){
  /* guardando en carptea banner las imagenes subidas con id unico de uuid v4 */
  const storageRef=ref(storage,`banner/${v4()}`)
  await uploadBytes(storageRef,file)
  /* para retornar url */
  const url =await getDownloadURL(storageRef)
  return url
}
/* para subir archivo stoarge  SERVICIOS*/
export async function uploadFileServicios(file){
  /* guardando en carptea banner las imagenes subidas con id unico de uuid v4 */
  const storageRef=ref(storage,`servicios/${v4()}`)
  await uploadBytes(storageRef,file)
  /* para retornar url */
  const url =await getDownloadURL(storageRef)
  return url
}