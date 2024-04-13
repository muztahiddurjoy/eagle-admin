import { useEffect, useState } from "react"
import ImageAdapter from "../../ImageAdapter/ImageAdapter"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db, storage } from "../../../firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { ToastContainer, toast } from "react-toastify"

const History = () => {
    const [history, sethistory] = useState({image:'',text:''})
    const [text, settext] = useState('')
    const getHistory = ()=>{
        getDoc(doc(db,"Website/Homepage/History/yKyNiwLHG6pjkx7KA1OR")).then((snap)=>{
            sethistory(snap.data() as any)
            settext(snap.data()!.text)
        })
    }
    useEffect(() => {
        getHistory()
    },[])

    const updateImage =  (file:any,key:string,setloading:Function) =>{
        const storageRef = ref(storage, `Website/Homepage/History/${key}`)
        setloading(true)
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url)=>{
                updateDoc(doc(db,"Website/Homepage/History",key),{
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

  return (
    <div className="my-10">
        <p className="text-primary mt-3 text-2xl font-medium">History</p>
        <div className="flex flex-col mt-5 md:flex-row-reverse">
            <div className="flex-1">
                <ImageAdapter newAdapter={false} refkey="yKyNiwLHG6pjkx7KA1OR" reload={getHistory} image={history.image} onUpdate={updateImage}/>
            </div>
            <div className="flex-1">
                <textarea value={text} onChange={e=> settext(e.target.value)} className="textarea textarea-bordered w-full min-h-[200px]"></textarea>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default History
export {History}