import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from '../../../Context/MyState'
import axios from 'axios'
import { BaseURL } from '../../../API/API'
import TableShow from '../../../Components/Dashboard/Table/Table'


const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(3)
    const [search, setSearch] = useState("")
    const [beforesearch, setBeforeSearch] = useState("")
    const [filterData, setFilterData] = useState("title")
    const [orderByFilter, setOrderByFilter] = useState("ASC")
    const { darkMode } = useContext(MyContext);
 

    // get all product 
    useEffect(() => {
        setLoading(true)

        axios.get(`${BaseURL}/products?page=${page}&limit=${limit}&search=${search}&filter=${filterData}&order=${orderByFilter}`).then(res => {
            setTotal(res.data.total)
            setProducts(res.data.data);
            // console.log(res);


        }
        ).catch(e => console.log(e)
        ).finally(() => {

            setLoading(false)
        })

    }, [page, limit, search, filterData, orderByFilter])


    const hnadleProductDelete = async (id) => {

        try {

            await axios.delete(`${BaseURL}/product/delete/${id}`)
            setProducts(prev => prev.filter(item => item.id !== id))

        }
        catch (e) {
            console.log(e);

        }

    }


    const header = [
        { key: "id", name: "ID" },
        { key: "images", name: "Images" },
        { key: "title", name: "title" },
        { key: "discrption", name: "discrption" },
        { key: "category_id", name: "category_id" },
        { key: "category_name", name: "category" },
        { key: "stok", name: "Stok" },
        { key: "created", name: "created" },
        { key: "price", name: "price" },


    ]

    const options = [
        {
            key: "title",
            name: "Title"
        },
        {
            key: "created",
            name: "Date"
        },
        {
            key: "stok",
            name: "stok"
        },
    ]

    return (
        <div className='bg-card p-3 rounded-2'>
            <div className='d-flex align-items-center justify-content-between'>

                <div className="text-inherit">
                    <h1>Products</h1>

                </div>

                <div>
                    <Link to="/dashboard/addproduct" className="btn btn-success fs-6">Add Product</Link>
                </div>
            </div >

            <TableShow
                setSearch={setSearch}
                beforesearch={beforesearch}
                setBeforeSearch={setBeforeSearch}
                header={header}
                data={products}
                darkMode={darkMode}
                handleItemtDelete={hnadleProductDelete}
                loading={loading}
                page={page}
                setPage={setPage}
                total={total}
                limit={limit}
                setLimit={setLimit}
                options={options}
                filter={filterData}
                setFilterData={setFilterData}
                orderByFilter={orderByFilter}
                setOrderByFilter={setOrderByFilter}
            />
        </div>
    )
}

export default Products
