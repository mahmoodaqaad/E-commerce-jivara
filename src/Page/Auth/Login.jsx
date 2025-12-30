import React, { useState } from 'react'
import Header from '../../Components/WebSite/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ALogin, BaseURL } from '../../API/API'
import Cookies from 'universal-cookie'

const Login = () => {
    const cookie = new Cookies()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)


    const [err, setErr] = useState("")
    const Navigate = useNavigate()
    const handleOnchange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${BaseURL}/${ALogin}`, form)

            const token = res.data.token
            cookie.set("ecommerce_jivara", token);

            if (res.status === 200) {
                if (res?.data?.data[0]?.role === "1990") {
                    Navigate("/dashboard")
                    window.location.pathname = "/dashboard"

                }
                else {
                    Navigate("/")
                    window.location.pathname = "/"
                }
            }


        } catch (e) {

            if (e?.response?.data?.message)
                setErr(e?.response?.data?.message)

        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='vh-100'>
            <Header />
            <div className='mt-3    d-flex justify-content-center align-items-center'>
                <div className='form shadow p-4 text-center mt-5 '>
                    <div><h1 className='text-primary'>Welcom Again</h1></div>
                    <form onSubmit={handleSubmit}>
                        <div className='inputForm border'>
                            <div className='inputIcon border-end p-1'>

                                <FontAwesomeIcon fontSize={"20px"} icon={faUser} />
                            </div>

                            <input type="email" required name='email' className='bg-transparent  p-2 text-inh' placeholder='Email...' value={form.email} onChange={handleOnchange} />
                        </div>
                        <div className='inputForm border'>
                            <div className='inputIcon border-end p-1'>

                                <FontAwesomeIcon fontSize={"20px"} icon={faLock} />
                            </div>

                            <input type="password" required minLength={6} className='bg-transparent  p-2 text-inh' name='password' placeholder='Password...' value={form.password} onChange={handleOnchange} />
                        </div>
                        <button type="submit" className='btn btn-success fs-4 px-4 mt-4' disabled={loading}>{loading ? "Loging ..." : "Login"}</button>
                        {err && <p className='text-start mt-4 text-danger'>{err}</p>}
                        <p className='text-start mt-4'>Do You not have Acount <Link to={"/register"}>Sign Up</Link></p>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login
