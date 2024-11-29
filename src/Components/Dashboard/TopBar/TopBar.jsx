import { faArrowRightFromBracket, faBars, faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { MyContext } from '../../../Context/MyState'
import { Link } from 'react-router-dom'
import './topbar.css'
const TopBar = () => {

    const { setIsopenBar, SetDarkMode, darkMode, Logout } = useContext(MyContext)






    return (
        <div className=' p-4 shadow topbar rounded-3   rounded-start-3'>

            <div className='d-flex align-items-center justify-content-between  icons'>
                <div className={`bars ${darkMode ? "shadow-dark" : "shadow"} `} onClick={() => setIsopenBar((prev) => !prev)} >

                    <FontAwesomeIcon fontSize={"20px"} icon={faBars} />
                </div>
                <div className='d-flex justify-content-center align-items-center gap-3'>
                    <Link to={"/dashboard/profile"} className={`w-30-circal-black-white pointer icon ${darkMode ? "shadow-dark" : "shadow"}`} >
                        <FontAwesomeIcon className="" fontSize={"17px"} icon={faUser} color={darkMode ? "white" : "black"} />
                    </Link>

                    <div className={`w-30-circal-black-white pointer icon ${darkMode ? "shadow-dark" : "shadow"}`} onClick={() => SetDarkMode(prev => !prev)}>
                        <FontAwesomeIcon className="" fontSize={"17px"} icon={darkMode ? faSun : faMoon} color={darkMode ? "white" : "black"} />
                    </div>

                    <div className={`w-30-circal-black-white pointer icon ${darkMode ? "shadow-dark" : "shadow"}`} onClick={Logout}>
                        <FontAwesomeIcon className="" fontSize={"17px"} icon={faArrowRightFromBracket} color={darkMode ? "white" : "black"} />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default TopBar
