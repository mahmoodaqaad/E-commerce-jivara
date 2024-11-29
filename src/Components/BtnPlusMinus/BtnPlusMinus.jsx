import React from 'react'

const BtnPlusMinus = ({ count, setCount }) => {
    return (
        <div className=' d-flex  align-items-center justify-content-end'>

            <button className='btn btn-danger py-1 rounded-0'

                onClick={e => {
                    if (count > 0)
                        setCount(prev => --prev)

                    else {
                        setCount(0)
                    }
                }}>
                -</button>
            <div className=' overflow-hidden py-1 border px-2' style={{ width: "60px" }}>

                <input value={count} min={0} onChange={e => {
                    setCount(Number(e.target.value) >= 0 ? e.target.value : 0)
                }
                } type="number" className=' w-100 bg-transparent text-inherit' />
            </div>
            <button
                onClick={e => {

                    setCount(prev => ++prev)

                }}
                className='btn btn-success py-1 rounded-0'>+</button>

        </div>

    )
}

export default BtnPlusMinus
