import Hashing from './hashing';
import { signOut } from 'firebase/auth';
import { auth, database } from "../firebase-config";
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

function MainPage(probs) {



    const [userName,setName] = useState('')

    const location = useLocation();
    const uid = location.state?.uid;
    const navigate = useNavigate()

    console.log(uid)


    useEffect(()=>{
        const asyncFn = async ()=>{
            const q = await getDoc(doc(database,"users",uid))
    
            console.log(q.data().name)
            var cipherBytes = CryptoJS.AES.decrypt(q.data().name, "regPassword");
            var nameDe = JSON.parse(cipherBytes.toString(CryptoJS.enc.Utf8))
            console.log(typeof nameDe)
            var cipherBytes = CryptoJS.AES.decrypt(q.data().email, "regPassword");
            var emailDe = JSON.parse(cipherBytes.toString(CryptoJS.enc.Utf8))
            console.log(emailDe)
            setName(nameDe.toString())
        }
        asyncFn()
    },[])

    const logout = async (e) => {
        await signOut(auth);
        navigate("/login")
      };

      
    return (
        <div className="App">
            <h1>{userName}</h1>
            <button onClick={logout}>Log out</button>
            <Hashing uid={uid} />
        </div>
    );
}

export default MainPage;