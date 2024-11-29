import { NavLink } from "react-router-dom";
import './404.css'
export default function ERR404({ home }) {

    return <div className="page404">
        <p>404 | this page not found</p>
        <div> <NavLink to={home} className='btn btn-primary'>Home</NavLink></div>
    </div>

}