import { NavLink } from 'react-router-dom'
import './hero.css'
const Hero = () => {
    return (
        <section className='hero mb-5'>
            <div className='container'>
                <div className='row align-items-center flex-column-reverse flex-lg-row'>
                    <div className='col-lg-6 col-12 reveal-anim' style={{ animationDelay: '0.2s' }}>
                        <div className="info text-center text-lg-start py-5">
                            <h2 className='heading mb-3'>Exclusive Winter Collection
</h2>
                            <h1 className='name mb-4'>
                                Elevate Your Style With <span>Jivara Fashion</span>
                            </h1>
                            <p className='lead mb-5 text-muted-alt px-4 px-lg-0'>
                                Discover the ultimate destination for modern lifestyle.
                                Handpicked trends with up to <span className="text-danger fw-bold">50% discount</span> on premium favorites.
                            </p>
                            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4">
                                <NavLink to={"/category"} className='btn-premium btn-premium-primary fs-5'>
                                    Explore Collection
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 mt-5 mt-lg-0 reveal-anim" style={{ animationDelay: '0.4s' }}>
                        <div className="hero-img-container">
                            <div className="hero-img-backdrop"></div>
                            <img
                                className='hero-img'
                                src={require("../../../Assets/IMG/Shop/img-1.png")}
                                alt="Modern E-commerce Hero"
                            />
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Hero
