
import { useEffect,useState } from 'react';
import {db} from './firebaseConfig'
import { collection,getDocs,addDoc } from '@firebase/firestore';
import { async } from '@firebase/util';

function App() {
  const [users,setusers]=useState([])
  const [newname,setname]=useState('')
  const [newage,setage]=useState(0)


  //making refs to firestore db
  const usercollecion=collection(db,"users")
  
   useEffect(()=>{
    const getusers=async()=>{
      const data=await getDocs(usercollecion)
      setusers(data.docs.map(doc=>({...doc.data(),id:doc.id})))
      // setusers(({...usersdata.docs.map(doc=>({...doc.data(),id:doc.id}))}))

    }
    getusers()
   },[])

   //CRUD OPERATIONS

   //create
    const create=async ()=>{
       await addDoc(usercollecion,{name:newname,age:newage})
    }

  return (
    <div className="App">
     <h1>hello firebase</h1>
     <hr/>
     <div>
      <input type="text" placeholder='name' onChange={(e)=>setname(e.target.value)}/>
      <br/><br/>
      <input type="number" placeholder='age' onChange={(e)=>setage(e.target.value)}/>
      <br/>
      <button onClick={create}>adduser</button>
     </div>
     {users.map(user=>(
      <div key={user.id} style={{border:'1px solid black',margin:'10px',width:"200px"}}>
         <h1>name:{user.name}</h1>
         <h1>age:{user.age}</h1>
      </div>
     ))}
    </div>
  );
}

export default App;
