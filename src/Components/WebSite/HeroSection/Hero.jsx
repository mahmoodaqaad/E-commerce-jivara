import { NavLink } from 'react-router-dom'
import './hero.css'
const Hero = () => {
    return (
        <section className='hero bg-site mb-5'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-lg-6 col-12'>
                        <div className="info text-center text-lg-start">
                            <h2 className='heading'>Summer Collection</h2>
                            <h1 className='name'>
                                Jivara <span>E-commerce</span>
                            </h1>
                            <p className='lead mb-4 text-secondary'>
                                Discover the latest trends in fashion and lifestyle.
                                Get up to 50% discount on selected items.
                            </p>
                            <NavLink to={"/category"}  className='btn-shop' >Shop Now</NavLink>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 mt-5 mt-lg-0">
                        <div className="hero-img-container">
                            <img
                                className='hero-img'
                                src={require("../../../Assets/IMG/Shop/img-1.png")}
                                alt="Modern E-commerce Hero"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
