
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
            <div className='mb-5 text-center'>
                <h2 className='fw-bold' style={{ fontSize: '2.5rem' }}>Featured Products</h2>
                <p className='text-muted'>Explore our best-selling items this week</p>
            </div>
            <div className="row g-4">
                {
                    loading ?
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="col-12 col-md-6 col-lg-3">
                                <div className='p-3 rounded bg-white shadow-sm border'>
                                    <ProductSkeleton />
                                </div>
                            </div>
                        ))
                        :
                        products?.map(product => (
                            <div key={product.id} className="col-12 col-md-6 col-lg-3">
                                <SingleProduct key={product.id} product={product} />
                            </div>
                        ))
                }
            </div>
        </div >
    )
}

export default ShowProducts
