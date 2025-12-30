
import React, { useEffect, useState } from 'react'
import { Axios } from '../../../API/Axios'
import { ProductSkeleton } from '../../../Components/ShowSkeleton/ShowSkeleton'
import SingleProduct from '../../../Components/WebSite/OneProduct/SingleProduct'


const ShowProducts = () => {

    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)

        Axios.get(`/products?limit=${8}`).then(res => {
            setProducts(res.data.data);


        }
        ).catch(e => {
            // console.log(e)
        }
        ).finally(() => {

            setLoading(false)
        })

    }, [])





    return (
        <div className='mt-5 py-5'>
            <div className="row g-2">
                {
                    loading ?
                        <>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className='shadow px-2 py-3 rounded '>
                                    <ProductSkeleton />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className='shadow px-2 py-3 rounded '>
                                    <ProductSkeleton />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className='shadow px-2 py-3 rounded '>
                                    <ProductSkeleton />
                                </div>
                            </div>


                        </>
                        :

                        products?.map(product => (
                            <div key={product.id} className="col-12 col-md-6 col-lg-3 text-inherit text-decoration-none">
                                <div className='shadow px-2 py-3 rounded '>
                                    <SingleProduct key={product.id} product={product} />
                                </div>
                            </div>

                        ))
                }

            </div>

        </div >
    )
}

export default ShowProducts
