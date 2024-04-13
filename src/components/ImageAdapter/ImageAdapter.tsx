import  { useState } from 'react'

interface ImageAdapterProps {
  image?:string
  onDelete?:Function
  onUpdate?:Function
  refkey:string
  newAdapter:boolean
  reload:Function
  uploadImage?:Function
}

const ImageAdapter = ({image,onDelete,onUpdate,refkey,newAdapter,uploadImage}:ImageAdapterProps) => {
  const [file, setfile] = useState<any>()
  const [loading, setloading] = useState(false)
 
  return (
    <div className='border border-base-300 rounded-md p-3'>
        {!newAdapter&&<img src={image} className='w-full rounded-md h-[200px] object-cover' alt=""/>}
        {newAdapter&&<p className='text-primay text-2xl font-medium'>New Image</p>}
        <div className="flex items-center justify-between mt-3">
            <input type="file" onChange={e=> setfile(e.target.files![0])} className="file-input file-input-bordered w-full file-input-sm" />
           
        </div>
        <div className="flex items-center justify-end mt-3">
        {onDelete&&<button className='mx-2 btn btn-error btn-sm text-white' onClick={()=>onDelete(refkey)}>Delete</button>}
        {onUpdate&&<button className='btn btn-primary btn-sm text-white' onClick={e=> onUpdate(file,refkey,setloading)} disabled={!file||loading}>{loading&&<span className="loading loading-infinity loading-sm"></span>}Update</button>}
        {(newAdapter&&uploadImage)&&<button className='btn btn-primary btn-sm text-white' onClick={()=>uploadImage(file,setloading)} disabled={!file||loading}>{loading&&<span className="loading loading-infinity loading-sm"></span>}Upload</button>}
        </div>
    </div>
  )
}

export default ImageAdapter