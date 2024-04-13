import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { FormEvent, useEffect, useState } from "react"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { Slide, ToastContainer, toast } from "react-toastify"

const Login = () => {
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [showPass, setshowPass] = useState(false)
    const router = useNavigate()
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          router('/')
        }
      })
    }, [])
    
    const LoginUser = (e:FormEvent)=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, pass).then((result)=>{
            if(result.user!=null){
                toast.success('Logged In!',{
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                })
                setTimeout(() => {
                    router('/')
                }, 2000);
            }
        }).catch((err:FirebaseError)=>{
            toast.error(String(err.code).substring(5,String(err.code).length), {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
            });
            
        })
    }

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-white h-[100vh] w-full flex items-center justify-center p-3">
        <div className="card w-96 bg-gray-200 shadow-xl border ">
            <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                <form onSubmit={LoginUser} className="mt-5">
                <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input type="email" value={email} onChange={e=> setemail(e.target.value)} className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type={showPass?"text":"password"} value={pass} onChange={e=> setpass(e.target.value)} className="grow" />
                <div className="cursor-pointer" onClick={()=> setshowPass(p=> !p)}>
                {!showPass?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
}

                </div>
                </label>
                <button className="mt-3 text-sm font-medium">forgot password?</button>
                <div className="mt-3 flex justify-end">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                
                </form>
            </div>
            </div>
            <ToastContainer/>
    </div>
  )
}

export default Login