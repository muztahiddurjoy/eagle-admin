import Dashboard from "../components/Dashboard/Dashboard"
import Affiliation from "../components/Home/Affiliation&License/Affiliation"
import History from "../components/Home/History/History"
import PartnerCompanies from "../components/Home/PartnerCompanies/PartnerCompanies"
import Reviews from "../components/Home/Reviews/Reviews"
import TopSlider from "../components/Home/TopSlider/TopSlider"
import WhyChoose from "../components/Home/WhyChoose/WhyChoose"

const Home = () => {
  
  

  return (
   <Dashboard>
    <>
      <div className="flex items-center justify-between">
        <p className='text-2xl font-bold text-primary'>Home</p>
        
      </div>

      <TopSlider/>
      <Affiliation/>
      <History/>
      <WhyChoose/>
      <Reviews/>
      <PartnerCompanies/>
    </>
   </Dashboard>
  )
}

export default Home