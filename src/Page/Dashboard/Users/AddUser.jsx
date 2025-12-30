import React, { useContext, useState } from 'react'
import { AUser } from '../../../API/API'
import { Axios } from '../../../API/Axios'


import Swal from 'sweetalert2'

import { MyContext } from '../../../Context/MyState'
import { useNavigate } from 'react-router-dom'
const AddUser = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",

    })


    const Navigate = useNavigate()

    const context = useContext(MyContext);
    const { darkMode } = context;
    const [err, setErr] = useState("")

    const handleCahnge = (e) => setForm({ ...form, [e.target.name]: e.target.value })


    const handleAddUser = async (e) => {
        e.preventDefault()
        const { email, role, password, name } = form
        if (!email || !role || !password || !name) {
            return Swal.fire({

                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "All Fileds are required",
                background: darkMode ? "#333" : "#fff",
                color: !darkMode ? "#333" : "#fff",
            })
        }
        try {

            const res = await Axios.post(`/${AUser}/add`, form)

            if (res.data.status === 200) {
                Navigate("/dashboard/users")

                Swal.fire({

                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: res.data.message,
                    background: darkMode ? "#333" : "#fff",
                    color: !darkMode ? "#333" : "#fff",
                })
            }
        } catch (e) {
            if (e?.response?.data?.message)
                setErr(e.response.data.message);

        }

    }
    return (
        <div className=' col-12 col-md-6 bg-card p-3 m-auto text-center'>

            <div className="text-inherit ">
                <h1>Add User</h1>

            </div>

            <div className='mt-4'>

                <form className='inputForm ' onSubmit={handleAddUser}>
                    <div className="inputgroup">
                        <input type="text" name='name' placeholder='Name ...' onChange={handleCahnge} value={form.name} />
                    </div>
                    <div>

                        <div className={`inputgroup ${err && "border-danger"}`}>
                            <input type="email" name='email' placeholder='Email ...' onChange={handleCahnge} value={form.email} />
                        </div>

                    </div   >
                    <div className="inputgroup">
                        <input type="passowrd" name='password' placeholder='Password ...' onChange={handleCahnge} value={form.password} />
                    </div>

                    <select onChange={handleCahnge} name='role' value={form.role}  >
                        <option value="">Select User</option>
                        <option value="1990">Admin</option>
                        <option value="1995">Product Manger</option>
                        <option value="2000">user</option>
                    </select>

                    <button type="submit"
                        disabled={!form.email || !form.role || !form.password || !form.name ? true : false}
                        className='btn btn-info mt-3 px-4 fs-5 col-4'>Submit</button>
                    {
                        err && <p className='text-start mt-4 fs-5 text-danger '>{err}</p>
                    }
                </form>
            </div >
        </div >

    )
}

export default AddUser
