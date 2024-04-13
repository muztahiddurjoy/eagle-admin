import { useEffect, useState } from "react"
import AboutContainer from "../components/About/AboutContainer"
import Dashboard from "../components/Dashboard/Dashboard"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

const Services = () => {
  const [abouts, setabouts] = useState<Array<{title:string,text:string,refkey:string}>>([])

  const getAbouts = ()=>{
    setabouts([])
    getDocs(collection(db,"Website/ServicePage/Contents")).then((snap)=>{
      snap.forEach((doc)=>{
        setabouts((p)=> p.filter((v)=> v.refkey==doc.id).length<1 ? [...p,{title:doc.data().title,text:doc.data().text,refkey:doc.id}] : [...p])
        console.log(doc.data())
      })
    })
  }

  useEffect(() => {
    getAbouts()
  }, [])
  
  const updateAbout = (refkey:string,title:string,text:string,setloading:Function)=>{
    setloading(true)
    updateDoc(doc(db,"Website/ServicePage/Contents",refkey),{title,text}).then(()=>{
      getAbouts()
      setloading(false)
    }).catch((err)=>{
      console.log(err)
      setloading(false)
    })
  }

  const deleteAbout = (refkey:string)=>{
    deleteDoc(doc(db,"Website/ServicePage/Contents",refkey)).then(()=>{
      getAbouts()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const createAbout = (title:string,text:string,setloading:Function)=>{
    setloading(true)
    addDoc(collection(db,"Website/ServicePage/Contents"),{title,text}).then(()=>{
      getAbouts()
      setloading(false)
    }).catch((err)=>{
      console.log(err)
      setloading(false)
    })
  }
  return (
    <Dashboard>
        <p className='text-2xl font-bold text-primary'>Services.</p>
        {abouts.length<1 ? [0,0,0,0].map(()=> <div className="skeleton w-full h-[200px] my-2"></div>) : abouts.map((v,i)=> <AboutContainer onDelete={deleteAbout} onUpdate={updateAbout} key={i} refid={v.refkey} text={v.text} title={v.title} />)}
        <AboutContainer newAdapter={true} onCreate={createAbout} refid="" text="" title=""/>
    </Dashboard>
  )
}

export default Services