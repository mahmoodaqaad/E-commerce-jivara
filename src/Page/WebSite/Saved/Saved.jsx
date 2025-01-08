import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBookmark as saveSolid } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { MyContext } from '../../../Context/MyState'


const Saved = () => {

    const [saved, setSaved] = useState([])
    const [err, setErr] = useState("")
    const { darkMode, addForCart, setIsChangeInCart, products, GetAllProducts, SavedProducts, getAllSavedProducts } = useContext(MyContext)
    const [IsaddtoYourCart, setIsaddtoYourCart] = useState(false)



    useEffect(() => {
        getAllSavedProducts()
        GetAllProducts()

    }, [])


    useEffect(() => {


        const newData = []
        SavedProducts?.map(savedItem => {
            products.map(product => {
                if (+product.id === +savedItem.id) {
                    savedItem = product
                    newData.push(savedItem)
                }
            })
        })
        console.log(newData);
        console.log(products);
        setSaved(newData)

        if (saved.length === 0) {
            setErr("NO Saved Yet")
        }
        else {

            setErr("")
        }

    }, [products, SavedProducts, saved.length])


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




    const showSaved = saved.map(product => {
        const image = JSON?.parse(product?.images);


        return (
            <div key={product.id} className='col-12 col-md-6 col-lg-4'>
                <div className='border shadow p-3 '>
                    <Link to={`/product/${product?.id}`}>
                        <img className='img-fluid rounded-1 img-product' src={image[0]} alt="" />
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
                        <div className='d-flex justify-content-end align-items-center '>




                            <div className='pointer' onClick={e => addToCart(product)}>
                                <FontAwesomeIcon fontSize={"20px"} icon={faCartShopping} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    )

    return (
        <div className='mt-4'>
            <h1>Saved</h1>
            <div className='row g-2'>
                {showSaved}
                {err && <h1 className='text-center mt-5 fa-5x text-danger fw-lighter'>{err}</h1>}
            </div>
        </div>
    )
}

export default Saved
