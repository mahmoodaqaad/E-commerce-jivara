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
    }, [GetAllCategories])




    return (
        <div className='mt-5 container'>
            <div className="text-center mb-5 reveal-anim">
                <h1 className="fw-bold mb-2">Shop by Categories</h1>
                <p className="text-muted-alt">Exploure our curated collections tailored for you</p>
            </div>
            <div className='row g-4'>
                {loading ?
                    <>
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                    </>
                    :
                    categories?.map((item, index) => (
                        <Link to={"" + item.id} key={item.id} className='col-12 col-sm-6 col-md-4 col-lg-3 text-decoration-none reveal-anim' style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className='premium-card h-100'>
                                <div className='img-hover-zoom border-bottom border-light border-opacity-10'>
                                    <img src={item.image} className='w-100' style={{ height: "180px", objectFit: "cover" }} alt={item.name} />
                                </div>
                                <div className='p-3 text-center'>
                                    <h5 className='mb-0 text-dark fw-bold'>{item.name}</h5>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoriesPage
