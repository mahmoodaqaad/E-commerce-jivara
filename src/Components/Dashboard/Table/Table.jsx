import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import PaginateShow from '../paginate/Paginate';

const TableShow = (props) => {

    // var 

    const { data,
        header,
        currentUser,
        darkMode,
        handleItemtDelete,
        loading,
        page,
        setPage,
        limit,
        setLimit,
        total,
        setSearch,
        beforesearch,
        setBeforeSearch
        , options
        , filter,
        setFilterData,
        orderByFilter,
        setOrderByFilter
    } = props;

    const [selectedUsers, setSelectedUsers] = useState([]);

    // styling


    const styleTd = {
        color: darkMode ? '#fff' : '#000',
        background: darkMode ? '#353535' : '#fff',
    };

    function showImg(images) {
        const newImage = JSON.parse(images)
        return <div className='d-flex gap-2 flex-wrap'>{

            newImage.map((img, key) => (

                < img key={key} width={"40px"} loading='lazy' src={img} alt="" />

            ))
        }
        </div>
    }

    useEffect(() => {
        const cleartime = setTimeout(() => {
            setSearch(beforesearch)

        }, 500);
        return () => clearTimeout(cleartime)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [beforesearch])



    // selected handleer


    // Handle selecting all users
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const userIds = data?.filter((item) => item.role !== '1990' && item.id !== currentUser?.id) //=> هل المستخدم الحالي  او الادمن موجود زيلهم
                .map((item) => item.id);
            setSelectedUsers(userIds);//=>اعمل علي الداتا ماب  وهات منها الايدي 
        } else {
            setSelectedUsers([]);
        }
    };

    // Handle selecting individual users
    const handleSelectUser = (id) => {
        setSelectedUsers((prevSelcted) => prevSelcted.includes(id) ?//=? فحص االوجود
            prevSelcted.filter((userId) => userId !== id) : //=>ازالة
            [...prevSelcted, id] //=> اضافة
        );
    };

    // Handle deleting selected users
    const handleDeleteSelected = () => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be Delete All this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background: darkMode ? "#333" : "#fff",
            color: !darkMode ? "#333" : "#fff",
        }).then((result) => {
            if (result.isConfirmed) {
                selectedUsers.map(id => handleItemtDelete(id))

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    background: darkMode ? "#333" : "#fff",
                    color: !darkMode ? "#333" : "#fff",

                });
            }
            setSelectedUsers([]);
        })

    };

    // get delete one item 
    function getDeleteItem(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background: darkMode ? "#333" : "#fff",
            color: !darkMode ? "#333" : "#fff",
        }).then((result) => {
            if (result.isConfirmed) {
                handleItemtDelete(id)

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    background: darkMode ? "#333" : "#fff",
                    color: !darkMode ? "#333" : "#fff",

                });
            }
        })

    }

    // show header 

    const headerShow = header.map((head) => (
        <td key={head.key} className="p-3" style={styleTd}>
            {head.name}
        </td>
    ));


    // show data 
    const dataShow = data?.map((data, key) => {
        const isUser = data?.id === currentUser?.id;
        const isSelected = selectedUsers.includes(data.id);

        return (


            <tr key={data.id}>
                <td style={styleTd}>{key + (limit * page) - limit + 1}</td>
                <td style={styleTd}>
                    <input
                        type="checkbox"
                        disabled={data.role === '1990' || isUser}
                        checked={isSelected}
                        onChange={() => handleSelectUser(data.id)}
                    />
                </td>
                {header.map((head) => {

                    return (

                        <td key={head.key} className="p-md-3" style={styleTd}>

                            {
                                head.key === 'images'
                                    ? showImg(data[head.key])
                                    : head.key === 'image' ?
                                        <img src={data[head.key]} loading='lazy' width={"120px"} alt="" />

                                        : head.key === 'category'
                                            ? data[head.key]?.name
                                            : data[head.key] === '1990'
                                                ? 'Admin'
                                                : data[head.key] === '1995'
                                                    ? 'Product Manager'
                                                    : data[head.key] === '2000'
                                                        ? 'User'
                                                        : head.key === 'name' && isUser
                                                            ? `${data[head.key]} (YOU)`
                                                            : head.key === 'lastLogin' && !data[head.key]
                                                                ? <span style={{ color: '#c83f3f' }}>Not Login Yet</span>
                                                                : data[head.key]}
                        </td>
                    )
                })}

                <td className="text-center" style={styleTd}>
                    <div className="d-flex flex-wrap gap-3  g-3  m-auto justify-content-center">
                        <div className="col-12 col-lg-5">
                            <Link to={`${data.id}`} className="btn btn-info">
                                <FontAwesomeIcon icon={faPen} />
                            </Link>
                        </div>



                        {!isUser && data.role !== '1990' && (
                            <div className="col-12 col-lg-5 ">
                                <button
                                    onClick={() => getDeleteItem(data.id)}
                                    className="btn btn-danger m-0"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
        );
    });

    // filterd 
    const filterOprtionShow = options?.map(item => (<option key={item} value={item.key}>{item.name}</option>))

    return (
        <div className='mw-100'>

            <div className='d-flex flex-wrap justify-content-lg-between justify-content-center align-items-center'>

                <form className="inputForm col-12 col-md-3 mt-4">
                    <div className='inputgroup py-1 '>

                        <input type="text" placeholder='search ?' value={beforesearch} onChange={e => setBeforeSearch(e.target.value)} />
                    </div>


                </form>
                <div className='d-flex  col-12 col-sm-6 flex-grow-1 justify-content-between justify-content-sm-end'>

                    <div className='col-6 col-sm-2'>
                        <select name="" id="" className='py-1 m-1 m-sm-0' value={filter} onChange={e => setFilterData(e.target.value)}>
                            {filterOprtionShow}

                        </select>
                    </div>
                    <div className='col-6 col-sm-2'>
                        <select name="" id="" className='py-1 m-1  m-sm-0' value={orderByFilter} onChange={e => setOrderByFilter(e.target.value)}>
                            <option value={"DESC"}>DESC</option>
                            <option value={"ASC"}>ASC</option>

                        </select>
                    </div>
                </div>
            </div>
            <div className='overflow-auto '>

                <Table
                    className="table-show shadow overflow-x-auto"
                    striped
                    bordered
                    hover
                    style={{ borderColor: darkMode ? '#666' : '#ecccec' }}
                >
                    <thead>
                        <tr>
                            <td style={styleTd}>key</td>
                            <td className='' style={{ width: "60px" }}>
                                <div className='d-flex align-items-center gap-2 h-100'>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                    />

                                    <button disabled={selectedUsers?.length === 0}
                                        onClick={handleDeleteSelected}
                                        className={`bg-danger text-white py-1 px-2 rounded ${selectedUsers?.length === 0 && "bg-danger-subtle"}`}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>

                                </div>
                            </td>
                            {headerShow}
                            <td className="p-md-3 text-center " style={styleTd}>
                                Action
                            </td>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            loading ? <tr><td style={styleTd} className='text-center ' colSpan={12}><h2>Loading ...</h2></td></tr>
                                : (data?.length > 0 ?

                                    dataShow :
                                    <tr><td className='text-center ' style={styleTd} colSpan={12}><h2 >No Data</h2></td></tr>
                                )
                        }

                    </tbody>
                </Table>
            </div>
            <div className=''>
                <div className=''>
                    <div className='col-12 col-sm-2 '>
                        <select name="" id="" className='py-1' value={limit} onChange={(e) => { setLimit(e.target.value) }}>

                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value={total}>All</option>

                        </select>
                    </div>

                    <div className='col-12 mx-auto overflow-x-auto'>
                        <PaginateShow
                            setPage={setPage}
                            limit={limit}
                            total={total}
                        />
                    </div>

                </div>
            </div >
        </div>
    );
};

export default TableShow;
