import React, { useContext, useState } from 'react'


import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MyContext } from '../../../Context/MyState'
import { ACategory } from '../../../API/API'
import { Axios } from '../../../API/Axios'
import Loading from '../../../Components/loading/Loading'
const AddCategory = () => {
    const [name, setName] = useState()
    const [image, setImage] = useState()

    const Navigate = useNavigate()
    const { darkMode } = useContext(MyContext);
    const [loading, setLoading] = useState(false)




    // const x = async (e) => {
    //     e.preventDefault()
    //     if (!image || !name) {
    //         return Swal.fire({

    //             icon: "warning",
    //             confirmButtonColor: "#3085d6",
    //             confirmButtonText: "All Fileds are required",
    //             background: darkMode ? "#333" : "#fff",
    //             color: !darkMode ? "#333" : "#fff",
    //         })
    //     }
    //     try {
    //         const form = new FormData()
    //         form.append("name", name)
    //         form.append("image", image)

    //         const res = await Axios.post(`/${ACategory}/add`, form)

    //         if (res.status === 200) {
    //             Navigate("/dashboard/categories")

    //             Swal.fire({

    //                 icon: "success",
    //                 confirmButtonColor: "#3085d6",
    //                 confirmButtonText: res.data.message,
    //                 background: darkMode ? "#333" : "#fff",
    //                 color: !darkMode ? "#333" : "#fff",
    //             })
    //         }
    //     } catch (e) {
    //         console.log(e);

    //     }

    // }

    const handleAddCategory = async (e) => {

        e.preventDefault()
        setLoading(true)
        try {

            const formdata = new FormData()

            formdata.append("file", image)
            formdata.append("upload_preset", "snoper-chat");
            formdata.append("cloud_name", "ddoj9gsda");
            const resImage = await axios.post(`https://api.cloudinary.com/v1_1/ddoj9gsda/image/upload`, formdata);
            const imageUrl = resImage.data.secure_url
            const res = await Axios.post(`/${ACategory}/add`, { name, image: imageUrl })
            if (res.status === 200) {
                Navigate("/dashboard/categories")

                Swal.fire({

                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: res.data.message,
                    background: darkMode ? "#333" : "#fff",
                    color: !darkMode ? "#333" : "#fff",
                })
            }

        } catch (error) {
            // console.log(error);

        } finally {
            setLoading(false)
        }
    }


    return (

        <div className=' col-12 col-md-6 bg-card p-3 m-auto text-center'>



            <div className="text-inherit">
                <h1>Add Category</h1>

            </div>

            <div className='mt-4'>

                <form className='inputForm' onSubmit={handleAddCategory}>
                    <div className="inputgroup">
                        <input type="text" name='name' placeholder='Name ...' onChange={e => setName(e.target.value)} value={name} />
                    </div>
                    <div className="inputgroup ">
                        <label htmlFor="img" className="btn btn-success">
                            Choose Image
                        </label>
                        <input type="file" id="img" hidden onChange={e => setImage(e.target.files[0])} />
                    </div>
                    {image && <div className=" p-2 d-flex gap-3 align-items-center ">
                        <img src={URL.createObjectURL(image)} alt="" width={"140px"} />
                        <div>
                            <p className="m-0">{image.name}</p>
                            <p className="m-0">
                                {Number(image.size / 1024).toFixed(1) > 1000
                                    ? Number((image.size / 1024) / 1024).toFixed(1) + " MB"
                                    : Number(image.size / 1024).toFixed(1) + " KB"}
                            </p>
                        </div>                    </div>}
                    <button type="submit" disabled={!image || !name || loading ? true : false} className='btn btn-info mt-3 px-4 fs-5 col-4'>{loading ? "loading ..." : "Submit"}</button>
                </form>
            </div>
            {loading && <Loading />}
        </div >

    )
}

export default AddCategory
