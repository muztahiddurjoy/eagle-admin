import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../firebase"

const WhyChooseAdapter = ({text,refid,reload,newAdapter}:{text:string,refid:string,reload:Function,newAdapter:boolean}) => {
    const [whyChoose, setwhyChoose] = useState(text)
    const [loading, setloading] = useState(false)
    const updateData = ()=>{
        setloading(true)
        updateDoc(doc(db,"Website/Homepage/WhyChoose",refid),{
            text:whyChoose
        }).then(()=>{
            reload()
            setloading(false)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const createData = ()=>{
        setloading(true)
        addDoc(collection(db,"Website/Homepage/WhyChoose"),{
            text:whyChoose
        }).then(()=>{
            setwhyChoose('')
            reload()
            setloading(false)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const deleteData = ()=>{
        setloading(true)
        deleteDoc(doc(db,"Website/Homepage/WhyChoose",refid)).then(()=>{
            reload()
            setloading(false)
        }).catch((err)=> console.log(err))
    }
  return (
    <div className="border border-base-300 rounded-md p-3">
        {newAdapter&&<p className="text-primary mb-2 font-medium">New Data</p>}
        <textarea value={whyChoose} onChange={e=> setwhyChoose(e.target.value)} placeholder="Type here" rows={10} className="input input-bordered w-full min-h-[100px]"></textarea>
        {(loading&&!newAdapter)&&<span className="loading text-center loading-infinity text-primary loading-md"></span>}
        <div className="flex justify-end mt-1">
            {!newAdapter&&<button onClick={deleteData} className="btn btn-error btn-sm mr-1 text-white">Delete</button>}
            <button onClick={newAdapter?createData:updateData} className="btn btn-primary btn-sm" disabled={whyChoose==text}>Save</button>
        </div>
        
    </div>
  )
}

export default WhyChooseAdapter