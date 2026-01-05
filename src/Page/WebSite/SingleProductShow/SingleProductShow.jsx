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
        <div className='mt-5 container'>
            <div className='row g-lg-5 g-4'>
                {/* Product Media Column */}
                <div className="col-lg-6 col-12 reveal-anim">
                    <div className="premium-card p-3 glass-effect" style={{ borderRadius: '24px' }}>
                        {loading ?
                            <div className="d-flex flex-column gap-3">
                                <SkeletonShow height={"450px"} width={"100%"} length={1} />
                                <div className='row g-2'>
                                    <SkeletonShow height={"100px"} length={4} className={"col-3"} />
                                </div>
                            </div>
                            :
                            <div className="modern-gallery">
                                <ImageGallery items={Productimage} showPlayButton={false} showFullscreenButton={true} />
                            </div>
                        }
                    </div>
                </div>

                {/* Product Details Column */}
                <div className='col-lg-6 col-12 reveal-anim' style={{ animationDelay: '0.2s' }}>
                    {loading ?
                        <div className="d-flex flex-column gap-4">
                            <SkeletonShow height={"50px"} width={"90%"} length={1} />
                            <SkeletonShow height={"30px"} width={"40%"} length={1} />
                            <SkeletonShow height={"150px"} width={"100%"} length={1} />
                            <SkeletonShow height={"80px"} width={"300px"} length={1} />
                        </div>
                        :
                        <div className="ps-lg-2">
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <h1 className='display-5 fw-900 mb-0'>{product.title}</h1>
                                <button
                                    className={`icon-circle glass-effect border-0 shadow-sm ${save ? 'text-danger bg-white' : ''}`}
                                    onClick={() => SavedProduct(product)}
                                    style={{ width: '50px', height: '50px' }}
                                >
                                    <FontAwesomeIcon icon={save ? saveSolid : savereg} fontSize="1.2rem" />
                                </button>
                            </div>

                            <div className='d-flex align-items-center gap-3 mb-4'>
                                <div className='d-flex gap-1'>
                                    {Rating(product).showGoldStars}
                                    {Rating(product).showEmptyStars}
                                </div>
                                <span className='text-muted-alt fw-bold'>(4.8 Rating)</span>
                                <span className='ms-auto badge bg-success bg-opacity-10 text-success p-2 px-3 fw-bold'>In Stock</span>
                            </div>

                            <div className='mb-5'>
                                <p className='fs-5 text-muted-alt' style={{ lineHeight: '1.8' }}>{product.discrption}</p>
                            </div>

                            <div className='premium-card glass-effect mb-5 p-4 border-0 d-flex align-items-center gap-5'>
                                <div>
                                    <span className='d-block text-muted-alt small fw-bold text-uppercase mb-1'>Current Price</span>
                                    <h2 className='display-6 fw-bold m-0 gradient-text'>{product.price}$</h2>
                                </div>
                                {product?.discount &&
                                    <div>
                                        <span className='d-block text-muted-alt small fw-bold text-uppercase mb-1'>Discount</span>
                                        <div className="d-flex align-items-center gap-2">
                                            <h4 className='m-0 text-muted text-decoration-line-through'>{+product.price + +product.discount}$</h4>
                                            <span className="badge bg-danger">-{Math.round((product.discount / (+product.price + +product.discount)) * 100)}%</span>
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className='d-flex flex-wrap align-items-end gap-4'>
                                <div className='quantity-selector bg-light bg-opacity-10 p-2 rounded-pill'>
                                    <BtnPlusMinus count={count} setCount={setCount} />
                                </div>
                                <button
                                    className='btn-premium btn-premium-primary fs-5 px-5 py-3 flex-grow-1'
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
                                    Add to Collection
                                </button>
                            </div>

                            <div className="mt-5 p-4 border-top border-light border-opacity-10 shadow-sm rounded-4">
                                <div className="row g-4">
                                    <div className="col-sm-6">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="icon-circle bg-main bg-opacity-10 text-main">
                                                <i className="fa fa-truck"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-bold">Express Delivery</h6>
                                                <small className="text-muted-alt">Under 48 hours</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="icon-circle bg-success bg-opacity-10 text-success">
                                                <i className="fa fa-shield"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-bold">Quality Assured</h6>
                                                <small className="text-muted-alt">Free returns</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* Product Feedbacks */}
            <div className="mt-5 pt-5 reveal-anim" style={{ animationDelay: '0.4s' }}>
                <div className='d-flex align-items-center gap-3 mb-4 border-bottom pb-3'>
                    <h3 className='fw-bold mb-0'>Customer Voices</h3>
                    <span className="badge bg-site text-dark px-3 mt-1">Authentic Reviews</span>
                </div>
                <div className="premium-card p-4 glass-effect">
                    <Comments darkMode={darkMode} id={id} />
                </div>
            </div>
        </div>
    )
}

export default SingleProductShow
