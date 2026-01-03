import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MyContext } from '../../../Context/MyState'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBookmark as saveSolid } from '@fortawesome/free-solid-svg-icons'
import Rating from '../../../Components/WebSite/Rating/Rating'
import { ProductSkeleton } from '../../../Components/ShowSkeleton/ShowSkeleton'
const SingelCategory = () => {
    const { id } = useParams()

    const [productsCate, setProductsCate] = useState([])
    const { darkMode, addForCart, setIsChangeInCart, products, GetAllProducts } = useContext(MyContext)
    const [IsaddtoYourCart, setIsaddtoYourCart] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        GetAllProducts()
    }, [])


    useEffect(() => {
        try {
            setLoading(true)

            const data = []
            products.map(item => {
                if (+item.category_id === +id) {

                    data.push(item)
                }
            })
            setProductsCate(data)
        } finally {
            setLoading(false)


        }


    }, [id, products])



    function addToCart(product) {
        if (!IsaddtoYourCart) {
            addForCart(product.id, 1, product)
            setIsChangeInCart(prev => !prev)
            setIsaddtoYourCart(true)
        }
        else {
            Swal.fire({
                title: "Are you sure?",
                text: "You want To Add Again ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Add",
                background: darkMode ? "#333" : "#fff",
                color: !darkMode ? "#333" : "#fff",
            }).then((result) => {
                if (result.isConfirmed) {
                    addForCart(product.id, 1, product)
                    setIsChangeInCart(prev => !prev)
                    setIsaddtoYourCart(false)


                }
            })


        }
    }



    const showSaved = productsCate.map(product => {
        const image = JSON?.parse(product?.images);


        return (
            <>

                <div key={product.id} className='col-12 col-md-6 col-lg-4'>
                    <div className='border shadow p-3 '>
                        <Link to={`/product/${product?.id}`}>
                            <img className='img-fluid rounded-1 img-product' loading='lazy' src={image[0]} alt="" />
                        </Link>

                        <div className='info mt-2 px-2'>
                            <div>
                                <div className='d-flex justify-content-between align-items-center'>

                                    <h4>{product.title}</h4>

                                    <div className='pointer'>
                                        <FontAwesomeIcon

                                            icon={saveSolid} />
                                    </div>
                                </div>
                                <p className='price'>{product.price}$</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center '>

                                <div className='d-flex gap-1'>
                                    {Rating(product).showGoldStars}
                                    {Rating(product).showEmptyStars}


                                </div>


                                <div className='pointer' onClick={e => addToCart(product)}>
                                    <FontAwesomeIcon fontSize={"20px"} icon={faCartShopping} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    }
    )


    return (
        productsCate.length > 0 ?
            < div className='mt-4' >
                <h1>

                    {productsCate[0]?.category_name}
                </h1>
                <div className='mt-4 py-2'>
                    <div className="row g-2">
                        {
                            loading ?
                                <>
                                    <div className="col-12 col-md-4">
                                        <div className='shadow px-2 py-3 rounded '>
                                            <ProductSkeleton />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className='shadow px-2 py-3 rounded '>
                                            <ProductSkeleton />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className='shadow px-2 py-3 rounded '>
                                            <ProductSkeleton />
                                        </div>
                                    </div>


                                </>
                                :

                                showSaved
                        }

                    </div>

                </div >
            </div >
            :
            <div className='mt-4 vh-site d-flex justify-content-center align-items-center' style={{ height: "calc(100vh - 140px)" }}>
                <h2 className='text-danger text-center mt-5 fs-1'>No Products in this Category yet</h2>
            </div>
    )
}

export default SingelCategory
