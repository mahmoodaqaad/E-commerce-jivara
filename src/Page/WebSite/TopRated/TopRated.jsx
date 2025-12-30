import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../API/Axios";
import { faCartShopping, faPen, faShoppingCart, faStar, faBookmark as saveSolid } from '@fortawesome/free-solid-svg-icons'

import { faBookmark, faBookmark as savereg } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Rating from "../../../Components/WebSite/Rating/Rating";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/MyState";
import Swal from "sweetalert2";
import { RatedSkeleto } from "../../../Components/ShowSkeleton/ShowSkeleton";
const TopRated = () => {

    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)

        Axios.get(`/product/topRated`).then(res => {
            setTopRated(res.data.data);
        }).catch(e => {
            // console.log(e);

        }).finally(e => {
            setLoading(false)

        }
        )


    }, [])


    return (
        <div className="border shadow p-2 rounded-3 ">
            <div className="fst-italic fw-bold text-center">
                <h2 className="text-warning d-flex align-items-center gap-2 justify-content-center"> <FontAwesomeIcon icon={faStar} fontSize={"20px"} /> Top Rated <FontAwesomeIcon icon={faStar} fontSize={"20px"} /></h2>

            </div>

            <div>
                {
                    loading ?

                        <>
                            <RatedSkeleto />
                            <RatedSkeleto />
                            <RatedSkeleto />
                            <RatedSkeleto />
                            <RatedSkeleto />
                        </>

                        :


                        topRated?.map((item, i) => (
                            <RatedOneProuduct key={i} product={item} />
                        ))}
            </div>
        </div >
    );
};

export default TopRated;

const RatedOneProuduct = ({ product }) => {

    const [save, setSave] = useState(false)
    const { darkMode, addForCart, setIsChangeInCart, SavedProducts, getAllSavedProducts, CurrentUser, GetCurrentUser } = useContext(MyContext)
    const [IsaddtoYourCart, setIsaddtoYourCart] = useState(false)
    const image = product?.images ? JSON?.parse(product?.images)[0] : "";

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
            } else {




                Navgite("/login")


            }

        } catch (error) {

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


        <div className="">
            <hr />

            <div className="row g-2 align-items-center">
                {
                    (CurrentUser?.role === "1990" || CurrentUser?.role === "1995") &&
                    <div className="text-center">

                        < Link to={"/dashboard/products/" + product?.id} className='btn btn-success fs-5 '>

                            <FontAwesomeIcon onClick={e => {

                                SavedProduct()
                            }}

                                icon={faPen} />
                        </Link >
                    </div>
                }
                <div className="col-4">
                    <Link to={`/product/${product?.id}`}>
                        <img className="img-fluid" src={image} alt="" />
                    </Link>
                </div>
                <div className="col-8 p-3">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3>{product.title}</h3>
                            <p className="d-none d-md-block">{product.discrption}</p>
                            <p className="price">{product.price}$</p>
                        </div>
                        <div className='pointer'>
                            <FontAwesomeIcon onClick={e => {

                                SavedProduct()
                            }}

                                icon={save ? saveSolid : savereg} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">

                        <div>
                            {Rating(product).showGoldStars}
                            {Rating(product).showEmptyStars}
                        </div>
                        <div className='pointer' onClick={addToCart}>
                            <FontAwesomeIcon fontSize={"20px"} icon={faCartShopping} />
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )

}
