import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../Context/MyState'
import { Axios } from '../../../API/Axios'
import { AProduct } from '../../../API/API'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Searched.css'
import { Link } from 'react-router-dom'
const Searched = ({ serach, setSearch }) => {
    const [reuslt, setRuslt] = useState([])
    const [err, setErr] = useState([])
    useEffect(() => {
        Axios.get(`/searchProduct?search=${serach}`).then(res => {
            setRuslt(res.data.data);
            if (reuslt.length === 0) {

                setErr("Not Found")
            }
            else {
                setErr("")
            }

        }).catch(e => console.log(e)
        )

    },[reuslt.length, serach])
    return (

        <div className='overflow-y-auto'>
            <div className='' style={{ maxHeight: "100vh" }}>
                {reuslt.map(res => (
                    <Link to={"/product/" + res.id} onClick={e => setSearch("")} className='w-100 searchReuslt '>
                        <div className='d-flex justify-content-between'>

                            <h5 className='fs-6 '>{res.title}</h5>
                            <div>
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>
                    </Link>

                ))}
                {
                    err && <p className='py-2 m-0 text-center fs-3 fw-bold'>{err}</p>
                }
            </div>
        </div>
    )
}

export default Searched
