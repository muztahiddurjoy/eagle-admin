import { useEffect, useState } from "react"
import Dashboard from "../components/Dashboard/Dashboard"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import WhyChooseAdapter from "../components/WhyChooseAdapter/WhyChooseAdapter"

const Home = () => {
  const [whyChoose, setwhyChoose] = useState<Array<{text:string,refid:string}>>([])
  const [loading, setloading] = useState(false)
  const getWhyChooses = ()=>{
    setloading(true)
    setwhyChoose([])
    getDocs(collection(db,"Website/Homepage/WhyChoose")).then((snap)=>{
      snap.forEach((doc)=>{
        setwhyChoose((p)=> p.filter((v)=> v.refid==doc.id).length<1 ? [...p,{text:doc.data().text,refid:doc.id}] : [...p])
      })
    })
    setloading(false)
  }
  useEffect(() => {
    getWhyChooses()
  }, [])
  
  useEffect(() => {
    console.log(whyChoose)
  }, [whyChoose])
  

  return (
   <Dashboard>
    <>
      <div className="flex items-center justify-between">
        <p className='text-2xl font-bold text-primary'>Home</p>
        <button className="btn btn-primary" type="submit">Save</button>
      </div>
      <p className="text-primary mt-3 text-2xl font-medium">Why Choose Us</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
        {loading?(Array(6).fill("_").map((v,i)=><div key={i} className="skeleton w-full h-full">hi</div>)):(whyChoose.map((v,i)=> <WhyChooseAdapter refid={v.refid} newAdapter={false} text={v.text} key={i} reload={getWhyChooses}/>))}
        <WhyChooseAdapter refid={new Date().getTime().toString()} newAdapter={true} text="" reload={getWhyChooses}/>
      </div>
    </>
   </Dashboard>
  )
}

export default Home