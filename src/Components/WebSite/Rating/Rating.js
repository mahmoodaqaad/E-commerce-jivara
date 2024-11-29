import { faStar as starsolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as startreg } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Rating = (product ) => {


    const rating = (Math.round(product.rating_avarage))


    const showGoldStars = Array.from({ length: rating }).map((_, index) => <FontAwesomeIcon color='#ffc321' key={index} icon={starsolid} />

    )
    const showEmptyStars = Array.from({ length: 5 - rating }).map((_, index) => <FontAwesomeIcon key={index} icon={startreg} />
    )

    return { showGoldStars, showEmptyStars }
}

export default Rating
