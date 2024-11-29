import React, { useContext } from 'react'
import { MyContext } from '../../../Context/MyState'
import LineChart from '../../../Components/Dashboard/Charts/lineCharts'
import BarChart from '../../../Components/Dashboard/Charts/BarCharts'
import DoughnutChrts from '../../../Components/Dashboard/Charts/DoughnutChart'
import RadarChart from '../../../Components/Dashboard/Charts/RadarChart'
import PolarAreaChart from '../../../Components/Dashboard/Charts/PolarAreaChart'
import WaveCharts from '../../../Components/Dashboard/Charts/WaveCharts'

const Charts = () => {
    const { darkMode } = useContext(MyContext)
    return (
        <div>
            <div className="text-inherit">
                <h1>Charts</h1>

            </div>

            <div className='row g-2 mt-4'>
                <div className="col-12 col-lg-6">
                    <LineChart mode={darkMode} />
                </div>
                <div className="col-12 col-lg-6">
                    <BarChart mode={darkMode} />
                </div>
                <div className="col-12 col-lg-6">
                    <DoughnutChrts mode={darkMode} />
                </div>
                <div className="col-12 col-lg-6">
                    <RadarChart mode={darkMode} />
                </div>
                <div className="col-12 col-lg-6">
                    <PolarAreaChart mode={darkMode} />
                </div>
                <div className="col-12 col-lg-6">
                    <WaveCharts mode={darkMode} />
                </div>

            </div>
        </div>
    )
}

export default Charts
