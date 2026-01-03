import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MyContext } from '../../../Context/MyState'
import { ProductSkeleton } from '../../../Components/ShowSkeleton/ShowSkeleton'
import SingleProduct from '../../../Components/WebSite/OneProduct/SingleProduct'
const SingelCategory = () => {
    const { id } = useParams()

    const [productsCate, setProductsCate] = useState([])
    const { products, GetAllProducts } = useContext(MyContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        GetAllProducts()
        setLoading(false)
    }, [GetAllProducts])


    useEffect(() => {
        try {
            setLoading(true)

            const data = []
            products.forEach(item => {
                if (+item.category_id === +id) {
                    data.push(item)
                }
            })
            setProductsCate(data)
        } finally {
            setLoading(false)
        }
    }, [id, products])







    return (
        <div className='mt-5 container'>
            <div className='mb-5 reveal-anim'>
                <div className='d-flex align-items-center justify-content-between border-bottom pb-4'>
                    <div>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-2">
                                <li className="breadcrumb-item"><Link to="/categories" className="text-decoration-none text-main">Categories</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{productsCate[0]?.category_name || "Featured"}</li>
                            </ol>
                        </nav>
                        <h1 className="fw-bold mb-0">{productsCate[0]?.category_name || "Products"}</h1>
                    </div>
                    <div className='text-end'>
                        <span className="badge bg-main-light text-main px-3 py-2 rounded-pill">
                            {productsCate.length} Products
                        </span>
                    </div>
                </div>
            </div>

            <div className='mt-4'>
                <div className="row g-4">
                    {loading ?
                        <>
                            <div className="col-12 col-md-4">
                                <div className='premium-card p-3'><ProductSkeleton /></div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className='premium-card p-3'><ProductSkeleton /></div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className='premium-card p-3'><ProductSkeleton /></div>
                            </div>
                        </>
                        :
                        productsCate.map((product, index) => (
                            <div key={product.id} className='col-12 col-md-6 col-lg-4 reveal-anim' style={{ animationDelay: `${index * 0.1}s` }}>
                                <SingleProduct product={product} />
                            </div>
                        ))
                    }
                </div>
                {!loading && productsCate.length === 0 && (
                    <div className='mt-5 vh-50 d-flex justify-content-center align-items-center'>
                        <h2 className='text-muted-alt'>No Products yet in this category</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SingelCategory
