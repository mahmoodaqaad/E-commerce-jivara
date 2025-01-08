import React from 'react'
import { Table } from 'react-bootstrap'
import { CahnnelTable } from '../../../Data/CahnnelTable'

const TopChannel = ({ mode }) => {


    const header = [
        { name: "Source" },
        { name: "Visitors" },
        { name: "Revenues" },
        { name: "Sales" },
        { name: "Conversion" },
    ]


    const colorTR = { color: mode ? "white" : "#000" }


    return (
        <div className={` rounded px-4 overflow-auto bg-card ${!mode && "shodow"}`} >
            <h3 className='pt-3 '>Top Channel</h3>
            <Table className='table-show mt-4 rounded' striped hover >
                <thead>
                    <tr>
                        {header.map((head, key) => (
                            <th key={key} className='py-3 ' style={{ color: "white", width: head.name === "Source" && "150px", background: "rgb(49 61 74) " }}>{head.name}</th>
                        ))}
                    </tr>
                </thead>


                <tbody>

                    {CahnnelTable.map((item, key) => (
                        <tr key={key}>
                            <td className='py-5' style={colorTR}>
                                <div className='d-flex gap-2 align-items-center'>

                                    <img src={item.Source} className='img-rounded me-3' alt="" />
                                    {item.brand}
                                </div>
                            </td >
                            <td className='py-4' style={colorTR}>{item.Visitors}</td>
                            <td className='py-4 text-success-alt' style={colorTR}>{item.Revenues}                  </td>
                            <td className='py-4 ' style={colorTR}>{item.Sales}                    </td>
                            <td className='py-4 text-filed-alt' style={colorTR}>{item.Conversion}                      </td>
                        </tr>))}


                </tbody>
            </Table>
        </div >
    )
}

export default TopChannel




