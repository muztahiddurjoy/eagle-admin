import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db, storage } from "../../firebase"
import ImageAdapter from "../ImageAdapter/ImageAdapter"
import { ToastContainer, toast } from "react-toastify"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"


const TopSlider = () => {
    const [images, setimages] = useState<Array<{image:string,refid:string}>>([])
    const getImages = () => {
        getDocs(collection(db,"Website/Homepage/Carousel")).then((snap) => {
            snap.forEach((doc) => {
                setimages((p) => p.filter((v) => v.refid == doc.id).length < 1 ? [...p, { image: doc.data().image, refid: doc.id }] : [...p])
            })
        })
    }

    useEffect(() => {
        getImages()
    }, [])

    const updateImage =  (file:any,key:string,setloading:Function) =>{
        const storageRef = ref(storage, `Website/Homepage/Carousel/${key}`)
        setloading(true)
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url)=>{
                updateDoc(doc(db,"Website/Homepage/Carousel",key),{
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
    const deleteImage = (key:string) =>{
        deleteObject(ref(storage, `Website/Homepage/Carousel/${key}`)).then(()=>{
            deleteDoc(doc(db,"Website/Homepage/Carousel",key)).then(()=>{
                toast.success("Image Deleted Successfully",{
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(() => {
                    
                    window.location.reload()
                    }, 2000);
               
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
    
    const uploadImage = (file:File,setloading:Function) =>{
        setloading(true)
        addDoc(collection(db,"Website/Homepage/Carousel"),{
          image:''
        }).then((docRef)=>{
          uploadBytes(ref(storage,`Website/Homepage/Carousel/${docRef.id}`),file).then(()=>{
            getDownloadURL(ref(storage,`Website/Homepage/Carousel/${docRef.id}`)).then((url)=>{
              updateDoc(docRef,{
                image: url
              }).then(()=>{
                setloading(false)
                getImages()
              })
            })
          })
        })
        // 
      }

  return (
    <div>
      <p className="text-primary mt-3 text-2xl font-medium">Top Slider</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
        {images.length==0&&[0,1,2,3,4].map((v,i)=><div key={i} className="skeleton w-full h-[200px]"></div>)}
        {images.map((v, i) => <ImageAdapter reload={getImages} newAdapter={false} image={v.image} refkey={v.refid} onDelete={deleteImage} onUpdate={updateImage} key={i} />)}
        <ImageAdapter uploadImage={uploadImage} reload={getImages} newAdapter={true} image="" refkey={new Date().getTime().toString()} />
      </div>
      <ToastContainer/>
    </div>
  )
}

export default TopSlider