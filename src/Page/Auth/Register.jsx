import React, { useState } from 'react'
import Header from '../../Components/WebSite/Header/Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ARegister, BaseURL } from '../../API/API'
import Cookies from 'universal-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faMailBulk, faUser } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
    const cookie = new Cookies()
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [err, setErr] = useState("")

    const Navigate = useNavigate()
    const handleOnchange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${BaseURL}/${ARegister}`, form)

            const token = res.data.token
            cookie.set("ecommerce_jivara", token);
            if (res?.data.status === 200) {

                Navigate("/")
            }


        } catch (e) {
            setErr(e?.response?.data?.message)


        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='vh-100'>
            <Header />
            <div className='  d-flex justify-content-center align-items-center'>
                <div className='form shadow p-4 text-center mt-5'>
                    <div><h1 className='text-primary'>Welcom </h1></div>
                    <form onSubmit={handleSubmit}>
                        <div className='inputForm border'>
                            <div className='inputIcon border-end p-1'>

                                <FontAwesomeIcon fontSize={"20px"} icon={faUser} />
                            </div>
                            <input className='bg-transparent p-2 text-inh' type="name" required name='name' placeholder='Name...' value={form.name} onChange={handleOnchange} />
                        </div>
                        <div className='inputForm  border'>

                            <div className='inputIcon border-end p-1'>

                                <FontAwesomeIcon fontSize={"20px"} icon={faMailBulk} />
                            </div>
                            <input className='bg-transparent p-2 text-inh' type="email" required name='email' placeholder='Email...' value={form.email} onChange={handleOnchange} />
                        </div>
                        <div className='inputForm border '>
                            <div className='inputIcon border-end p-1'>

                                <FontAwesomeIcon fontSize={"20px"} icon={faLock} />
                            </div>
                            <input className='bg-transparent p-2 text-inh' type="password" required minLength={6} name='password' placeholder='Password...' value={form.password} onChange={handleOnchange} />
                        </div>
                        <button type="submit" className='btn btn-success fs-4 px-4 mt-4' disabled={loading}>{loading ? "Registering..." : "Register"}</button>
                        {err && <p className='text-start mt-4 text-danger'>{err}</p>}
                        <p className='text-start mt-4'>Do You have Acount <Link to={"/login"}>Login</Link></p>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register
