import { useState } from "react";
import "../App.css";
import './register.css'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, database } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

function Register(probs) {

    const navigate = useNavigate()

    const [regUser, setRegUser] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');


    const changeRegUser = (e)=>{
        setRegUser(e.target.value)
      }

    const changeRegEmail = (e)=>{
        setRegEmail(e.target.value)
      }
    
      const changeRegPassword = (e)=>{
        setRegPassword(e.target.value)
      }

      const register =  async (e) => {
        e.preventDefault(); 
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            regEmail,
            regPassword
          )
          console.log(user.user.uid)
          try{
            var nameEn = CryptoJS.AES.encrypt(JSON.stringify(regUser), "regPassword").toString();

            var emailEn = CryptoJS.AES.encrypt(JSON.stringify(regEmail), "regPassword").toString();
            console.log("ulla")
            await setDoc(doc(database, "users", user.user.uid), {
              "name": nameEn,
              "email": emailEn,
          });
           navigate('/mainpage',{state:{uid:user.user.uid}})
           console.log("veliya")
          }catch(error){
            console.log(error.message);    
          }

        } catch (error) {
          console.log(error.message);
        }
      };

  return (
    <div className="App">
      <h1>Register</h1>
      <div className="form_container">
      <input className="form_item" placeholder='Enter Username' id="text" onChange={changeRegUser} type="Name" />
        <input className="form_item" placeholder='Enter Email' id="email" onChange={changeRegEmail} type="email" />
        <input className="form_item" placeholder='Enter password' id="password" type="password" onChange={changeRegPassword}/>
        <button className="form_item" onClick={register}>Register</button>
        <button className="form_item"><a href="/login">Login</a></button>
      </div>
    </div>
  );
}

export default Register;
