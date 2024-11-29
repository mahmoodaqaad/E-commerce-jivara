import React from 'react'
import ReactPaginate from "react-paginate";
import './paginate.css'
const PaginateShow = (props) => {
    const { setPage, limit, total } = props

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={(e) => setPage(e.selected + 1)}

            pageRangeDisplayed={2}
            pageCount={Math.ceil(total / limit)}
            previousLabel="<<"
            renderOnZeroPageCount={null}
            containerClassName="custom-pagination d-flex align-items-center justify-content-center  "
            pageLinkClassName="Pagination-tag-anchor p-sm-3 rounded-circle flex-grow-1"
            activeLinkClassName="activeLinkClassName"

        />
    )
}

export default PaginateShow
