import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { MyContext } from '../../../Context/MyState'
import { ACategories, ACategory } from '../../../API/API'
import { Axios } from '../../../API/Axios'
import TableShow from '../../../Components/Dashboard/Table/Table'


const Categories = () => {

    const [categories, setCategories] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(3)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [beforesearch, setBeforeSearch] = useState("")
    const [filterData, setFilterData] = useState("name")
    const [orderByFilter, setOrderByFilter] = useState("ASC")
    const { darkMode } = useContext(MyContext);


    // get all categories 
    useEffect(() => {
        setLoading(true)

        Axios.get(`/${ACategories}?page=${page}&limit=${limit}&search=${search}&filter=${filterData}&order=${orderByFilter}`).then(res => {
            setTotal(res.data.total)

            setCategories(res.data.data);
        }

        ).catch(e => console.log(e)
        ).finally(_ => {

            setLoading(false)
        })

    }, [page, limit, search, filterData, orderByFilter])



    // delete user


    const handleCategorytDelete = async (id) => {

        try {
             Axios.delete(`${ACategory}/delete/${id}`)

            setCategories(prev => prev.filter(item => item.id !== id))




        } catch (e) {
            // console.log(e);

        }








    }



    const header = [
        { key: "id", name: "ID" },
        { key: "image", name: "Image" },
        { key: "name", name: "Name" },
        { key: "created", name: "Created at" },



    ]

    const options = [
        {
            key: "name",
            name: "name"
        },
        {
            key: "created",
            name: "Date"
        },

    ]

    return (
        <div className='bg-card p-3 rounded-2'>
            <div className='d-flex align-items-center justify-content-between'>

                <div className="text-inherit">
                    <h1>Categories</h1>

                </div>

                <div>
                    <Link to="/dashboard/addcategory" className="btn btn-success fs-6">Add category</Link>
                </div>
            </div >

            <div className='overflow-auto'>
                <TableShow
                    header={header}
                    setSearch={setSearch}
                    beforesearch={beforesearch}
                    setBeforeSearch={setBeforeSearch}
                    page={page}
                    setPage={setPage}
                    total={total}
                    limit={limit}
                    setLimit={setLimit}
                    data={categories}
                    darkMode={darkMode}
                    handleItemtDelete={handleCategorytDelete}
                    loading={loading}
                    options={options}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    orderByFilter={orderByFilter}
                    setOrderByFilter={setOrderByFilter}
                />
            </div>
        </div >
    )
}

export default Categories
