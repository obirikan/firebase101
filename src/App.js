
import { useEffect,useState } from 'react';
import {db} from './firebaseConfig'
import { collection,query,getDocs,where,addDoc,updateDoc,doc,deleteDoc,onSnapshot } from '@firebase/firestore';

function App() {
  const [users,setusers]=useState([])
  const [search,setsearch]=useState()
  const [als,seta]=useState()
  const [newname,setname]=useState('')
  const [newage,setage]=useState(0)


  //making refs to firestore db
  const usercollection=collection(db,"users")
  
   //CRUD OPERATIONS
    
   //Read
   useEffect(()=>{

    
    const getusers=async()=>{
      onSnapshot(usercollection,(snapshot)=>{
          
          setusers(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
          // setusers(snapshot.docs.map(doc=>(doc.data())))

      })

    }
    getusers()
   },[])

   //create
    const create=async ()=>{
       await addDoc(usercollection,{name:newname,age:Number(newage)})
    }
  //update
    const update=async (id,age)=>{
      const userupdate=doc(db,"users",id)
      const newfield={age:age+1}
       await updateDoc(userupdate,newfield)
    }
 //delete
   const del=async (id)=>{
  const userupdate=doc(db,"users",id)
   await deleteDoc(userupdate)
}
//search
const find=async ()=>{
 
 const all= query(usercollection,where("name",'==',search))
const querySnapshot = await getDocs(all);
 querySnapshot.forEach((doc) => {
    console.log(doc.data());
});

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
     <div>
     <input type="text" placeholder='search' onChange={(e)=>setsearch(e.target.value)}/>
     <button onClick={find}>search</button>
     </div>
     {users.map(user=>(
      <div key={user.id} style={{border:'1px solid black',margin:'10px',width:"500px"}}>
         <h1>name:{user.name}</h1>
         <h1>
          age:{user.age}
          <button onClick={()=>update(user.id,user.age)}>increase age</button>
          <button onClick={()=>del(user.id)}>delete user</button>
         </h1>
      </div>
     ))}
    </div>
  );
}

export default App;
