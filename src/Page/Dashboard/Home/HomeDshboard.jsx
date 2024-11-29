import React, { useContext } from 'react'
import './Home.css'

import LineCharts from '../../../Components/Dashboard/Charts/lineCharts'
import BarCharts from '../../../Components/Dashboard/Charts/BarCharts'
import TopChannel from '../../../Components/Dashboard/TopChannel/TopChannel'
import Todos from '../../../Components/Dashboard/Todos/Todo'
import RadarChart from '../../../Components/Dashboard/Charts/RadarChart'
import PolarAreaChart from '../../../Components/Dashboard/Charts/PolarAreaChart'
import { MyContext } from '../../../Context/MyState'
import Users from '../Users/Users'
import Cards from '../../../Components/Cards/Cards'

const HomeDshboard = () => {
  const { darkMode } = useContext(MyContext)

  return (
    <div>
      <div className="text-inherit">
        <h1>Dashboard</h1>

      </div>
      <Cards />

      <div className="row g-2 mt-4 justify-content-between">
        <div className='col-12 col-lg-6 ' >
          <LineCharts mode={darkMode} />
        </div>
        <div className='col-12 col-lg-6' >
          <BarCharts mode={darkMode} />
        </div>
      </div>


      <div className='row mt-4 g-2'>
        <div className='col-12 col-lg-8'>
          <TopChannel mode={darkMode} />
        </div>
        <div className='col-12 col-lg-4 '>
          <Todos mode={darkMode} />
        </div>
      </div>

      <div className='row mt-4 g-2'>
        <div className="col-lg-6 col-12 mb-4">
          <RadarChart mode={darkMode} /> {/* إضافة الرسم البياني المنطقي */}
        </div>
        <div className="col-lg-6 col-12 mb-4">
          <PolarAreaChart mode={darkMode} /> {/* إضافة الرسم البياني الشمسي */}
        </div>
      </div>


      <div className='row mt-4  g-2'>

        <div className=' col-12 p-3  rounded-3 shadow bg-card'  >
          <Users mode={darkMode} />
        </div>

      </div>



    </div>



  )
}

export default HomeDshboard
