import { useState } from "react"
import ImageAdapter from "../../../ImageAdapter/ImageAdapter"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "../../../../firebase"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"

interface ReviewAdapter{
    title:string
    text:string
    name:string
    image:string
    job:string
    refkey:string
    reload?:Function
    newAdapter?:boolean
}
const ReviewAdapter = ({image,job,name,refkey,text,title,reload,newAdapter}:ReviewAdapter) => {
    const [titleState, settitleState] = useState(title)
    const [textState, settextState] = useState(text)
    const [user, setuser] = useState({
        name:name,
        image:image,
        job:job
    })
    

    const updateImage = (file:any,key:string,setloading:Function)=>{
        const storageRef = ref(storage, `Website/Homepage/Reviews/${key}`)
      setloading(true)
      uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url)=>{
              updateDoc(doc(db,"Website/Homepage/Reviews",key),{
                  image: url
              }).then(()=>{
                  toast.success("Image Updated Successfully",{
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  })
                  setloading(false)
                  setTimeout(() => {
                  
                      window.location.reload()
                      }, 2000);
              })
          }).catch((err)=>{
          console.log(err)
          toast.error(err.message,{
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          })
      })
      })
    }

    const updateData = ()=>{
        updateDoc(doc(db,"Website/Homepage/Reviews",refkey),{
            title: titleState,
            text: textState,
            name: user.name,
            image: user.image,
            job: user.job
        }).then(()=>{
            if(reload){
                reload()
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    const deleteData = () =>{
        deleteDoc(doc(db,"Website/Homepage/Reviews",refkey)).then(()=>{
            if(reload){
                reload()
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    
    
    const uploadImage = (file:File,setloading:Function) =>{
            setloading(true)
            addDoc(collection(db,"Website/Homepage/Reviews"),{
              image:'',
              title: titleState,
            text: textState,
            name: user.name,
            job: user.job
            }).then((docRef)=>{
              uploadBytes(ref(storage,`Website/Homepage/Reviews/${docRef.id}`),file).then(()=>{
                getDownloadURL(ref(storage,`Website/Homepage/Reviews/${docRef.id}`)).then((url)=>{
                  updateDoc(docRef,{
                    image: url
                  }).then(()=>{
                    setloading(false)
                    if(reload){
                        reload()
                    }
                    settitleState('')
                    settextState('')
                    setuser({image:'',job:'',name:''})
                  })
                })
              })
            })
       
        // 
      }

  return (
    <div className="rounded-md border border-base-300 p-3">
        {newAdapter && <p className="text-primary text-xl font-medium mb-5">New Review</p> }
        <p className="text-sm text-primary font-medium">Title</p>
        <input type="text" value={titleState} onChange={(e)=>settitleState(e.target.value)} className="input input-bordered mt-1 w-full" />
        <p className="text-sm text-primary font-medium mt-2">Review</p>
        <textarea value={textState} onChange={(e)=>settextState(e.target.value)} className="textarea textarea-bordered w-full min-h-[200px] mt-1"></textarea>
        <div className="flex items-center justify-between mt-3 gap-3 mb-2">
            <div className="">
                <p className="text-sm text-primary font-medium">Name</p>
                <input type="text" value={user.name} onChange={(e)=>setuser({...user,name:e.target.value})} className="input input-bordered w-full mt-1" />
            </div>
            <div className="">
                <p className="text-sm text-primary font-medium">Job</p>
                <input type="text" value={user.job} onChange={(e)=>setuser({...user,job:e.target.value})} className="input input-bordered w-full mt-1" />
            </div>
        </div>
        {!newAdapter&&<div className="flex items-center justify-end mt-3">
            <button className="btn btn-error text-white mr-1 btn-sm" onClick={deleteData}>Delete</button>
            <button className='btn btn-primary btn-sm text-white' disabled={!titleState || !textState || !user.name || !user.job || (title==titleState && text==textState && job == user.job && name == user.name)} onClick={updateData}>Update</button>
        </div>}
        {!newAdapter&&<div className="divider text-sm">Save the text part before updating the image</div>}
        {newAdapter?<ImageAdapter newAdapter={true} refkey={refkey} reload={reload!} uploadImage={uploadImage}/>:<ImageAdapter newAdapter={false} refkey={refkey} reload={reload!} image={user.image} onUpdate={updateImage}/>}
        <div className="flex items-center justify-end mt-3">
            {/* <button className='btn btn-primary btn-sm text-white' onClick={()=>reload(refkey)}>Update</button> */}
        </div>
    </div>
  )
}

export default ReviewAdapter