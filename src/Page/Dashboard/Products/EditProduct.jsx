import React, { useContext, useEffect, useState } from 'react'
import { Axios } from '../../../API/Axios'
import { AProduct, BaseURL } from '../../../API/API'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../../Components/loading/Loading'
import Swal from 'sweetalert2'
import { MyContext } from '../../../Context/MyState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const EditProduct = () => {
    const [form, setForm] = useState({
        title: "",
        price: 0,
        discrption: "",
        category: "",
        stok: 0
    })
    const [images, setImages] = useState([])
    const Navigate = useNavigate()
    const [imageFormServer, setImageFormServer] = useState([])
    const [loading, setLoading] = useState()
    const [sentloading, setSentLoading] = useState(false)

    const { id } = useParams()

    const [catygoreis, setcatygoreis] = useState([])
    const { darkMode } = useContext(MyContext);


    useEffect(() => {
        setLoading(true)
        // get product 
        Axios.get(`/${AProduct}/${id}`).then(res => {


            setForm({
                title: res.data.data[0].title,
                price: res.data.data[0].price,
                discrption: res.data.data[0].discrption,
                category: res.data.data[0].category_id,
                stok: res.data.data[0].stok,
            })

            setImageFormServer(JSON.parse(res?.data?.data[0]?.images));
        }

        ).catch(e => {
            Navigate("/dashboard/404")

        })
        // get catygoreis 
        axios.get(`${BaseURL}/categories`).then(res =>
            setcatygoreis(res.data.data)
        ).catch(e => {
            // console.log(e);
        }
        ).finally(() => {
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showCate = catygoreis.map(item => <option key={item.id} value={item.id}>{item.name}</option>)



    const handleCahnge = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })
    }




    async function handleEdit(e) {
        e.preventDefault()

        if (form.title === "" || form.price === 0 || form.category === "" || form.discrption === "") {
            return Swal.fire({

                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "All Fileds are required",
                background: darkMode ? "#333" : "#fff",
                color: !darkMode ? "#333" : "#fff",
            })

        }
        setSentLoading(true)

        try {
            const formdata = new FormData()

            formdata.append("form", JSON.stringify(form))
            if (images.length > 0) {

                for (let i = 0; i < images.length; i++) {

                    formdata.append("images", images[i])
                }
            }




            const res = await Axios.post(`/${AProduct}/edit/${id}`, formdata)

            if (res.status === 200) {
                Navigate("/dashboard/products")

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





    const ShowNewImage = images?.map((img, key) => (
        <div key={key} className=" border rounded-1 mb-2 p-2">

            <div className="row align-items-center justify-content-between gap-4">
                <div className='col-12 col-md-7'>

                    <div className="row align-items-center g-3 justify-content-between">
                        <div className='col-12 col-md-2'>

                            <img width={"80px"} height={"80px"} loading='lazy' style={{ objectFit: "cover" }} src={URL.createObjectURL(img)} alt="" />
                        </div>

                        <div className='col-12 col-md-8 ms-md-4'>
                            <p className='m-0'>{img.name}</p>
                            <p className="m-0">
                                {Number(img.size / 1024).toFixed(1) > 1000
                                    ? Number((img.size / 1024) / 1024).toFixed(1) + " MB"
                                    : Number(img.size / 1024).toFixed(1) + " KB"}
                            </p>

                        </div>
                    </div>
                </div>


                <div className='col-12 col-md-3'>
                    <button className="btn btn-danger"
                        onClick={e => setImages(prev => prev.filter(item => item !== img))}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>

        </div>
    ))




    // server 

    async function handleDeleteImgFormServer(fullimage) {


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
        }).then(async (result) => {
            if (result.isConfirmed) {


                const image = fullimage.replace(`${BaseURL}/product/`, "")

                try {
                    const res = await axios.post(`${BaseURL}/product/delete-img/${id}`, { fullimage, image })
                    if (res.status === 200) {
                        setImageFormServer(prev => prev.filter(item => item !== fullimage))
                    }

                } catch (e) {
                    // console.log(e);
                }

            }
        })
    }


    const showImageInServer = imageFormServer?.map((img, key) => (

        <div key={key} className=" border rounded-1 mb-2 p-2 w-100">

            <div className="d-flex align-items-center justify-content-between gap-4 position-relative">

                <div>
                    <img width={"80px"} loading='lazy' src={img} alt="" />

                </div>
                <div className='btn btn-danger'
                    onClick={e => handleDeleteImgFormServer(img)}                >
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            </div>
        </div>))


    return (

        <>{loading && <Loading />}
            <div className=' col-12 col-md-6 bg-card p-3 m-auto text-center'>

                <div className="text-inherit">
                    <h1>Edit Product</h1>

                </div>

                <div className='mt-4'>
                    <form className="inputForm" onSubmit={handleEdit}>
                        <div className="inputgroup w-100">
                            <input type="text" name="title" required placeholder='title' value={form.title} onChange={handleCahnge} />
                        </div>
                        <div className="inputgroup w-100">
                            <input type="number" name="price" placeholder="Price..." value={form.price} onChange={handleCahnge} />
                        </div>
                        <div className="inputgroup w-100">
                            <input type="number" name="stok" placeholder="Count..." value={form.stok} onChange={handleCahnge} />
                        </div>
                        <div className="inputgroup w-100">
                            <input type="text" name="discrption" placeholder="Description..." value={form.discrption} onChange={handleCahnge} />
                        </div>
                        <select name="category" className="w-100" value={form.category} onChange={handleCahnge}>
                            <option value={""}>Select Category</option>
                            {showCate}

                        </select>
                        <div className="inputgroup w-100">
                            <label htmlFor="img" className="btn btn-success">
                                Choose Image
                            </label>
                            <input type="file" id="img" hidden multiple onChange={e => setImages(prev => [...prev, ...e.target.files])} />
                        </div>
                        <button type="submit"
                            disabled={form.title === "" || form.price === 0 || form.category === "" || form.discrption === "" || loading ? true : false}
                            className="btn btn-info mt-3 px-4 fs-5">
                            {sentloading ? "loading ..." : "Edit"}                        </button>
                    </form>
                </div>
                {sentloading && <Loading />}

                {images.length > 0 && (
                    <div className='col-8 mx-auto mt-4'>
                        <h1>new Images</h1>
                        <hr />
                        {ShowNewImage}
                    </div>
                )}

                <hr />
                {imageFormServer && (
                    <div className='col-8 mx-auto mt-4'>
                        <h1>oldImages</h1>
                        <hr />
                        {showImageInServer}
                    </div>
                )}
            </div>
        </>
    )
}

export default EditProduct
