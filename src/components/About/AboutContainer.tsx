import { useState } from "react"

interface AboutContainerProps{
    title:string
    text:string
    newAdapter?:boolean
    onDelete?:Function
    onUpdate?:Function
    onCreate?:Function
    refid:string
}

const AboutContainer = ({text,title,newAdapter,onDelete,onUpdate,onCreate,refid}:AboutContainerProps) => {
    const [titleState, settitleState] = useState(title)
    const [textState, settextState] = useState(text)
    const [loading, setloading] = useState(false)
  return (
    <div className="p-3 border border-base-300 rounded-md my-3">
        {newAdapter&&<p className="text-2xl font-medium text-primary mb-5">New Paragraph</p>}
        <p className="text-sm font-medium text-primary">Title</p>
        <input value={titleState} onChange={(e)=>settitleState(e.target.value)} type="text" className="input input-bordered mt-1 w-full" />
        <p className="text-sm font-medium text-primary mt-5">Text</p>
        <textarea value={textState} onChange={(e)=>settextState(e.target.value)} className="input input-bordered mt-1 w-full min-h-[200px]"></textarea>
        <div className="flex justify-end mt-3">
            {(!newAdapter&&onDelete)&&<button className="btn btn-error text-white btn-sm mr-1" onClick={()=> onDelete(refid)}>Delete</button>}
            {(!newAdapter&&onUpdate)&&<button className="btn btn-primary btn-sm" disabled={loading || title==titleState} onClick={()=> onUpdate(refid,titleState,textState,setloading)}>{loading&&<span className="loading loading-infinity loading-sm mr-1"></span>} Update</button>}
            {(newAdapter&&onCreate)&&<button className="btn btn-primary btn-sm" onClick={()=>onCreate(titleState,textState,setloading,settitleState,settextState)} disabled={loading}>{loading&&<span className="loading loading-infinity loading-sm mr-1"></span>}Create</button>}
        </div>
    </div>
  )
}

export default AboutContainer