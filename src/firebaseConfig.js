import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAXFjJh1PFoeHY5Sljm4x8v_yYssLdN3UU",
    authDomain: "fir-101-50e00.firebaseapp.com",
    projectId: "fir-101-50e00",
    storageBucket: "fir-101-50e00.appspot.com",
    messagingSenderId: "384195614305",
    appId: "1:384195614305:web:3f8e26133f20a83b9c3c20",
    measurementId: "G-LQJDE1BLLC"
  };

  const app=initializeApp(firebaseConfig)
  export const db=getFirestore(app)
 