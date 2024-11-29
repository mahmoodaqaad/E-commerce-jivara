import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../../Components/WebSite/Header/Header'

const WebSite = () => {
    return (<div className='min-vh-100'>
        <Header />
        <div className="site ">
            <div className='container'>

                <Outlet />
            </div>
        </div>
    </div>
    )
}

export default WebSite
