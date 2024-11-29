import React from 'react'
import './Home.css'
import Hero from '../../../Components/WebSite/HeroSection/Hero'
import CustomerReviews from '../CustomerReviews/CustomerReviews'
import Newsletter from '../Newsletter/Newsletter'
import ShowProducts from '../ShowProducts/ShowProducts'
import TopRated from '../TopRated/TopRated'
import LatestProduct from '../LatestProduct/LatestProduct'
const Home = () => {
    return (
        <div className='homepage'>
            <Hero />
            <ShowProducts />
            <div className='row g-2 mt-4 mb-4'>
                <div className='col-12 col-lg-6'>
                    <TopRated />
                </div>
                <div className='col-12 col-lg-6'>
                    <LatestProduct />

                </div>
            </div>
            <CustomerReviews />
            <Newsletter />
        </div>
    )
}

export default Home
