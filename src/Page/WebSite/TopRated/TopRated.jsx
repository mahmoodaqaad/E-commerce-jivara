import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../API/Axios";
import { faCartShopping, faStar, faBookmark as saveSolid } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as savereg } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Rating from "../../../Components/WebSite/Rating/Rating";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/MyState";
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
        <div className="premium-card p-4 glass-effect reveal-anim">
            <div className="text-center mb-4">
                <h3 className="fw-900 gradient-text d-flex align-items-center gap-2 justify-content-center m-0">
                    <FontAwesomeIcon icon={faStar} fontSize="18px" />
                    TOP RATED
                    <FontAwesomeIcon icon={faStar} fontSize="18px" />
                </h3>
                <p className="text-muted-alt small fw-bold mb-0">COMMUNITY FAVORITES</p>
            </div>

            <div className="d-flex flex-column gap-2">
                {loading ?
                    <>
                        <RatedSkeleto />
                        <RatedSkeleto />
                        <RatedSkeleto />
                    </>
                    :
                    topRated?.slice(0, 5).map((item, i) => (
                        <RatedOneProuduct key={i} product={item} index={i} />
                    ))
                }
            </div>
        </div>
    );
};

export default TopRated;

const RatedOneProuduct = ({ product, index }) => {

    const [save, setSave] = useState(false)
    const { addForCart, setIsChangeInCart, SavedProducts, getAllSavedProducts, CurrentUser, GetCurrentUser } = useContext(MyContext)
    const image = product?.images ? JSON?.parse(product?.images)[0] : "";

    const Navgite = useNavigate();

    useEffect(() => {
        getAllSavedProducts()
        GetCurrentUser()
    }, [getAllSavedProducts, GetCurrentUser])

    useEffect(() => {
        const isSaved = SavedProducts?.some(item => +item.id === +product?.id);
        setSave(!!isSaved);
    }, [SavedProducts, product])


    const SavedProduct = (e) => {
        e.preventDefault();
        e.stopPropagation();
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


    function handleAddToCart(e) {
        e.preventDefault();
        e.stopPropagation();
        if (CurrentUser.id) {
            addForCart(product.id, 1, product)
            setIsChangeInCart(prev => !prev)
        }
        else {
            Navgite("/login")
        }
    }
    return (
        <div className="reveal-anim" style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="p-2 rounded-4 hover-translate-none" style={{ transition: 'all 0.3s ease' }}>
                <div className="row g-3 align-items-center">
                    <div className="col-4">
                        <Link to={`/product/${product?.id}`} className="d-block overflow-hidden rounded-3 shadow-sm">
                            <img
                                className="img-fluid img-hover-zoom"
                                src={image}
                                alt={product.title}
                                style={{ height: '80px', width: '100%', objectFit: 'cover' }}
                            />
                        </Link>
                    </div>
                    <div className="col-8">
                        <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                                <h6 className="fw-bold mb-1 text-truncate" style={{ maxWidth: '140px' }}>{product.title}</h6>
                                <div className="d-flex align-items-center gap-2 mb-1">
                                    <div className="small d-flex gap-1 text-warning">
                                        {Rating(product).showGoldStars}
                                    </div>
                                    <span className="price fs-6 fw-900">{product.price}$</span>
                                </div>
                            </div>
                            <button
                                className={`icon-circle glass-effect border-0 shadow-sm miniature ${save ? 'text-danger bg-white' : ''}`}
                                onClick={SavedProduct}
                                style={{ width: '32px', height: '32px' }}
                            >
                                <FontAwesomeIcon icon={save ? saveSolid : savereg} fontSize="0.85rem" />
                            </button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-1">
                            <span className="text-muted-alt x-small fw-bold">Stock: {product.stok}</span>
                            <button
                                className="btn-card-action icon-circle bg-main shadow-sm pointer text-white"
                                onClick={handleAddToCart}
                                style={{ width: '32px', height: '32px', background: 'var(--main-color)' }}
                            >
                                <FontAwesomeIcon icon={faCartShopping} fontSize="0.85rem" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {index < 4 && <hr className="my-2 opacity-10" />}
        </div>
    )

}
