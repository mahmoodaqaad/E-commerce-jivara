import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { faArrowRightFromBracket, faCartShopping, faDashboard, faMoon, faSun, faUser, faX } from '@fortawesome/free-solid-svg-icons'
import { MyContext } from '../../../Context/MyState'
import axios from 'axios'
import { BaseURL } from '../../../API/API'
import { SkeletonShow } from '../../ShowSkeleton/ShowSkeleton'
import { Button, Modal } from 'react-bootstrap'
import Searched from '../../../Page/WebSite/Searched/Searched'
const Header = () => {

    const { SetDarkMode, darkMode, Logout, CurrentUser, GetCurrentUser, isChangeInCart, products, GetAllProducts } = useContext(MyContext)
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get(`${BaseURL}/categories?filter=created&order=DESC`).then(res => {
            setCategories(res.data.data);

        }).catch(e => console.log(e)
        ).finally(() => {
            setLoading(false)

        })
    }, [])


    useEffect(() => {

        if (CurrentUser?.id) {

            const productinCart = JSON.parse(localStorage.getItem(`yourCart`)) || []
            const newData = []
            // eslint-disable-next-line array-callback-return
            productinCart?.map(savedItem => {
                // eslint-disable-next-line array-callback-return
                products.map(product => {
                    if (+product.id === +savedItem.id) {
                        newData.push(savedItem)
                    }
                })



            })
            setProductLocal(newData)
        }
    }, [CurrentUser, isChangeInCart, products])



    const productShowOnModle = productLocal?.map((item, key) => (

        <Prod key={key} item={item} />
    ))


    const categoeyShow = categories.map((cate) => (
        <Link key={cate.id} to={"/category/" + cate.id} className='py-3 px-2 text-decoration-none text-inherit '>{cate.name}</Link>

    ))


    return (

        <>


            <Modal className='z-top shopping' style={{ top: "100px" }}
                show={showModle}
                onHide={handleHideModle}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productShowOnModle}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleHideModle}
                    >
                        Close
                    </Button>
                    <Button variant="primary"

                        onClick={handleHideModle}
                    >
                        CheckOut
                    </Button>
                </Modal.Footer>
            </Modal>





            <div className='header z-top shadow py-3 px-2' >

                <div className='d-flex align-items-center justify-content-between'>

                    <Link to="/" className="logo col-2 flex-grow-1">
                        <div className='icon'>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                        <h2>JIVARA</h2>
                    </Link>
                    {/* ? */}
                    <div className='col-3 flex-grow-1 d-none d-md-block inputserach'>
                        <div className='position-relative ' >

                            <div className='position-relative rounded-5 border  p-2 d-flex overflow-hidden'>
                                <div className='searchIcon position-absolute pointer'>
                                    <FontAwesomeIcon icon={faSearch} />
                                </div>
                                <input type="text" placeholder='search' value={search}  onChange={e => {
                                    setShow(true)
                                    setSearch(e.target.value)
                                }} className='ms-4 ps-3 w-100' />
                            </div>


                            {(show&&search) &&

                                <div  className='mt-4 position-absolute border   search-data w-100' style={{ background: "var(--gb-card)" }}>

                                    <Searched serach={search} setSearch={setSearch} />
                                </div>
                            }
                        </div>
                    </div>


                    <div className="col-3 flex-grow-1  d-flex align-items-center justify-content-end gap-2">
                        <div className='me-2 iconheader rounded-circle  pointer bg-success text-white p-2'
                            onClick={e => setShowModle(true)}
                        >
                            <FontAwesomeIcon fontSize={"17px"} className='' icon={faCartShopping} />
                        </div>
                        <div className={`rounded-circle pointer iconheader ${darkMode ? "shadow-dark" : "shadow"}`} onClick={() => SetDarkMode(prev => !prev)}>
                            <FontAwesomeIcon className="" fontSize={"17px"} icon={darkMode ? faSun : faMoon} color={darkMode ? "white" : "black"} />
                        </div>
                        <div>
                            {CurrentUser?.id ?




                                <div className='position-relative iconheader'>

                                    <Link to={(CurrentUser?.role === "1990" || CurrentUser?.role === "1995") ? "/dashboard/profile" : "profile"} className=' iconheader rounded-circle  pointer bg-primary text-white s '>
                                        <FontAwesomeIcon className="" fontSize={"17px"} icon={faUser} />
                                    </Link>

                                </div>
                                :

                                <Link to="/login" className='m-0 btn btn-primary rounded-4' >Login</Link>
                            }
                        </div>
                    </div>

                </div>


                <hr />
                <div className=' col-12 col-md- d-flex flex-wrap align-items-center gap-3 link-light-0'>

                    {loading ?
                        <SkeletonShow length={9} height="20px" className="col-2 col-md-1  p-0" />
                        :
                        <>
                            {categoeyShow}
                            <Link to={"/category"} className='py-1 px-2 text-decoration-none text-inherit btn btn-primary text-white '>Show All</Link>

                        </>
                    }
                </div>
            </div >
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
            }
            else {
                alert("max is :" + Number(yourCart[productexist].stok))

            }
        }

    }


    function deleteMinus() {
        if (+productexist !== -1) {
            if (Number(yourCart[productexist].count) > 0) {

                yourCart[productexist].count--


                localStorage.setItem(`yourCart`, JSON.stringify(yourCart))
                setIsChangeInCart(prev => !prev)
            }
            else {
                alert("0")

            }

        }
    }
    function Deleteitem(id) {

        if (+productexist !== -1) {
            console.log(yourCart[productexist]);
            console.log(id);
            const newLocal = yourCart.filter(product => product.id !== id)
            localStorage.setItem(`yourCart`, JSON.stringify(newLocal))
            setIsChangeInCart(prev => !prev)
        }
    }



    return <div className=' border-bottom position-relative mb-3 ' >


        <div className='position-absolute top-0 end-0 pointer p-2 '
            onClick={e => Deleteitem(item.id)}
        >
            <FontAwesomeIcon className=' btn btn-danger' icon={faX} />
        </div>
        <div className='row g-2'>
            <div className="col-12 col-md-3">
                <img
                    className="img-fluid"
                    width={"80px"}
                    src={JSON.parse(item.images)[0]}
                    alt=""
                />
            </div>
            <div className="col-12 col-md-7 ">
                <div>

                    <h6 style={{ fontSize: "16px" }} className=''>{item.title}</h6>

                    <h5 style={{ fontSize: "14px", fontWeight: "400" }}>
                        {item.discrption}
                    </h5>
                    <p>{item?.count}</p>

                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <div>
                            <div className="d-flex align-items-center gap-3">
                                <h5 className="m-0 price">{item.price}$</h5>
                                {

                                    item.discount &&
                                    <h6
                                        className="m-0"
                                        style={{ color: "gray", textDecoration: "line-through" }}
                                    >
                                        {+item.price + +item.discount}$
                                    </h6>
                                }
                            </div>
                        </div>
                        <div className=' d-flex  align-items-center justify-content-end gap-1'>

                            <button className='btn btn-danger py-1 rounded-0'

                                onClick={deleteMinus}>
                                -</button>

                            <button
                                onClick={addtoCart}
                                className='btn btn-success py-1 rounded-0'>+</button>

                        </div>
                    </div>

                </div>

            </div>
        </div>

    </div >

}