
import { useForm } from 'react-hook-form'
import Dashboard from '../components/Dashboard/Dashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { configSchema } from '../validators/configValidator'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect } from 'react'

const Config = () => {
  const {register,handleSubmit,setValue,clearErrors,formState:{errors}} = useForm<ConfigType>({resolver: zodResolver(configSchema)})
  
  const getPrevData = ()=>{
    getDoc(doc(db, "Website", "Config")).then((snap)=>{
        const tempData:ConfigType = snap.data() as ConfigType
        setValue('email',tempData.email)
        setValue('businessHour',tempData.businessHour)
        setValue('address',tempData.address)
        setValue('about',tempData.about)
        setValue('phoneOne',tempData.phoneOne)
        setValue('phoneTwo',tempData.phoneTwo)
        setValue('facebook',tempData.facebook)
        setValue('instagram',tempData.instagram)
        setValue('twitter',tempData.twitter)
        setValue('embedMap',tempData.embedMap)
    })
  }
  const sendToFirestore = (data:ConfigType)=>{
    updateDoc(doc(db, "Website", "Config"),data).then(()=>{
      clearErrors()
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() => {
    getPrevData()
  }, [])
  
  return (
    <Dashboard>
      <form onSubmit={handleSubmit(sendToFirestore)}>
        <div className="flex justify-between items-center">
          <p className='text-2xl font-bold text-primary'>Basic Info.</p>
          <button className="btn btn-primary" type="submit">Save</button>
        </div>
        <div  className="grid grid-cols-1 md:grid-cols-3 mt-10 md:gap-5 gap-y-5">
          <div className="">
            <p className='text-sm font-medium text-primary'>E-mail</p>
            <input type="email" {...register('email')}  className="mt-1 input input-bordered w-full " />
            <label className='text-error pt-1'>{errors.email?.message}</label>
          </div>
          <div className="">
            <p className='text-sm font-medium text-primary'>Business Hour</p>
            <input type="text" {...register('businessHour')} className="mt-1 input input-bordered w-full " />
            <label className='text-error pt-1'>{errors.businessHour?.message}</label>
          </div>
          <div className="">
            <p className='text-sm font-medium text-primary'>Address</p>
            <input type="text" {...register('address')} className="mt-1 input input-bordered w-full " />
            <label className='text-error pt-1'>{errors.address?.message}</label>
          </div>
          <div className="md:col-span-3">  
            <p className='text-sm font-medium text-primary'>About</p>
            <textarea {...register('about')} className="mt-1 input input-bordered w-full min-h-[200px]"></textarea>
            <label className='text-error pt-1'>{errors.about?.message}</label>
          </div>
          <div className="">
            <p className='text-sm font-medium text-primary'>Phone Numbers</p>
            <ul className='mt-3'>
              <li className='flex items-center'>
                1. 
                <input type="text" {...register('phoneOne')} className='mt-1 input input-bordered w-full ml-1' />
                <label className='text-error pt-1'>{errors.phoneOne?.message}</label>
              </li>
              <li className='flex items-center'>
                2. 
                <input type="text" {...register('phoneTwo')} className='mt-1 input input-bordered w-full ml-1' />
                <label className='text-error pt-1'>{errors.phoneTwo?.message}</label>
              </li>
            </ul>
          </div>
          <div className="">
            <p className='text-sm font-medium text-primary'>Social Media</p>
            <ul className='mt-3 text-sm font-medium'>
              <li className='flex items-center'>
                Facebook 
                <input type="text" {...register('facebook')} className='mt-1 input input-bordered w-full ml-1' />
                <label className='text-error pt-1'>{errors.facebook?.message}</label>
              </li>
              <li className='flex items-center'>
                Instagram
                <input type="text" {...register('instagram')} className='mt-1 input input-bordered w-full ml-1' />
                <label className='text-error pt-1'>{errors.instagram?.message}</label>
              </li>
              <li className='flex items-center'>
                Twitter
                <input type="text" {...register('twitter')} className='mt-1 input input-bordered w-full ml-1' />
                <label className='text-error pt-1'>{errors.twitter?.message}</label>
              </li>
            </ul>
          </div>
          <div className="">
            <p className='text-sm font-medium text-primary'>Embed Map</p>
            <input type="text" {...register('embedMap')} className='mt-4 input input-bordered w-full' />
            <label className='text-error pt-1'>{errors.embedMap?.message}</label>
          </div>
        </div>
      </form>
    </Dashboard>
  )
}

export default Config