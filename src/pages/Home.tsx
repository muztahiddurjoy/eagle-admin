import Dashboard from "../components/Dashboard/Dashboard"
import TopSlider from "../components/TopSlider/TopSlider"
import WhyChoose from "../components/WhyChoose/WhyChoose"

const Home = () => {
  
  

  return (
   <Dashboard>
    <>
      <div className="flex items-center justify-between">
        <p className='text-2xl font-bold text-primary'>Home</p>
        
      </div>

      <TopSlider/>
      <WhyChoose/>
    </>
   </Dashboard>
  )
}

export default Home