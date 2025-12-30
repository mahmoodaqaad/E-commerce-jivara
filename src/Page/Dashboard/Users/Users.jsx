import React, { useContext, useEffect, useState } from 'react'
import { AUser, AUsers, BaseURL } from '../../../API/API'
import { Link, } from 'react-router-dom'

import { MyContext } from '../../../Context/MyState'
import { Axios } from '../../../API/Axios'
import TableShow from '../../../Components/Dashboard/Table/Table'

const Users = () => {

    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(3)
    const [search, setSearch] = useState("")
    const [beforesearch, setBeforeSearch] = useState("")
    const [filterData, setFilterData] = useState("name")
    const [orderByFilter, setOrderByFilter] = useState("ASC")

    const { darkMode, CurrentUser, GetCurrentUser } = useContext(MyContext);



    useEffect(() => {
        setLoading(true)
        // get Current User  
        GetCurrentUser()

        // get all user 
        Axios.get(`${BaseURL}/${AUsers}?page=${page}&limit=${limit}&search=${search}&filter=${filterData}&order=${orderByFilter}`).then(res => {
            setTotal(res.data.total)
            setUsers(res.data.data)

        }).catch(e => {
            // console.log(e);


        }
        ).finally(() => {

            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, search, filterData, orderByFilter])

    // delete user

    const handleDeleteUser = (id) => {



        try {

            Axios.delete(`${BaseURL}/${AUser}/delete/${id}`).catch(e => {
                // console.log(e)
            }
            )
            setUsers(prev => {
                return prev.filter(item => item.id !== id)
            })
        } catch (e) {
            // console.log(e)
        }

    }


    const header = [
        { key: "id", name: "ID" },
        { key: "name", name: "Name" },
        { key: "email", name: "Email" },
        { key: "role", name: "Role" },
        { key: "DateCreated", name: "Created" },
        { key: "lastLogin", name: "log In" },

    ]
    const options = [
        {
            key: "name",
            name: "name"
        },
        {
            key: "lastLogin",
            name: "Date Created"
        },
        {
            key: "DateCreated",
            name: "Date Login"
        },

    ]
    return (
        <div className='bg-card p-3 rounded-2'>
            <div className='d-flex align-items-center justify-content-between '>

                <div className="text-inherit">
                    <h1>Users</h1>

                </div>

                <div>
                    <Link to="/dashboard/adduser" className="btn btn-success fs-6">Add User</Link>
                </div>
            </div >

            <div className='overflow-auto pt-4'>
                <TableShow
                    header={header}
                    setSearch={setSearch}
                    beforesearch={beforesearch}
                    setBeforeSearch={setBeforeSearch}
                    data={users}
                    darkMode={darkMode}
                    currentUser={CurrentUser}
                    loading={loading}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    total={total}
                    setLimit={setLimit}
                    handleItemtDelete={handleDeleteUser}
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

export default Users
