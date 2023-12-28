import { useNavigate } from 'react-router-dom';
import '../App.css';
import './login.css'
import { useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase-config";

function Login(probs) {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const changeLoginEmail = (e)=>{
    setLoginEmail(e.target.value)
  }

  const changeLoginPassword = (e)=>{
    setLoginPassword(e.target.value)
  }


  const navigate = useNavigate()

  const login = async () => {
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate("/mainpage",{state:{uid:users.user.uid}})
    } catch (error) {
      console.log(error.message);
      alert(error.message)
    }
  };

  return (
    <div className="App">
          <h1>Login</h1>
          <div className="form_container">
          <input id="username" placeholder='Enter Email' onChange={changeLoginEmail} type="text" className='form_item'/>
          <input id="password" placeholder='Enter Password' onChange={changeLoginPassword} type="password" className='form_item'/>
          <button className='form_item' onClick={login}>Login</button>
          <button className='form_item' onClick={()=>{
                navigate("/register")
          }}>Register</button>
          </div>
    </div>
  );
}

export default Login;