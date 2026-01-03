import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'
import { faCartShopping, faMoon, faSun, faUser, faShoppingBasket, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MyContext } from '../../../Context/MyState'
import axios from 'axios'
import { BaseURL } from '../../../API/API'
import { SkeletonShow } from '../../ShowSkeleton/ShowSkeleton'
import { Modal } from 'react-bootstrap'
import Searched from '../../../Page/WebSite/Searched/Searched'

const Header = () => {
    const { SetDarkMode, darkMode, CurrentUser, GetCurrentUser, isChangeInCart, products, GetAllProducts, windowsize } = useContext(MyContext)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModle, setShowModle] = useState(false)
    const [productLocal, setProductLocal] = useState([])
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false)
    const handleHideModle = () => { setShowModle(false) }

    useEffect(() => {
        GetAllProducts()
        GetCurrentUser()
    }, [GetAllProducts, GetCurrentUser])

    useEffect(() => {
        setLoading(true)
        axios.get(`${BaseURL}/categories?filter=created&order=DESC`).then(res => {
            setCategories(res.data.data);
        }).catch(e => { }).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (CurrentUser?.id) {
            const productinCart = JSON.parse(localStorage.getItem(`yourCart`)) || []
            const newData = []
            productinCart?.forEach(savedItem => {
                products.forEach(product => {
                    if (+product.id === +savedItem.id) {
                        newData.push(savedItem)
                    }
                })
            })
            setProductLocal(newData)
        }
    }, [CurrentUser, isChangeInCart, products])

    const calculateSubtotal = () => {
        return productLocal.reduce((total, item) => total + (Number(item.price) * Number(item.count)), 0).toFixed(2);
    }

    const productShowOnModle = productLocal?.map((item, key) => (
        <Prod key={key} item={item} />
    ))

    const categoeyShow = categories.map((cate) => (
        <Link key={cate.id} to={"/category/" + cate.id} className='py-3 px-2 text-decoration-none text-inherit '>{cate.name}</Link>
    ))

    return (
        <>
            <Modal className='z-top shopping reveal-anim' style={{ top: "100px" }}
                show={showModle}
                onHide={handleHideModle}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="gradient-text">Shopping Bag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productLocal.length > 0 ? (
                        <div className="reveal-anim">
                            {productShowOnModle}
                        </div>
                    ) : (
                        <div className="empty-cart-state reveal-anim">
                            <FontAwesomeIcon icon={faShoppingBasket} className="empty-cart-icon text-main" />
                            <h4 className="fw-bold mb-2">Your bag is empty</h4>
                            <p className="text-muted-alt">Looks like you haven't added anything yet.</p>
                            <NavLink to="/category" onClick={handleHideModle} className="btn-premium btn-premium-primary mt-3 d-inline-block text-decoration-none">
                                Start Shopping
                            </NavLink>
                        </div>
                    )}
                </Modal.Body>
                {productLocal.length > 0 && (
                    <Modal.Footer>
                        <div className="subtotal-section w-100 d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <span className="d-block text-muted-alt small fw-bold text-uppercase">Subtotal</span>
                                <h4 className="m-0 fw-bold">{calculateSubtotal()}$</h4>
                            </div>
                            <span className="badge bg-main-light text-main px-3 py-2 rounded-pill small fw-bold">
                                {productLocal.length} Items
                            </span>
                        </div>
                        <NavLink to="/checkout" className="btn-premium btn-premium-primary w-100 py-3 fs-5 text-decoration-none justify-content-center" onClick={handleHideModle}>
                            Proceed to Checkout
                        </NavLink>
                    </Modal.Footer>
                )}
            </Modal>

            <div className='header z-top shadow py-3 px-2' >
                <div className='d-flex align-items-center justify-content-between'>
                    <Link to="/" className="logo col-2 flex-grow-1">
                        <div className='icon'>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                        <h2>JIVARA</h2>
                    </Link>

                    <div className='col-3 flex-grow-1 d-none d-md-block inputserach z-top'>
                        <div className='position-relative ' >
                            <div className='position-relative rounded-5 border p-2 d-flex overflow-hidden'>
                                <div className='searchIcon position-absolute pointer'>
                                    <FontAwesomeIcon icon={faSearch} />
                                </div>
                                <input type="text" placeholder='Search products...' value={search} onChange={e => {
                                    setShow(true)
                                    setSearch(e.target.value)
                                }} className='ms-4 ps-3 w-100' />
                            </div>

                            {(show && search) &&
                                <div className='mt-4 position-absolute border search-data w-100' style={{ background: "var(--gb-card)" }}>
                                    <Searched serach={search} setSearch={setSearch} />
                                </div>
                            }
                        </div>
                    </div>

                    <div className="col-3 flex-grow-1 d-flex align-items-center justify-content-end gap-2">
                        <button
                            className='header-action-btn'
                            onClick={() => setShowModle(true)}
                        >
                            <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: '1.1rem' }} />
                            {productLocal.length > 0 &&
                                <span className='badge rounded-pill bg-danger shadow-sm'>
                                    {productLocal.length}
                                </span>
                            }
                        </button>

                        <button
                            className="header-action-btn"
                            onClick={() => SetDarkMode(prev => !prev)}
                        >
                            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} style={{ fontSize: '1.1rem' }} />
                        </button>

                        <div className="ms-1">
                            {CurrentUser?.id ?
                                <Link to={(CurrentUser?.role === "1990" || CurrentUser?.role === "1995") ? "/dashboard/profile" : "profile"}
                                    className='header-action-btn'
                                >
                                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.1rem' }} />
                                </Link>
                                :
                                <Link to="/login" className='btn-premium btn-premium-primary px-4 py-2 small fw-bold' style={{ fontSize: '14px' }}>Login</Link>
                            }
                        </div>
                    </div>
                </div>

                <hr className="opacity-10 my-3" />
                <div className='d-flex justify-content-between align-items-center'>

                    <div className='col-7 md-col-12 d-flex flex-wrap align-items-center gap-2 link-light-0'>
                        {loading ?
                            <SkeletonShow length={7} height="30px" className="col-2 col-md-1 p-0 rounded-pill" />
                            :
                            <>
                                {windowsize > 767 && categoeyShow}
                                <Link to={"/category"} className='btn-premium glass-effect px-3 py-1 small rounded-pill text-decoration-none'>Show All</Link>
                            </>
                        }
                    </div>
                    <NavLink to="/search" className=' pointer px-3 btn-premium btn-premium-primary d-block d-md-none'>
                        <FontAwesomeIcon icon={faSearch} />
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Header

