import './hero.css'
const Hero = () => {
    return (
        <div className=' hero bg-site mb-5' >
            <div className='row g-4 align-items-center px-md-5 mt-4' >
                <div className='col-12 col-md-6'>
                    <div className="info fs-1 text-center text-md-start">
                        <h1 className='heading text-danger'>50% Discount</h1>
                        <h3 className='name text-info'>Jivara <span>
                            E-commerce</span></h3>
                        <button className='btn btn-outline-warning fs-3 mt-4'>Shop Now</button>
                    </div>
                </div>
                <div className="col-11 d-flex m-auto mt-5 mt-md-0 col-md-6 text-center">
                    <img className='img-fluid' src={require("../../../Assets/IMG/Shop/img-1.png")} alt="" />
                </div>

            </div>
        </div>
    )
}

export default Hero
