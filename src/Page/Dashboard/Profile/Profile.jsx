import React, { useContext, useEffect, useState } from 'react'
import { Axios } from '../../../API/Axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faEnvelope,
    faShieldAlt,
    faHistory,
    faHeart,
    faLock,
    faSave,
    faEye,
    faEyeSlash,
    faPen
} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { MyContext } from '../../../Context/MyState'
import { AUser } from '../../../API/API'
import '../../WebSite/Profile/Profile.css'

const ProfileDashboard = () => {
    const { darkMode, CurrentUser, GetCurrentUser, SavedProducts, getAllSavedProducts } = useContext(MyContext)

    const [infoForm, setInfoForm] = useState({ name: "", email: "" })
    const [passForm, setPassForm] = useState({ oldPass: "", newPass: "" })
    const [showOldPass, setShowOldPass] = useState(false)
    const [showNewPass, setShowNewPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [passLoading, setPassLoading] = useState(false)
    const [errorMes, setErrMess] = useState("")

    useEffect(() => {
        GetCurrentUser()
        getAllSavedProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (CurrentUser) {
            setInfoForm({
                name: CurrentUser.name || "",
                email: CurrentUser.email || ""
            })
        }
    }, [CurrentUser])

    const handleInfoSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await Axios.put(`/${AUser}/myUpdateUser/${CurrentUser.id}`, {
                name: infoForm.name,
                email: infoForm.email,
            })
            if (res.status === 200) {
                GetCurrentUser()
                Swal.fire({
                    title: "Profile Updated",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonColor: "var(--main-color)",
                    background: darkMode ? "#1e293b" : "#fff",
                    color: darkMode ? "#fff" : "#1e293b",
                })
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Could not update profile. Please try again.";
            Swal.fire({
                title: "Error",
                text: errorMsg,
                icon: "error",
                confirmButtonColor: "var(--main-color)",
                background: darkMode ? "#1e293b" : "#fff",
                color: darkMode ? "#fff" : "#1e293b",
            })
        } finally {
            setLoading(false)
        }
    }

    const handlePassSubmit = async (e) => {
        e.preventDefault()
        setPassLoading(true)
        setErrMess("")
        try {
            const res = await Axios.post(`/CahngePass`, {
                oldPass: passForm.oldPass,
                newPass: passForm.newPass,
                email: CurrentUser.email
            })

            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Password Changed",
                    text: res.data.message,
                    confirmButtonColor: "var(--main-color)",
                    background: darkMode ? "#1e293b" : "#fff",
                    color: darkMode ? "#fff" : "#1e293b",
                })
                setPassForm({ oldPass: "", newPass: "" })
            }
        } catch (e) {
            if (e.response?.status === 404) {
                setErrMess(e.response.data.message)
            } else {
                setErrMess("An error occurred. Please try again.")
            }
        } finally {
            setPassLoading(false)
        }
    }

    const getInitials = (name) => {
        if (!name) return "A"
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    }

    return (
        <div className='profile-page reveal-anim pt-0'>
            <div className='profile-header-card'>
                <div className='profile-cover'></div>
                <div className='profile-header-content mt-2'>
                    <div className='profile-avatar-wrapper'>
                        <div className='profile-avatar d-flex align-items-center justify-content-center bg-primary text-white fs-1 fw-bold'>
                            {getInitials(CurrentUser?.name)}
                        </div>
                    </div>
                    <div className='profile-basic-info'>
                        <h2>{CurrentUser?.name || "Admin Profile"}</h2>
                        <p>{CurrentUser?.email}</p>
                        <div className='d-flex gap-2 mt-2'>
                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill">
                                {CurrentUser?.role === "1990" ? "Administrator" : "Product Manager"}
                            </span>
                            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">
                                Dashboard Access
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='profile-grid'>
                <div className='profile-sidebar'>
                    <div className='profile-card'>
                        <h5 className='profile-card-title'>
                            <FontAwesomeIcon icon={faShieldAlt} className='icon' />
                            Admin Stats
                        </h5>
                        <div className='profile-stats'>
                            <div className='stat-box'>
                                <h4>{SavedProducts?.length || 0}</h4>
                                <span>Saved</span>
                            </div>
                            <div className='stat-box'>
                                <h4>PRO</h4>
                                <span>Status</span>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <Link to="/dashboard/users" className='btn-premium btn-premium-primary w-100 justify-content-center text-decoration-none py-2'>
                                <FontAwesomeIcon icon={faUser} className='me-2' />
                                Manage Users
                            </Link>
                        </div>
                    </div>

                    <div className='profile-card'>
                        <h5 className='profile-card-title'>
                            <FontAwesomeIcon icon={faHistory} className='icon' />
                            Activity Log
                        </h5>
                        <div className='activity-list'>
                            <div className='activity-item'>
                                <div className='activity-icon'><FontAwesomeIcon icon={faShieldAlt} /></div>
                                <div className='activity-details'>
                                    <h6>System Access</h6>
                                    <span>Authorized Dashboard Session</span>
                                </div>
                            </div>
                            {SavedProducts?.slice(0, 2).map((prod, idx) => (
                                <div key={idx} className='activity-item'>
                                    <div className='activity-icon text-danger'><FontAwesomeIcon icon={faHeart} /></div>
                                    <div className='activity-details'>
                                        <h6>Monitor {prod.title}</h6>
                                        <span>Tracking product performance</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='profile-main'>
                    <div className='profile-card mb-4'>
                        <h5 className='profile-card-title'>
                            <FontAwesomeIcon icon={faPen} className='icon' />
                            Edit Information
                        </h5>
                        <form className='profile-form row g-3' onSubmit={handleInfoSubmit}>
                            <div className='col-md-12'>
                                <div className='form-group'>
                                    <label>Display Name</label>
                                    <div className='auth-input-wrapper'>
                                        <FontAwesomeIcon icon={faUser} className='icon' />
                                        <input
                                            type="text"
                                            className='auth-input'
                                            name='name'
                                            value={infoForm.name}
                                            onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className='form-group'>
                                    <label>Admin Email</label>
                                    <div className='auth-input-wrapper'>
                                        <FontAwesomeIcon icon={faEnvelope} className='icon' />
                                        <input
                                            type="email"
                                            className='auth-input'
                                            name='email'
                                            value={infoForm.email}
                                            onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 text-end'>
                                <button type="submit" className='btn-premium btn-premium-primary' disabled={loading}>
                                    <FontAwesomeIcon icon={faSave} className='me-2' />
                                    {loading ? "Updating..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className='profile-card'>
                        <h5 className='profile-card-title'>
                            <FontAwesomeIcon icon={faLock} className='icon' />
                            Security Settings
                        </h5>
                        <form className='profile-form row g-3' onSubmit={handlePassSubmit}>
                            <div className='col-md-12'>
                                <div className='form-group'>
                                    <label>Existing Password</label>
                                    <div className='auth-input-wrapper'>
                                        <FontAwesomeIcon icon={faLock} className='icon' />
                                        <input
                                            type={showOldPass ? "text" : "password"}
                                            className='auth-input'
                                            placeholder='••••••••'
                                            value={passForm.oldPass}
                                            onChange={e => setPassForm({ ...passForm, oldPass: e.target.value })}
                                            required
                                            minLength={6}
                                        />
                                        <div onClick={() => setShowOldPass(!showOldPass)} className='position-absolute end-0 top-50 translate-middle-y me-3 pointer text-muted'>
                                            <FontAwesomeIcon icon={showOldPass ? faEye : faEyeSlash} />
                                        </div>
                                    </div>
                                    {errorMes && <p className='text-danger small mt-2 mb-0'>{errorMes}</p>}
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div className='form-group'>
                                    <label>New Admin Password</label>
                                    <div className='auth-input-wrapper'>
                                        <FontAwesomeIcon icon={faLock} className='icon' />
                                        <input
                                            type={showNewPass ? "text" : "password"}
                                            className='auth-input'
                                            placeholder='••••••••'
                                            value={passForm.newPass}
                                            onChange={e => setPassForm({ ...passForm, newPass: e.target.value })}
                                            required
                                            minLength={6}
                                        />
                                        <div onClick={() => setShowNewPass(!showNewPass)} className='position-absolute end-0 top-50 translate-middle-y me-3 pointer text-muted'>
                                            <FontAwesomeIcon icon={showNewPass ? faEye : faEyeSlash} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 text-end'>
                                <button type="submit" className='btn-premium btn-premium-primary' disabled={passLoading}>
                                    {passLoading ? "Applying..." : "Confirm New Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDashboard
