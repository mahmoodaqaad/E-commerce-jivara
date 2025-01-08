import React, { useContext, useState } from 'react'
import Header from '../../Components/WebSite/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ALogin, BaseURL } from '../../API/API'
import Cookies from 'universal-cookie'
import { MyContext } from '../../Context/MyState'
import { useEffect } from 'react'
const Login = () => {
    const cookie = new Cookies()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const { GetAllUsers, users } = useContext(MyContext);

    useEffect(() => {
        GetAllUsers()
    }
        , [])
    console.log((users));
    const { CurrentUser, GetCurrentUser } = useContext(MyContext);

    useEffect(() => {
        GetCurrentUser()
    }
        , [])
    console.log((CurrentUser));

    const [err, setErr] = useState("")
    const Navigate = useNavigate()
    const handleOnchange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${BaseURL}/${ALogin}`, form)
console.log(res);

            const token = res.data.token
            cookie.set("ecommerce_jivara", token);

            // if (res.status === 200) {
            //     if (res?.data?.data[0]?.role === "1990") {
            //         Navigate("/dashboard")

            //     }
            //     else {
            //         Navigate("/")

            //     }
            // }


        } catch (e) {
            setErr(e?.response?.data?.message)

        }
    }
    return (
        <div className='vh-100'>
            <Header />
            <div className='   d-flex justify-content-center align-items-center'>
                <div className='form shadow p-4 text-center mt-5'>
                    <div><h1 className='text-primary'>Welcom Again</h1></div>
                    <form onSubmit={handleSubmit}>
                        <div className='inputForm shadow-sm'>
                            <div className='inputIcon '>

                                <FontAwesomeIcon fontSize={"20px"} icon={faUser} />
                            </div>

                            <input type="email" required name='email' placeholder='Email...' value={form.email} onChange={handleOnchange} />
                        </div>
                        <div className='inputForm shadow-sm'>
                            <div className='inputIcon '>

                                <FontAwesomeIcon fontSize={"20px"} icon={faLock} />
                            </div>

                            <input type="password" required minLength={6} name='password' placeholder='Password...' value={form.password} onChange={handleOnchange} />
                        </div>
                        <button type="submit" className='btn btn-success fs-4 px-4 mt-4'>Login</button>
                        {err && <p className='text-start mt-4 text-danger'>{err}</p>}
                        <p className='text-start mt-4'>Do You not have Acount <Link to={"/register"}>Sign Up</Link></p>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login
