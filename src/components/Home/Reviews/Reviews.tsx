import { ToastContainer } from "react-toastify"
import ReviewAdapter from "./ReviewAdapter/ReviewAdapter"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../firebase"

const Reviews = () => {
    const [reviews, setreviews] = useState<Array<ReviewAdapter>>([])
    const getReviews = ()=>{
        setreviews([])
        getDocs(collection(db,"Website/Homepage/Reviews")).then((snap)=>{
            snap.forEach((doc)=>{
                setreviews((p)=> p.filter((v)=> v.refkey == doc.id).length < 1 ? [...p,{...doc.data() as any ,refkey:doc.id}] : [...p])
            })
        })
    }
    useEffect(() => {
      getReviews()
    }, [])

    
    
  return (
    <div className="my-10">
        <p className="text-primary mt-3 text-2xl font-medium">Reviews</p>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-3">
            {reviews.length > 0 ? reviews.map((v,i)=> <ReviewAdapter key={i} {...v} reload={getReviews} />) : [1,2,3,4,5].map(()=> <div className="skeleton h-[400px] w-full"></div> )}
            <ReviewAdapter reload={getReviews} newAdapter={true} image="" job="" name="" refkey="" text="" title=""  />
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Reviews