import { faArrowRightFromBracket, faBars, faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { MyContext } from '../../../Context/MyState'
import { Link } from 'react-router-dom'
import './topbar.css'

const TopBar = () => {
    const { setIsopenBar, SetDarkMode, darkMode, Logout } = useContext(MyContext)

    return (
        <div className='p-3 shadow-sm topbar rounded-4 mb-4 mt-2 mx-2'>
            <div className='d-flex align-items-center justify-content-between icons'>
                <div className="bars" onClick={() => setIsopenBar((prev) => !prev)}>
                    <FontAwesomeIcon icon={faBars} fontSize="1.2rem" />
                </div>

                <div className='d-flex align-items-center gap-2'>
                    <Link to="/dashboard/profile" className="header-action-btn shadow-none">
                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.1rem' }} />
                    </Link>

                    <button className="header-action-btn shadow-none" onClick={() => SetDarkMode(prev => !prev)}>
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} style={{ fontSize: '1.1rem' }} />
                    </button>

                    <button className="header-action-btn shadow-none text-danger-hover" onClick={Logout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ fontSize: '1.1rem' }} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopBar
