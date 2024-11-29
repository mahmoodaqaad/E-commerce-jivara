import { Outlet } from "react-router-dom"
import TopBar from "../../Components/Dashboard/TopBar/TopBar"
import SideBar from "../../Components/Dashboard/SideBar/SideBar"

const Dashboard = () => {

  return (
    <div className="d-flex  vh-100">
      <SideBar />

      <div className="w-100 overflow-x-hidden">
        <div className="px-3 px-lg-0 ps-lg-3  mysite">
          <TopBar />

          <div className=" mt-3  pe-lg-3 min-vh-100">

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