export const Prod = ({ item }) => {
    const { setIsChangeInCart } = useContext(MyContext)
    let yourCart = JSON.parse(localStorage.getItem(`yourCart`)) || []
    let productexist = yourCart.findIndex(product => +product.id === +item.id)

    function addtoCart() {
        if (+productexist !== -1) {
            if (Number(yourCart[productexist].count) < Number(yourCart[productexist].stok)) {
                yourCart[productexist].count++
                localStorage.setItem(`yourCart`, JSON.stringify(yourCart))
                setIsChangeInCart(prev => !prev)
            } else {
                // Simplified feedback
            }
        }
    }

    function deleteMinus() {
        if (+productexist !== -1) {
            if (Number(yourCart[productexist].count) > 1) {
                yourCart[productexist].count--
                localStorage.setItem(`yourCart`, JSON.stringify(yourCart))
                setIsChangeInCart(prev => !prev)
            } else {
                Deleteitem(item.id)
            }
        }
    }

    function Deleteitem(id) {
        if (+productexist !== -1) {
            const newLocal = yourCart.filter(product => product.id !== id)
            localStorage.setItem(`yourCart`, JSON.stringify(newLocal))
            setIsChangeInCart(prev => !prev)
        }
    }

    const image = item.images ? JSON.parse(item.images)[0] : "";

    return (
        <div className='cart-item-premium reveal-anim'>
            <div className='row g-3 align-items-center'>
                <div className="col-3">
                    <div className="rounded-3 overflow-hidden bg-white shadow-sm" style={{ height: '70px' }}>
                        <img className="w-100 h-100 object-fit-cover" src={image} alt={item.title} />
                    </div>
                </div>
                <div className="col-9">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                        <h6 className="fw-bold mb-0 text-truncate" style={{ maxWidth: '180px' }}>{item.title}</h6>
                        <button className="btn btn-link text-danger p-0 border-0" onClick={() => Deleteitem(item.id)}>
                            <FontAwesomeIcon icon={faTrash} fontSize="0.8rem" />
                        </button>
                    </div>

                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <div className="d-flex align-items-center gap-2">
                            <h6 className="m-0 fw-bold text-main">{item.price}$</h6>
                            <span className="small text-muted-alt">x {item.count}</span>
                        </div>

                        <div className='d-flex align-items-center gap-1 bg-light bg-opacity-10 p-1 rounded-pill'>
                            <button className='icon-circle miniature shadow-none' onClick={deleteMinus} style={{ width: '24px', height: '24px' }}>-</button>
                            <span className="px-1 small fw-bold">{item.count}</span>
                            <button className='icon-circle miniature bg-main text-white shadow-none' onClick={addtoCart} style={{ width: '24px', height: '24px' }}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}