import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='h-[100vh] w-full flex flex-col items-center justify-center p-5'>
        <p className="text-3xl font-bold ">This Page Doesn't Exist!</p>
        <Link to="/">
            <button className='btn btn-primary mt-4'>Home</button>
        </Link>
    </div>
  )
}

export default NotFound