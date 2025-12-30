
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Cookie from 'universal-cookie'
import { AUser, BaseURL } from '../../API/API'
import { Axios } from '../../API/Axios'

const RequiredBack = () => {
    const cookie = new Cookie()
    const [user, setUser] = useState("")


    useEffect(() => {
        function getuser() {

            if (!cookie.get("ecommerce_jivara")) return false
            Axios.get(`${BaseURL}/${AUser}`).then(res => setUser(res.data.user)
            )
                .catch((e) => {

                    // console.log(e)
                })
        }
        getuser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return user ? window.history.back() : <Outlet />

}

export default RequiredBack
