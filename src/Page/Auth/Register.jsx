import React, { useState } from 'react'
import Header from '../../Components/WebSite/Header/Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ARegister, BaseURL } from '../../API/API'
import Cookies from 'universal-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Auth.css'

const Register = () => {
    const cookie = new Cookies()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [err, setErr] = useState("")
    const Navigate = useNavigate()

    const handleOnchange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr("")

        // Client-side validation
        if (form.password !== form.confirmPassword) {
            setErr("Passwords do not match!")
            return
        }

        setLoading(true)
        try {
            // Send only required data to backend
            const { confirmPassword, ...registerData } = form
            const res = await axios.post(`${BaseURL}/${ARegister}`, registerData)

            const token = res.data.token
            cookie.set("ecommerce_jivara", token);
            if (res?.data.status === 200) {
                Navigate("/")
            }
        } catch (e) {
            if (e?.response?.data?.message)
                setErr(e?.response?.data?.message)
            else
                setErr("Registration failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='auth-page'>
            <Header />
            <div className='auth-container reveal-anim'>
                <div className='auth-card'>
                    <div className='auth-visual' style={{ backgroundImage: "linear-gradient(rgba(56, 182, 255, 0.8), rgba(14, 165, 233, 0.8)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')" }}>
                        <h2>Join Us!</h2>
                        <p>Create an account to start shopping, save your favorites, and get exclusive offers tailored just for you.</p>
                        <div className="mt-4">
                            <ul className="list-unstyled">
                                <li className="mb-2"><small>✓ Early access to sales</small></li>
                                <li className="mb-2"><small>✓ Personalized recommendations</small></li>
                                <li><small>✓ Fast checkout experience</small></li>
                            </ul>
                        </div>
                    </div>

                    <div className='auth-form-section'>
                        <div className='auth-header'>
                            <h1>Create Account</h1>
                            <p>Fill in the details to get started</p>
                        </div>

                        {err && <div className='error-message'>{err}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Full Name</label>
                                <div className='auth-input-wrapper'>
                                    <FontAwesomeIcon icon={faUser} className='icon' />
                                    <input
                                        className='auth-input'
                                        type="text"
                                        required
                                        name='name'
                                        placeholder='John Doe'
                                        value={form.name}
                                        onChange={handleOnchange}
                                    />
                                </div>
                            </div>

                            <div className='form-group'>
                                <label>Email Address</label>
                                <div className='auth-input-wrapper'>
                                    <FontAwesomeIcon icon={faEnvelope} className='icon' />
                                    <input
                                        className='auth-input'
                                        type="email"
                                        required
                                        name='email'
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
                                        className='auth-input'
                                        type={showPassword ? "text" : "password"}
                                        required
                                        minLength={6}
                                        name='password'
                                        placeholder='••••••••'
                                        value={form.password}
                                        onChange={handleOnchange}
                                    />
                                    <div onClick={() => setShowPassword(!showPassword)} className='position-absolute end-0 top-50 translate-middle-y me-3 pointer text-muted'>
                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                    </div>
                                </div>
                            </div>

                            <div className='form-group'>
                                <label>Confirm Password</label>
                                <div className='auth-input-wrapper'>
                                    <FontAwesomeIcon icon={faLock} className='icon' />
                                    <input
                                        className='auth-input'
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        minLength={6}
                                        name='confirmPassword'
                                        placeholder='••••••••'
                                        value={form.confirmPassword}
                                        onChange={handleOnchange}
                                    />
                                    <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='position-absolute end-0 top-50 translate-middle-y me-3 pointer text-muted'>
                                        <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className='auth-btn' disabled={loading}>
                                {loading ? (
                                    <span>Creating Account...</span>
                                ) : (
                                    <>
                                        Sign Up
                                        <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className='auth-footer'>
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
