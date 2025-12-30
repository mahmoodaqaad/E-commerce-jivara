import React, { useContext, useEffect, useState } from 'react'
import { Axios } from '../../../API/Axios'
import { ACategories, AProduct } from '../../../API/API'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../../Context/MyState'
import axios from 'axios'
import Loading from '../../../Components/loading/Loading'

const Addproduct = () => {
    const [form, setForm] = useState({
        title: "",
        price: 0,
        discrption: "",
        category: null,
        stok: 0
    })
    const [images, setImages] = useState([])

    const [catygoreis, setcatygoreis] = useState([])
    const Navigate = useNavigate()
    const { darkMode } = useContext(MyContext);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        Axios.get(`/${ACategories}`).then(res => setcatygoreis(res.data.data)
        )
    }, [])
    // images 
    const handleCahngeImg = (e) => {

        setImages(prev => [...prev, ...e.target.files])
    }

    // data  
    const handleCahnge = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    // submit 

    // async function x(e) {
    //     e.preventDefault()

    //     try {
    //         const formdata = new FormData()

    //         formdata.append("form", JSON.stringify(form))

    //         for (let i = 0; i < images.length; i++) {

    //             formdata.append("images", images[i])
    //         }


    //         const res = await Axios.post(`/${AProduct}/add`, formdata)
    //         if (res.status === 200) {
    //             Navigate("/dashboard/products")

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const uplpadProductImgs = []
            const uploadPromises = images.map(async (image) => {

                const dataForm = new FormData()
                dataForm.append("file", image)
                dataForm.append("upload_preset", "e-commerce_j")

                dataForm.append("cloud_name", "ddoj9gsda")

                const res = await axios.post(`https://api.cloudinary.com/v1_1/ddoj9gsda/image/upload`, dataForm);

                return res.data.secure_url;
            })
            const urls = await Promise.all(uploadPromises)

            uplpadProductImgs.push(...urls)

            const res = await Axios.post(`/${AProduct}/add`, { form, images: uplpadProductImgs })
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

        } catch (error) {
            // console.log(error);

        }
        finally {
            setLoading(false)

        }


    }

    // delete img 
    function handleDelteImg(img) {

        const newImage = images.filter(item => item !== img)

        setImages(newImage)
    }
    //  show img 
    const ShowNewImage = images?.map(img => (
        <div key={img} className=" border rounded-1 mb-2 p-2">

            <div className="d-flex align-items-center justify-content-between gap-4">
                <div className="d-flex align-items-center justify-content-start gap-4">
                    <img width={"80px"} height={"80px"} loading='lazy' style={{ objectFit: "cover" }} src={URL.createObjectURL(img)} alt="" />
                    <div>
                        <p className='m-0'>{img.name}</p>
                        <p className="m-0">
                            {Number(img.size / 1024).toFixed(1) > 1000
                                ? Number((img.size / 1024) / 1024).toFixed(1) + " MB"
                                : Number(img.size / 1024).toFixed(1) + " KB"}
                        </p>

                    </div>
                </div>
                <button className="btn btn-danger"
                    onClick={e => handleDelteImg(img)}
                >Delete</button>
            </div>

        </div>
    ))

    // show chaty 

    const showCate = catygoreis?.map(item => <option key={item.id} value={item.id}>{item.name}</option>)



    return (
        <div className=' col-12 col-md-6 bg-card p-3 m-auto text-center'>

            <div className="text-inherit">
                <h1>Add Product</h1>

            </div>

            <div className='mt-4'>
                <form className="inputForm" onSubmit={handleSubmit}>
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
                    <select name="category" className="w-100" onChange={handleCahnge}>
                        <option value="">Select Category</option>
                        {showCate}

                    </select>
                    <div className="inputgroup w-100">
                        <label htmlFor="img" className="btn btn-success">
                            Choose Image
                        </label>
                        <input type="file" id="img" hidden multiple onChange={handleCahngeImg} />
                    </div>
                    <button type="submit" disabled={(form.title === "" || form.price === 0 || form.category === null || form.discrption === "" || !images.length || loading) ? true : false} className="btn btn-info mt-3 px-4 fs-5">
                        {loading ? "loading ..." : "Submit"}
                    </button>
                </form>


            </div>
            {loading && <Loading />}

            {images.length > 0 && (
                <div className='col-8 mx-auto mt-4'>
                    <h1>Images</h1>
                    <hr />
                    {ShowNewImage}
                </div>
            )}
        </div>
    )
}

export default Addproduct
