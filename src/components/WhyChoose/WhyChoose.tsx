import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import WhyChooseAdapter from "../WhyChooseAdapter/WhyChooseAdapter"

const WhyChoose = () => {
    const [whyChoose, setwhyChoose] = useState<Array<{text:string,refid:string}>>([])
  const [loading, setloading] = useState(true)
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
  
  return (
    <>
    <p className="text-primary mt-3 text-2xl font-medium">Why Choose Us</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
      {whyChoose.length==0&&[0,1,2,3,4].map((v,i)=><div key={i} className="skeleton w-full h-[200px]"></div>)}
        {loading?[0,1,2,3,4,5,6,7,7,7,8].map((v,i)=><div key={i} className="skeleton w-full h-[200px]"></div>):(whyChoose.map((v,i)=> <WhyChooseAdapter refid={v.refid} newAdapter={false} text={v.text} key={i} reload={getWhyChooses}/>))}
        <WhyChooseAdapter refid={new Date().getTime().toString()} newAdapter={true} text="" reload={getWhyChooses}/>
      </div>
    </>
  )
}

export default WhyChoose