import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAmnVQ_fPnflpIpBBbbqU_su7zG3a2NP3M",
  authDomain: "login-loginout.firebaseapp.com",
  projectId: "login-loginout",
  storageBucket: "login-loginout.appspot.com",
  messagingSenderId: "572100197469",
  appId: "1:572100197469:web:9e7282a8c5d1cafb5261b4"
}



const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)