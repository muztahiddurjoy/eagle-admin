import { useEffect, useState } from "react"
import Dashboard from "../components/Dashboard/Dashboard"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase"
import ImageAdapter from "../components/ImageAdapter/ImageAdapter"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { toast } from "react-toastify"

const Certifications = () => {
  const [images, setimages] = useState<Array<{image:string,refkey:string}>>([])
  const getImages  = ()=>{
    setimages([])
    getDocs(collection(db,"Website/Certifications/Images")).then((snap)=>{
      snap.forEach((doc)=>{
        setimages((p)=> p.filter((v)=> v.refkey==doc.id).length<1 ? [...p,{image:doc.data().image,refkey:doc.id}] : [...p])
        console.log(doc.data())
      })
    })
  }

  useEffect(() => {
    getImages()
  }, [])

  const updateImage =  (file:any,key:string,setloading:Function) =>{
    const storageRef = ref(storage, `Website/Certifications/Images/${key}`)
    setloading(true)
    uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url)=>{
            updateDoc(doc(db,"Website/Certifications/Images",key),{
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
    deleteObject(ref(storage, `Website/Certifications/Images/${key}`)).then(()=>{
        deleteDoc(doc(db,"Website/Certifications/Images",key)).then(()=>{
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
    addDoc(collection(db,"Website/Certifications/Images"),{
      image:''
    }).then((docRef)=>{
      uploadBytes(ref(storage,`Website/Certifications/Images/${docRef.id}`),file).then(()=>{
        getDownloadURL(ref(storage,`Website/Certifications/Images/${docRef.id}`)).then((url)=>{
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
    <Dashboard>
        <p className='text-2xl font-bold text-primary'>Certifications</p>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            {images.length<1 ? [0,0,0,0].map(()=> <div className="skeleton w-full h-[200px] my-2"></div>) : images.map((v,i)=> <ImageAdapter newAdapter={false} refkey={v.refkey} image={v.image} onUpdate={updateImage} reload={getImages} onDelete={deleteImage} key={i}/>)}
            <ImageAdapter newAdapter={true} refkey="" reload={getImages}  uploadImage={uploadImage}/>
        </div>
    </Dashboard>
  )
}

export default Certifications