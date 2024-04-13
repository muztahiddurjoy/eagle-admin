import Dashboard from "../components/Dashboard/Dashboard"
import {History as RandomHistory} from "../components/Home/History/History"
const History = () => {
  return (
    <Dashboard>
        <p className='text-2xl font-bold text-primary'>History</p>
        <RandomHistory/>
    </Dashboard>
  )
}

export default History