import React, { useContext, useEffect, useState } from 'react'
import { AUser } from '../../../API/API'
import { Axios } from '../../../API/Axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { MyContext } from '../../../Context/MyState'
import Loading from '../../../Components/loading/Loading'
const UpdateUser = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "",

    })
    const Navigate = useNavigate()
    const { darkMode, CurrentUser, GetCurrentUser } = useContext(MyContext);;



    useEffect(() => {

        setLoading(true)
        GetCurrentUser()

        Axios.get(`/${AUser}/${id}`).then(res => {
            setForm({
                name: res.data[0].name,
                email: res.data[0].email,
                role: res.data[0].role,

            })
        }).catch(e => {
            console.log(e)

            Navigate("/dashboard/404")


        }

        ).finally(() => setLoading(false))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCahnge = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }









    const handleEdit = async (e) => {
        const { email, role, name } = form
        if (!email || !role || !name) {
            return Swal.fire({

                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "All Fileds are required",
                background: darkMode ? "#333" : "#fff",
                color: !darkMode ? "#333" : "#fff",
            })
        }
        e.preventDefault()
        try {

            const res = await Axios.patch(`/${AUser}/update/${id}`, form)

            if (res.status === 200) {
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
            console.log(e);

        }

    }





    return (
        <>
            {loading && <Loading />}
            <div className=' col-12 col-md-6 bg-card p-3 m-auto text-center'>

                <div className="text-inherit">
                    <h1>Edit User</h1>

                </div>

                <div className='mt-4'>

                    <form className='inputForm' onSubmit={handleEdit}>
                        <div className="inputgroup">
                            <input type="text" name='name' placeholder='Name ...' onChange={handleCahnge} value={form.name} />
                        </div>
                        <div className="inputgroup">
                            <input type="email" name='email' placeholder='Email ...' onChange={handleCahnge} value={form.email} />
                        </div>


                        <select onChange={handleCahnge} name='role' value={form.role} disabled={+CurrentUser.id === +id}>
                            <option value="">Select User</option>
                            <option value="1990">Admin</option>
                            <option value="1995">Product Manger</option>
                            <option value="2000">user</option>
                        </select>

                        <button type="submit"
                            disabled={!form.email || !form.role || !form.name ? true : false}

                            className='btn btn-info mt-3 px-4 fs-5 col-4'>Submit</button>
                    </form>
                </div>
            </div >
        </>

    )
}

export default UpdateUser
