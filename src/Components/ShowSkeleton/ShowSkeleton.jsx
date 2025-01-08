import Skeleton from 'react-loading-skeleton'
import './ShowSkeleton.css'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faStar } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
export const SkeletonShow = (props) => {

    const skeletonshow = Array.from({ length: props.length }).map((_, index) => (
        <div key={index} className={props.className}>
            <Skeleton width={props.width} height={props.height || "20px"} className="skeleton-custom"></Skeleton>
        </div>
    ));
    return skeletonshow
}

export function ProductSkeleton() {
    return <>

        <SkeletonShow height={"300px"} length={1} className="w-100" />

        <div className='d-flex justify-content-between'>
            <SkeletonShow length={1} width={"120px"} />

            <div className='pointer'>
                <FontAwesomeIcon icon={faBookmark} />
            </div>
        </div>
        <SkeletonShow length={1} width={"60px"} />
        <div className='d-flex justify-content-between align-items-center '>

            <div className='d-flex gap-1'>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />



            </div>
            <div className='pointer'>
                <FontAwesomeIcon fontSize={"20px"} icon={faCartShopping} />
            </div>

        </div>

    </>

}
export function CategorySkeleton() {


    return <>

        <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4 text-inherit text-decoration-none'>
            <div className='shadow p-3 border rounded-1'>
                <div className='d-flex gap-2 align-items-center '>
                    <div>
                        <SkeletonShow width="90px" length={1} height="60px" />


                    </div>
                    <div className=''>
                        <div className='fs-4 mb-0' >
                            <SkeletonShow width="90px" length={1} />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>

}
export function RatedSkeleto() {


    return <>

        <div>

            <hr />
            <div className="row g-2 align-items-center">
                <div className="col-4">
                    <div>

                        <SkeletonShow width="100%" length={1} height="150px" />
                    </div>
                </div>
                <div className="col-8 p-3">
                    <div className="d-flex justify-content-between">
                        <div className="w-100">
                            <h3 className='mb-1'>< SkeletonShow length={1} width={"60%"} /></h3>
                            <div className="mb-1"> < SkeletonShow length={1} width={"90%"} /></div>
                            <div className="mb-1"> < SkeletonShow length={1} width={"80%"} /></div>
                            <div className="mb-1"> < SkeletonShow length={1} width={"50px"} /></div>
                        </div>
                        <div className='pointer'>
                            <FontAwesomeIcon icon={faBookmark} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">

                        <div>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className='pointer' >
                            <FontAwesomeIcon fontSize={"20px"} icon={faCartShopping} />
                        </div>
                    </div>

                </div>
            </div>
        </div>


    </>

}