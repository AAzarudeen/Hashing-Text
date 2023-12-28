import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { database } from "../firebase-config";
import { useLocation } from "react-router-dom";
import Info from "./info";

function Saved(probs) {

    const location = useLocation();
    const uid = location.state?.uid;

    const [data,setData] = useState([])

    useEffect(()=>{
        const asyncfunc = async ()=>{
            const q =  query(collection(database,"data"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            var dataList = []
    querySnapshot.forEach((doc) => {
        dataList.push(doc.data())
    });
    setData(dataList)
    console.log(dataList)
    }
        asyncfunc()
    },[])


    return(
        <div>
            {data.map((e)=>{
       return(
        <Info algo={e.algo} hash={e.hash} input={e.input}/>
       )
     })}
        </div>
    )
}

export default Saved