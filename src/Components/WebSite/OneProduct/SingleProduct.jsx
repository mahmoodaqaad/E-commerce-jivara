import { faCartShopping, faPen, faBookmark as saveSolid } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as savereg } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyContext } from '../../../Context/MyState'
import Swal from 'sweetalert2'
import Rating from '../Rating/Rating'
import { Axios } from '../../../API/Axios'
import { BaseURL } from '../../../API/API'
import './SingleProduct.css'

const SingleProduct = ({ product }) => {
    const [save, setSave] = useState(false)
    const { darkMode, addForCart, setIsChangeInCart, SavedProducts, getAllSavedProducts, CurrentUser, GetCurrentUser } = useContext(MyContext)
    const [IsaddtoYourCart, setIsaddtoYourCart] = useState(false)
    const image = product?.images ? JSON?.parse(product?.images) : "";

    const Navigate = useNavigate();

    useEffect(() => {
        getAllSavedProducts()
        GetCurrentUser()
    }, [getAllSavedProducts, GetCurrentUser])

    useEffect(() => {
        const isSaved = SavedProducts?.some(item => +item?.id === +product?.id);
        setSave(!!isSaved);
    }, [SavedProducts, product])

    const SavedProduct = (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if (CurrentUser?.id) {
                if (!save) {
                    Axios.post(`${BaseURL}/updateSave`, { savedProduct: product, type: true })
                    setSave(true)
                }
                else {
                    Axios.post(`${BaseURL}/updateSave`, { savedProduct: product, type: false })
                    setSave(false)
                }
            } else {
                Navigate("/login")
            }
        } catch (e) {
        }
    }

    function addToCart(e) {
        e.preventDefault();
        e.stopPropagation();
        if (CurrentUser.id) {
            if (!IsaddtoYourCart) {
                addForCart(product.id, 1, product)
                setIsChangeInCart(prev => !prev)
                setIsaddtoYourCart(true)
            }
            else {
                Swal.fire({
                    title: "Already in cart",
                    text: "Would you like to add another one?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Add More",
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
        else {
            Navigate("/login")
        }
    }

    return (
        <div className="premium-card h-100 d-flex flex-column reveal-anim">
            {
                (CurrentUser?.role === "1990" || CurrentUser?.role === "1995") &&
                <div className="p-2 position-absolute z-3">
                    <Link to={"/dashboard/products/" + product?.id} className='btn btn-success icon-circle shadow-sm border-0'>
                        <FontAwesomeIcon icon={faPen} />
                    </Link >
                </div>
            }

            <div className="product-card-badges position-absolute top-0 end-0 p-3 z-3">
                <div
                    className={`d-flex align-items-center justify-content-center icon-circle glass-effect shadow-sm pointer transition-all ${save ? 'text-danger bg-white' : ''}`}
                    onClick={SavedProduct}
                    style={{ width: '40px', height: '40px' }}
                >
                    <FontAwesomeIcon icon={save ? saveSolid : savereg} />
                </div>
            </div>

            <Link className='img-hover-zoom w-100 text-center d-block bg-light bg-opacity-10' to={`/product/${product?.id}`}>
                <img className='product-card-img w-100' style={{ height: '280px', objectFit: 'cover' }} src={image[0]} alt={product.title} />
            </Link>

            <div className='product-card-info p-4 flex-grow-1 d-flex flex-column'>
                <div className="mb-3">
                    <h4 className='product-card-title mb-2 text-truncate' style={{ fontSize: '1.2rem', fontWeight: '700' }} title={product.title}>
                        {product.title}
                    </h4>
                    <div className='product-card-rating d-flex gap-1 mb-2'>
                        {Rating(product).showGoldStars}
                        {Rating(product).showEmptyStars}
                    </div>
                </div>

                <div className='mt-auto d-flex justify-content-between align-items-center'>
                    <div className="price-tag">
                        <span className='price'>{product.price}$</span>
                    </div>
                    <div
                        className='btn-card-action icon-circle bg-main shadow-sm pointer text-white'
                        onClick={addToCart}
                        style={{ width: '45px', height: '45px', background: 'var(--main-color)' }}
                    >
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
