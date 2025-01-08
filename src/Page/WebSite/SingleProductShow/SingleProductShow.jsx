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

const SingleProductShow = () => {



    const [product, setProduct] = useState({})
    const [Productimage, setProductimage] = useState([])
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(1)
    const { id } = useParams()
    const { darkMode, addForCart, setIsChangeInCart, SavedProducts, getAllSavedProducts, CurrentUser, GetCurrentUser } = useContext(MyContext)
    const [save, setSave] = useState(false)


    const Navgite = useNavigate();


    useEffect(() => {
        getAllSavedProducts()
        GetCurrentUser()
    }, [])


    useEffect(() => {
        setLoading(true)
        Axios.get(`/product/${id}`)
            .then(res => {
                setProduct(res.data.data[0])
                setProductimage(JSON.parse(res.data.data[0]?.images).map(item => { return { original: item, thumbnail: item } }));

            }).catch(e => console.log(e)
            )
            .finally(_ => setLoading(false))
    }, [id])




    useEffect(() => {

        SavedProducts?.map(item => {


            if (+item.id === +id) {
                setSave(true)
            }
        })
    }, [SavedProducts, id])

    const SavedProduct = () => {

        if (CurrentUser?.id) {

            if (!save) {
                Axios.post(`/updateSave`, { savedProduct: product, type: true }).then(e => console.log(e)).catch(e => {
                    console.log(e);
                })
                setSave(true)

            }
            else {
                Axios.post(`/updateSave`, { savedProduct: product, type: false }).then(e => console.log(e)).catch(e => {
                    console.log(e);
                })
                setSave(false)
            }

        }
        else {
            Navgite("/login")

        }
    }


    return (
        <Container className='mt-5'>
            <div className='row g-4'>
                <div className="col-lg-4 col-md-6 col-12">
                    {loading ?
                        <>

                            <SkeletonShow height={"312px"} width={""} length={1} />
                            <div className='row g-2 justify-content-start mt-2'>
                                <SkeletonShow height={"100px"} length={1} className={"col-4"} />
                                <SkeletonShow height={"100px"} length={1} className={"col-4"} />
                                <SkeletonShow height={"100px"} length={1} className={"col-4"} />


                            </div>


                        </>

                        :
                        <ImageGallery items={Productimage} thumbnailClass="overflow-scroll" />
                    }
                </div>


                <div className='col-lg-8 col-md-6 col-12 pt-4'>
                    {loading ?
                        <>

                            <SkeletonShow height={"36px"} width={"250px"} length={1} className={"h1"} />
                            <SkeletonShow height={"24px"} width={"450px"} length={1} className={"p"} />
                            <SkeletonShow height={"23px"} width={"400px"} length={1} className={"h5"} />
                            <SkeletonShow height={"47px"} width={""} length={1} className={"mb-2"} />

                        </> :
                        <>

                            <div className='d-flex  justify-content-between '>
                                <h1 className='mb-3'>{product.title}</h1>

                                <div className='pointer'>
                                    <FontAwesomeIcon onClick={e => {

                                        SavedProduct(product)
                                    }}

                                        icon={save ? saveSolid : savereg} />
                                </div>
                            </div>

                            <h5 className='mb-3'>{product.discrption}</h5>




                            <div className='d-flex align-items-center justify-content-between mt-4'>
                                <div>
                                    <div className='d-flex align-items-center gap-3'>
                                        <h5 className='m-0 price'>{product.price}$</h5>
                                        {product?.discount &&
                                            <h6 className='m-0' style={{ color: "gray", textDecoration: "line-through" }}>{+product.price + +product.discount}$</h6>
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className='d-flex flex-wrap justify-content-between align-items-center mt-4'>

                                <div className='d-flex gap-1 col-12 col-md-6'>
                                    {Rating(product).showGoldStars}
                                    {Rating(product).showEmptyStars}


                                </div>

                                <div className='d-flex align-items-center  gap-3 col-12 col-md-6 mt-4 mt-md-0 justify-content-between justify-content-md-end'>

                                    <BtnPlusMinus count={count} setCount={setCount} />


                                    <div className='pointer' onClick={e => {
                                        if (CurrentUser?.id) {
                                            addForCart(id, count, product)
                                            setIsChangeInCart(prev => !prev)
                                        } else {
                                            Navgite("/login")

                                        }

                                    }
                                    }><FontAwesomeIcon fontSize={"30px"} icon={faCartShopping} />
                                    </div>
                                </div>

                            </div>
                        </>


                    }

                </div>

                <Comments darkMode={darkMode} id={id} />
            </div>
        </Container >
    )
}

export default SingleProductShow
