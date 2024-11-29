import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { Axios } from '../../../API/Axios';
import SingleProduct from '../../../Components/WebSite/OneProduct/SingleProduct';
import { ProductSkeleton } from '../../../Components/ShowSkeleton/ShowSkeleton';

const LatestProduct = () => {
    const [Latest, setLatest] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        Axios.get(`/product/latest`).then(res => {
            setLatest(res.data.data);
        }).catch(e => {
            console.log(e);

        }).finally(e => {
            setLoading(false)

        }
        )

    }, [])
    console.log(Latest);

    return (
        <div className="border shadow p-2 rounded-3 ">
            <div className="fst-italic fw-bold text-center">
                <h2 className="text-info d-flex align-items-center gap-2 justify-content-center"> <FontAwesomeIcon icon={faHourglass} fontSize={"20px"} /> Latest Product <FontAwesomeIcon icon={faHourglass} fontSize={"20px"} /></h2>
            </div>
            <hr />
            <div>
                <div className='row g-2'>
                    {
                        loading ?
                            <>
                                <div className="col-12 col-md-6">
                                    <div className='shadow px-2 py-3 rounded '>
                                        <ProductSkeleton />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className='shadow px-2 py-3 rounded '>
                                        <ProductSkeleton />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className='shadow px-2 py-3 rounded '>
                                        <ProductSkeleton />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className='shadow px-2 py-3 rounded '>
                                        <ProductSkeleton />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className='shadow px-2 py-3 rounded '>
                                        <ProductSkeleton />
                                    </div>
                                </div>


                            </>
                            :
                            Latest.map(product => (

                                <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                    <div className='shadow px-2 py-3 rounded '>

                                        <SingleProduct product={product} />
                                    </div>
                                </div>
                            ))

                    }
                </div>

            </div>
        </div>
    )
}

export default LatestProduct
