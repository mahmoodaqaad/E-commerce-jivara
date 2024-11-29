import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Cookie from 'universal-cookie'
import Loading from '../../Components/loading/Loading'
import { AUser, BaseURL } from '../../API/API'
import { Axios } from '../../API/Axios'
import Err403 from './403'
const RequiredAuth = ({ Allowedrole }) => {
    const cookie = new Cookie()
    const token = cookie.get("ecommerce_jivara")
    const navigate = useNavigate()
    const [user, setUser] = useState("")

    useEffect(() => {
        Axios.get(`${BaseURL}/${AUser}`).then(res => setUser(res.data.user)
        )
            .catch(() => navigate("/login", { replace: true }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return token ?
        (
            user === "" ? <Loading /> : (
                Allowedrole.includes(user?.role) ?
                    <Outlet />
                    :
                    <Err403 role={user.role} />

            )

        ) :

        window.location.pathname = "/login"
}

export default RequiredAuth
