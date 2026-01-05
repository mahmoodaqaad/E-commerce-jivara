import React, { useState } from 'react'
import Header from '../../Components/WebSite/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ALogin, BaseURL } from '../../API/API'
import Cookies from 'universal-cookie'
import './Auth.css'

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
        setErr("")
        try {
            const res = await axios.post(`${BaseURL}/${ALogin}`, form)
            const token = res.data.token
            cookie.set("ecommerce_jivara", token);

            if (res.status === 200) {
                if (res?.data?.data[0]?.role === "1990") {
                    Navigate("/dashboard")
                    window.location.pathname = "/dashboard"
                } else {
                    Navigate("/")
                    window.location.pathname = "/"
                }
            }
        } catch (e) {
            if (e?.response?.data?.message)
                setErr(e?.response?.data?.message)
            else
                setErr("Connection error. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='auth-page'>
            <Header />
            <div className='auth-container reveal-anim'>
                <div className='auth-card'>
                    <div className='auth-visual'>
                        <h2>Welcome Back!</h2>
                        <p>Login to access your personalized dashboard, track orders, and experience the best of Jivara E-commerce.</p>
                        <div className="mt-4">
                            <span className="badge bg-light text-primary p-2 px-3 rounded-pill fw-bold">Secure Login</span>
                        </div>
                    </div>

                    <div className='auth-form-section'>
                        <div className='auth-header'>
                            <h1>Sign In</h1>
                            <p>Enter your credentials to continue</p>
                        </div>

                        {err && <div className='error-message'>{err}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Email Address</label>
                                <div className='auth-input-wrapper'>
                                    <FontAwesomeIcon icon={faEnvelope} className='icon' />
                                    <input
                                        type="email"
                                        required
                                        name='email'
                                        className='auth-input'
                                        placeholder='name@example.com'
                                        value={form.email}
                                        onChange={handleOnchange}
                                    />
                                </div>
                            </div>

                            <div className='form-group'>
                                <label>Password</label>
                                <div className='auth-input-wrapper'>
                                    <FontAwesomeIcon icon={faLock} className='icon' />
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        className='auth-input'
                                        name='password'
                                        placeholder='••••••••'
                                        value={form.password}
                                        onChange={handleOnchange}
                                    />
                                </div>
                                <Link to="#" className='forgot-password'>Forgot Password?</Link>
                            </div>

                            <button type="submit" className='auth-btn' disabled={loading}>
                                {loading ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                        Sign In
                                        <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className='auth-footer'>
                            Don't have an account? <Link to="/register">Create Account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
