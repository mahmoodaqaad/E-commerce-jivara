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
const SingleProduct = ({ product }) => {
    const [save, setSave] = useState(false)
    const { darkMode, addForCart, setIsChangeInCart, SavedProducts, getAllSavedProducts, CurrentUser, GetCurrentUser } = useContext(MyContext)
    const [IsaddtoYourCart, setIsaddtoYourCart] = useState(false)
    const image = product?.images ? JSON?.parse(product?.images) : "";

    const Navgite = useNavigate();

    useEffect(() => {
        getAllSavedProducts()
        GetCurrentUser()

    }, [])

    useEffect(() => {
        setSave(false)
        SavedProducts?.map(item => {
            if (+item?.id === +product?.id) {
                setSave(true)
            }

        })
    }, [SavedProducts, product])




    const SavedProduct = () => {

        if (CurrentUser?.id) {
            if (!save) {
                Axios.post(`${BaseURL}/updateSave`, { savedProduct: product, type: true }).then(e => console.log(e)).catch(e => {
                    console.log(e);
                })
                setSave(true)

            }
            else {
                Axios.post(`${BaseURL}/updateSave`, { savedProduct: product, type: false }).then(e => console.log(e)).catch(e => {
                    console.log(e);
                })
                setSave(false)
            }
        } else {




            Navgite("/login")


        }
    }



    function addToCart() {
        if (CurrentUser.id) {

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
        else {
            Navgite("/login")

        }
    }



    return (
        <>
            {
                (CurrentUser?.role === "1990" || CurrentUser?.role === "1995") &&
                < Link to={"/dashboard/products/" + product?.id} className='btn btn-success fs-5 mb-3'>

                    <FontAwesomeIcon onClick={e => {

                        SavedProduct()
                    }}

                        icon={faPen} />
                </Link >
            }
            <Link className='w-100 text-center d-block' to={`/product/${product?.id}`}>
                <img className='img-fluid rounded-1 img-product' src={image[0]} alt="" />
            </Link>
         
            <div className='info mt-2 px-2'>
                <div>
                    <div className='d-flex justify-content-between align-items-center'>

                        <h4>{product.title}</h4>
                        <div className='d-flex gap-2 align-items-center '>

                            <div >

                                <FontAwesomeIcon onClick={e => {

                                    SavedProduct()
                                }}

                                    icon={save ? saveSolid : savereg} />
                            </div>

                        </div>
                    </div>
                    <p className='price'>{product.price}$</p>
                </div>
                <div className='d-flex justify-content-between align-items-center '>

                    <div className='d-flex gap-1'>
                        {Rating(product).showGoldStars}
                        {Rating(product).showEmptyStars}


                    </div>


                    <div className='pointer' onClick={addToCart}>
                        <FontAwesomeIcon fontSize={"20px"} icon={faCartShopping} />
                    </div>

                </div>
            </div >

        </>
    )
}

export default SingleProduct
