import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Searched from '../WebSite/Searched/Searched'

export const Search = () => {
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false)
    return (
        <div className='mt-3'>
            <div className='position-relative 'style={{ height: "calc(100vh - 100px)" }} >
                <div className='position-relative  border p-2 d-flex overflow-hidden'>
                    <div className='searchIcon position-absolute pointer'>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <input type="text" placeholder='Search products...' value={search} onChange={e => {
                        setShow(true)
                        setSearch(e.target.value)
                    }} className='ms-4 ps-3 w-100' />
                </div>

                {(show && search) &&
                    <div className='mt-4  search-data w-100' style={{ background: "var(--gb-card)" }}>
                        <Searched isMobile={true} serach={search} setSearch={setSearch} />
                    </div>
                }
            </div>
        </div>)
}

export default Search