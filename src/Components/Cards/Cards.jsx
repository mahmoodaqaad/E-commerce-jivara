import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faFolder, faUsers, faArrowDown, faArrowUp, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { MyContext } from '../../Context/MyState';
const Cards = () => {
    const { darkMode, categories,
        products,
        users,
        GetAllUsers,
        GetAllProducts,
        GetAllCategories, } = useContext(MyContext);

    useEffect(() => {

        GetAllUsers()
        GetAllProducts()
        GetAllCategories()
    }, [])



    const iconColor = { color: darkMode ? "white" : "#3c50e0", background: darkMode ? "rgb(32, 41, 61)" : "#eff2f7" }





    return (
        <div className='row g-2 mt-4'>


            <Link to={"/dashboard/history"} className="col-12 col-sm-6  col-lg-3 text-decoration-none">
                <div className={`cards  rounded-3 px-3 pt-3 pb-2  ${!darkMode && "shadow"}`} >
                    <div className="icon mb-3 px-3 ms-2 mt-1" style={iconColor}>
                        <FontAwesomeIcon icon={faEye} />
                    </div>

                    <div className="head"><h1>0</h1></div>
                    <p className='mt-1 d-flex justify-content-between'>Total Views <span className='text-success-alt'>0.43% <span><FontAwesomeIcon icon={faArrowUp} /></span></span></p>
                </div>
            </Link>
            <Link to={"/dashboard/categories"} className="col-12 col-sm-6  col-lg-3 text-decoration-none">
                <div className={`cards rounded-3 px-3 pt-3 pb-2 ${!darkMode && "shadow"}`} >
                    <div className="icon mb-3 px-3 ms-2 mt-1" style={iconColor}>
                        <FontAwesomeIcon icon={faFolder} />
                    </div>

                    <div className="head"><h1>{categories.length}</h1></div>
                    <p className='mt-1 d-flex justify-content-between'>Total Categories<span className='text-success-alt'>4.35% <span><FontAwesomeIcon icon={faArrowUp} /></span></span></p>
                </div>
            </Link>
            <Link to={"/dashboard/products"} className="col-12 col-sm-6  col-lg-3 text-decoration-none">
                <div className={`cards rounded-3 px-3 pt-3 pb-2 ${!darkMode && "shadow"}`} >
                    <div className="icon mb-3 px-3 ms-2 mt-1" style={iconColor}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>

                    <div className="head"><h1>{products.length}</h1></div>
                    <p className='mt-1 d-flex justify-content-between'>Total Product <span className='text-success-alt'>2.59% <span><FontAwesomeIcon icon={faArrowUp} /></span></span></p>
                </div>
            </Link>
            <Link to={"/dashboard/users"} className="col-12 col-sm-6  col-lg-3 text-decoration-none">
                <div className={`cards rounded-3 px-3 pt-3 pb-2 ${!darkMode && "shadow"}`} >
                    <div className="icon mb-3 px-3 ms-2 mt-1" style={iconColor}>
                        <FontAwesomeIcon icon={faUsers} />
                    </div>

                    <div className="head"><h1>{users.length}</h1></div>
                    <p className='mt-1 d-flex justify-content-between'>Total Users<span className='text-filed-alt'>0.95% <span><FontAwesomeIcon icon={faArrowDown} /></span></span></p>
                </div>
            </Link>
        </div>

    )
}

export default Cards
