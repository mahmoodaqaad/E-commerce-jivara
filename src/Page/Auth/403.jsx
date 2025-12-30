import { NavLink } from 'react-router-dom'
import './403.css'
const Err403 = ({ role }) => {

  return (
    <div className='text-wrapper' style={{
minHeight:"85vh"
    }}>
      <div className='title' data-content={404}>
        403 - ACCESS DENIED
      </div>
      <div className='subtitle'>
        Oops , You Don't have permission to access this page
      </div>
      <NavLink className='btn btn-primary mt-2 px-3' to={role === "2000" ? "/" : "/dashboard/product"}>{role === "2000" ? "Go to Home page" : "Go th Product Page"}</NavLink>
    </div>
  )
}

export default Err403
