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
        <div className="product-card">
            {
                (CurrentUser?.role === "1990" || CurrentUser?.role === "1995") &&
                <Link to={"/dashboard/products/" + product?.id} className='btn-edit-product'>
                    <FontAwesomeIcon icon={faPen} />
                </Link>
            }

            <div className="product-card-badges">
                <div className={`badge-save ${save ? 'saved' : ''}`} onClick={SavedProduct}>
                    <FontAwesomeIcon icon={save ? saveSolid : savereg} />
                </div>
            </div>

            <Link className='product-card-img-wrapper' to={`/product/${product?.id}`}>
                <img className='product-card-img' src={image[0]} alt={product.title} />
            </Link>

            <div className='product-card-info'>
                <div>
                    <h4 className='product-card-title'>{product.title}</h4>
                    <p className='product-card-price'>{product.price}$</p>
                </div>

                <div className='product-card-actions'>
                    <div className='product-card-rating'>
                        {Rating(product).showGoldStars}
                        {Rating(product).showEmptyStars}
                    </div>

                    <div className='btn-card-action' onClick={addToCart}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
