import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { MyContext } from '../../../Context/MyState'
import { ACategory, BaseURL } from '../../../API/API'
import Loading from '../../../Components/loading/Loading'
import { Axios } from '../../../API/Axios'
const EditCategory = () => {
    const [name, setName] = useState()
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)

    const Navigate = useNavigate()
    const { id } = useParams()
    const { darkMode } = useContext(MyContext);

    const [sentloading, setSentLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        Axios.get(`/${ACategory}/${id}`).then(res => {
            setName(res.data.data[0].name)
        }).catch(e => {
            Navigate("/dashboard/404")

            // console.log(e)
        }
        ).finally(() => setLoading(false))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const handleEdit = async (e) => {
        e.preventDefault()
        setSentLoading(true)
        try {
            const form = new FormData()
            form.append("name", name)
            form.append("image", image)

            const res = await Axios.post(`/${ACategory}/edit/${id}`, form)

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
        } catch (e) {
            // console.log(e);

        } finally {


            setSentLoading(false)

        }

    }



    return (<>
        {loading && <Loading />}

        <div className=' col-12 col-md-6 bg-card p-3 m-auto text-center'>



            <div className="text-inherit">
                <h1>Edit Category</h1>

            </div>

            <div className='mt-4'>

                <form className='inputForm' onSubmit={handleEdit}>
                    <div className="inputgroup">
                        <input type="text" name='name' placeholder='Name ...' onChange={e => setName(e.target.value)} value={name} />
                    </div>
                    <div className="inputgroup ">
                        <label htmlFor="img" className="btn btn-success">
                            Choose Image
                        </label>
                        <input type="file" id="img" hidden onChange={e => setImage(e.target.files[0])} />
                    </div>



                    <button type="submit" disabled={loading} className='btn btn-info mt-3 px-4 fs-5 col-4'>{sentloading ? "loading ..." : "Edit"}</button>
                </form>
                {sentloading && <Loading />}

                {
                    // formServer ?
                    //     <div className="  rounded-1 mb-2 p-2 w-100 mt-5">

                    //         <div className="d-flex align-items-center justify-content-center gap-4 position-relative">

                    //             <div >
                    //                 <img width={"140px"} loading='lazy' src={image} alt="" />

                    //             </div>

                    //         </div>
                    //     </div>
                    //     :

                    image &&

                    <div className=" p-2 d-flex gap-3 align-items-center mt-5">
                        <img src={URL.createObjectURL(image)} alt="" width={"140px"} />
                        <div>
                            <p className="m-0">{image.name}</p>
                            <p className="m-0">
                                {Number(image.size / 1024).toFixed(1) > 1000
                                    ? Number((image.size / 1024) / 1024).toFixed(1) + " MB"
                                    : Number(image.size / 1024).toFixed(1) + " KB"}
                            </p>
                        </div>
                    </div>}
            </div>
        </div >
    </>

    )
}

export default EditCategory
