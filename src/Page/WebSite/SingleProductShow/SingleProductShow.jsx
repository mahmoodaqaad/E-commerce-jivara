import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ImageGallery from "react-image-gallery"
import { useNavigate, useParams } from 'react-router-dom'
import Comments from '../../../Components/WebSite/Comments/Comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as saveSolid } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as savereg } from '@fortawesome/free-regular-svg-icons'
import { MyContext } from '../../../Context/MyState'
import { Axios } from '../../../API/Axios'
import { SkeletonShow } from '../../../Components/ShowSkeleton/ShowSkeleton'
import Rating from '../../../Components/WebSite/Rating/Rating'
import BtnPlusMinus from '../../../Components/BtnPlusMinus/BtnPlusMinus'
import './SingleProductShow.css'

const SingleProductShow = () => {

    const [product, setProduct] = useState({})
    const [Productimage, setProductimage] = useState([])
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(1)
    const { id } = useParams()
    const { darkMode, addForCart, setIsChangeInCart, SavedProducts, getAllSavedProducts, CurrentUser, GetCurrentUser } = useContext(MyContext)
    const [save, setSave] = useState(false)

    const Navigate = useNavigate();

    useEffect(() => {
        getAllSavedProducts()
        GetCurrentUser()
    }, [getAllSavedProducts, GetCurrentUser])

    useEffect(() => {
        setLoading(true)
        Axios.get(`/product/${id}`)
            .then(res => {
                setProduct(res.data.data[0])
                setProductimage(JSON.parse(res.data.data[0]?.images).map(item => { return { original: item, thumbnail: item } }));

            }).catch(e => {
                // console.log(e)
            }
            )
            .finally(_ => setLoading(false))
    }, [id])

    useEffect(() => {
        const isSaved = SavedProducts?.some(item => +item.id === +id);
        setSave(!!isSaved);
    }, [SavedProducts, id])

    const SavedProduct = () => {
        try {
            if (CurrentUser?.id) {
                if (!save) {
                    Axios.post(`/updateSave`, { savedProduct: product, type: true })
                    setSave(true)
                }
                else {
                    Axios.post(`/updateSave`, { savedProduct: product, type: false })
                    setSave(false)
                }
            }
            else {
                Navigate("/login")
            }
        } catch (error) {
        }
    }

    return (
        <Container className='product-container'>
            <div className='row'>
                <div className="col-lg-5 col-12">
                    <div className="product-gallery-card">
                        {loading ?
                            <>
                                <SkeletonShow height={"400px"} width={""} length={1} />
                                <div className='row g-2 justify-content-start mt-2'>
                                    <SkeletonShow height={"80px"} length={1} className={"col-3"} />
                                    <SkeletonShow height={"80px"} length={1} className={"col-3"} />
                                    <SkeletonShow height={"80px"} length={1} className={"col-3"} />
                                </div>
                            </>
                            :
                            <ImageGallery
                                items={Productimage}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showNav={false}
                                thumbnailPosition="bottom"
                            />
                        }
                    </div>
                </div>

                <div className='col-lg-7 col-12'>
                    <div className="product-info-card">
                        {loading ?
                            <>
                                <SkeletonShow height={"48px"} width={"100%"} length={1} className={"mb-3"} />
                                <SkeletonShow height={"24px"} width={"80%"} length={3} className={"mb-4"} />
                                <SkeletonShow height={"60px"} width={"100%"} length={1} className={"mb-4"} />
                                <SkeletonShow height={"50px"} width={"100%"} length={1} />
                            </> :
                            <>
                                <div className='d-flex justify-content-between align-items-start'>
                                    <div className="mb-4">
                                        <span className="premium-badge">New Arrival</span>
                                        <h1 className='product-title'>{product.title}</h1>
                                        <div className='rating-section'>
                                            {Rating(product).showGoldStars}
                                            {Rating(product).showEmptyStars}
                                            <span className='ms-2 text-muted fw-bold'>(4.5/5)</span>
                                        </div>
                                    </div>
                                    <div
                                        className={`btn-save ${save ? 'saved' : ''} pointer`}
                                        onClick={() => SavedProduct(product)}
                                    >
                                        <FontAwesomeIcon icon={save ? saveSolid : savereg} />
                                    </div>
                                </div>

                                <p className='product-description'>{product.discrption}</p>

                                <div className='product-price-section'>
                                    <div className="d-flex align-items-center gap-4">
                                        <span className='current-price'>{product.price}$</span>
                                        {product?.discount && (
                                            <div className="d-flex align-items-center gap-3">
                                                <span className='old-price'>{+product.price + +product.discount}$</span>
                                                <span className='discount-badge'>-{Math.round((product.discount / (+product.price + +product.discount)) * 100)}%</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='action-buttons-wrap'>
                                    <div className='d-flex flex-wrap align-items-end gap-4'>
                                        <div className="quantity-selector">
                                            <span className='d-block mb-3 fw-bold small text-uppercase text-muted' style={{ letterSpacing: '1px' }}>Quantity</span>
                                            <BtnPlusMinus count={count} setCount={setCount} />
                                        </div>

                                        <div className="flex-grow-1">
                                            <button
                                                className='btn-add-cart w-100'
                                                onClick={() => {
                                                    if (CurrentUser?.id) {
                                                        addForCart(id, count, product)
                                                        setIsChangeInCart(prev => !prev)
                                                    } else {
                                                        Navigate("/login")
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faCartShopping} />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        className='btn-buy-now'
                                        onClick={() => {
                                            if (CurrentUser?.id) {
                                                // Same logic as add for now as placeholder for buy now
                                                addForCart(id, count, product)
                                                setIsChangeInCart(prev => !prev)
                                            } else {
                                                Navigate("/login")
                                            }
                                        }}
                                    >
                                        Buy It Now
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </div>

                <div className="col-12 mt-5">
                    <hr className='my-5 opacity-10' />
                    <Comments darkMode={darkMode} id={id} />
                </div>
            </div>
        </Container >
    )
}

export default SingleProductShow
