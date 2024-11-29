import React, { useContext, useEffect, useState } from 'react'
import { Axios } from '../../../API/Axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { MyContext } from '../../../Context/MyState'

const ProfileDashboard = () => {
    const [form, setForm] = useState({ oldPass: "", newPass: "" })

    const [CardCahngePassword, setCardCahngePassword] = useState()
    const [showOldPass, setShowOldPass] = useState(false)
    const [showNewPass, setShowNewPass] = useState(false)
    const { darkMode, CurrentUser, GetCurrentUser } = useContext(MyContext)
    const [errorMes, setErrMess] = useState()
    useEffect(() => {
        GetCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    async function changePass(e) {
        e.preventDefault()

        try {
            const res = await Axios.post(`/CahngePass`, {
                oldPass: form.oldPass,
                newPass: form.newPass,
            })


            if (res.status === 200) {

                Swal.fire({

                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: res.data.message,
                    background: darkMode ? "#333" : "#fff",
                    color: !darkMode ? "#333" : "#fff",
                })
                setErrMess("")
                setCardCahngePassword(false)
            }

        } catch (e) {

            if (e.status === 404) {
                setErrMess(e.response.data.message)
            }
        }

    }

    return (
        <div className='bg-card p-3 rounded-2'>
            <div className="text-inherit">
                <h1>Profile</h1>
            </div>
            <hr />
            <div className=''>

                <h4>Welcom <span className='text-info text-capitalize'>{CurrentUser?.name}</span>                </h4>
                <p>     Email:    {CurrentUser?.email}</p>

                <p>Your Role is : <span className='text-success'>{CurrentUser?.role === "1990" ? "Admin" : "Product Manger"}</span>
                </p>
                <div className='mb-4'>


                    <Link to="/saved" className='btn btn-secondary  fst-italic'>Saved Item</Link>
                </div>
                 <div>

                    Edit Your Info
                </div>

                <div className='d-flex gap-3 flex-wrap'>
                    <Link to={`/dashboard/users/${CurrentUser?.id}`} className='btn btn-info'>Edit</Link>

                    <button onClick={_ => setCardCahngePassword(true)} className='btn btn-primary'>Cahnge Your Password</button>
                </div>

                {
                    CardCahngePassword && (
                        <div className='mt-4'>
                            <h5>Cahnge Your Password</h5>
                            <form action="" className='inputForm col-12 col-md-5 mt-4' onSubmit={changePass}>

                                <div className='mb-4'>
                                    <div className="inputgroup position-relative m-1">
                                        <input type={showOldPass ? "text" : "password"} name='old' placeholder='Old Password ...' minLength={6} required value={form.oldPass} onChange={e => setForm({ ...form, oldPass: e.target.value })} />
                                        <div onClick={e => setShowOldPass(!showOldPass)} className='position-absolute end-0 top-50-center px-2'>
                                            <FontAwesomeIcon icon={showOldPass ? faEye : faEyeSlash} />

                                        </div>

                                    </div>
                                    {errorMes && <p className='m-0 mx-2 text-danger'>{errorMes}</p>
                                    }                                </div>

                                <div className="inputgroup position-relative">
                                    <input type={showNewPass ? "text" : "password"} name='new' placeholder='New Password ...' minLength={6} required value={form.newPass} onChange={e => setForm({ ...form, newPass: e.target.value })} />

                                    <div onClick={e => setShowNewPass(!showNewPass)} className='position-absolute end-0 top-50-center px-2'>
                                        <FontAwesomeIcon icon={showNewPass ? faEye : faEyeSlash} />

                                    </div> </div>
                                <div className='col-4'>

                                    <button type="submit" className='btn btn-info mt-3 px-4 fs-5 w-100'>Submit</button>
                                </div>

                            </form>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default ProfileDashboard
