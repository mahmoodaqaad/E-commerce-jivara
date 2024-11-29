import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../Context/MyState'
import { Link } from 'react-router-dom'
import { CategorySkeleton, SkeletonShow } from '../../../Components/ShowSkeleton/ShowSkeleton'

const CategoriesPage = () => {
    const { categories, GetAllCategories } = useContext(MyContext)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function getCa() {
            setLoading(true)

            try {
                await GetAllCategories()
            } catch (e) { }
            finally {
                setLoading(false)

            }
        }
        getCa()
    }, [])

    const categoryShow = categories?.map(item => (
        <Link to={"" + item.id} key={item.id} className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4 text-inherit text-decoration-none'>
            <div className='shadow p-3 border rounded-1'>
                <div className='d-flex gap-2 align-items-center '>
                    <div>
                        <img src={item.image} className='img-fluid' style={{
                            width: "90px", height: "60px",
                            objectFit: "cover"
                        }} alt="" />
                    </div>
                    <div className=''>
                        <p className='fs-4 mb-0' >{item.name}</p>
                    </div>
                </div>
            </div>
        </Link>

    ))


    return (
        <div className='mt-4'>
            <h1>All Categories</h1>
            <div className='row g-3 mt-4'>
                {loading ?
                    <>
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                    </>
                    :

                    categoryShow


                }
            </div>
        </div>
    )
}

export default CategoriesPage
