import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Form = () => {
    return (
        <div>

            <div className="text-inherit">
                <h1>Form</h1>

            </div>
            <hr />
            <div className="row g-2 mt-2 py-3  gap-4 justify-content-evenly">
                <div className="col-12 col-lg-5" style={{ maxWidth: "600px" }}>
                    <div className="formContanier bg-card shadow  mt-4 p-3 ">
                        <h1 className='text-center'>Login</h1>
                        <hr />
                        <div className=' h-100  d-flex justify-content-center align-items-center'>
                            <div className='form  px-4 text-center '>
                                <div><h1 className='text-primary'>Welcom Again</h1></div>
                                <form >
                                    <div className='inputForm shadow-sm'>
                                        <div className='inputIcon '>

                                            <FontAwesomeIcon fontSize={"20px"} icon={faUser} />
                                        </div>

                                        <input type="email" className='bg-transparent' required name='email' placeholder='Email...' />
                                    </div>
                                    <div className='inputForm shadow-sm '>
                                        <div className='inputIcon '>

                                            <FontAwesomeIcon fontSize={"20px"} icon={faLock} />
                                        </div>

                                        <input type="password" className='bg-transparent ' required minLength={6} name='password' placeholder='Password...' />
                                    </div>
                                    <button type="submit" className='btn btn-success fs-4 px-4 mt-4'>Login</button>
                                    <p className='text-start mt-4'>Do You not have Acount <Link >Sign Up</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-5" style={{ maxWidth: "600px" }}>
                    <div className="formContanier bg-card shadow  p-3  mt-4">
                        <h1 className='text-center'>Register</h1>
                        <hr />
                        <div className=' h-100  d-flex justify-content-center align-items-center'>
                            <div className='form  px-4 text-center '>
                                <div><h1 className='text-primary'>Welcom </h1></div>
                                <form >
                                    <div className='inputForm shadow-sm'>
                                        <input className='bg-transparent' type="name" required name='name' placeholder='Name...' />
                                    </div>
                                    <div className='inputForm shadow-sm'>
                                        <input className='bg-transparent' type="email" required name='email' placeholder='Email...' />
                                    </div>
                                    <div className='inputForm shadow-sm'>
                                        <input className='bg-transparent' type="password" required minLength={6} name='password' placeholder='Password...' />
                                    </div>
                                    <button type="submit" className='btn btn-success fs-4 px-4 mt-4'>Register</button>
                                    <p className='text-start mt-4'>Do You have Acount <Link >Login</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-12 col-lg-5" style={{ maxWidth: "600px" }}>
                    <div className="formContanier bg-card shadow  p-3  mt-4">
                        <h1 className='text-center'>Product Form</h1>
                        <hr />
                        <div>


                            <form className="inputForm">
                                <div className="inputgroup w-100">
                                    <input type="text" name="title" placeholder="Title..." />
                                </div>
                                <div className="inputgroup w-100">
                                    <input type="number" name="price" placeholder="Price..." />
                                </div>
                                <div className="inputgroup w-100">
                                    <input type="text" name="description" placeholder="Description..." />
                                </div>
                                <select name="categoryId" className="w-100" >
                                    <option value="">Select Category</option>

                                </select>
                                <div className="inputgroup w-100">
                                    <label htmlFor="img" className="btn btn-success">
                                        Choose Image
                                    </label>
                                    <input type="file" id="img" hidden multiple />
                                </div>
                                <button type="submit" className="btn btn-info mt-3 px-4 fs-5">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>



                <div className="col-12 col-lg-5" style={{ maxWidth: "600px" }}>
                    <div className="formContanier bg-card shadow  mt-4 p-3 ">
                        <h1 className='text-center'>User Form</h1>
                        <hr />
                        <div className="text-inherit">

                        </div>

                        <div>

                            <form className='inputForm' >
                                <div className="inputgroup">
                                    <input type="text" name='name' placeholder='Name ...' />
                                </div>
                                <div className="inputgroup">
                                    <input type="email" name='email' placeholder='Email ...' />
                                </div>
                                <div className="inputgroup">
                                    <input type="passowrd" name='password' placeholder='Password ...' />
                                </div>

                                <select name='role' >
                                    <option >Select User</option>
                                    <option value="1990">Admin</option>
                                    <option value="1995">Product Manger</option>
                                    <option value="2000">user</option>
                                </select>

                                <button type="submit" className='btn btn-info mt-3 px-4 fs-5'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-5" style={{ maxWidth: "600px" }}>
                    <div className="formContanier bg-card shadow  mt-4 p-3 ">
                        <h1 className='text-center'>Category Form</h1>
                        <hr />


                        <div >

                            <div className="text-inherit">

                            </div>

                            <div>

                                <form className='inputForm' >
                                    <div className="inputgroup">
                                        <input type="text" name='name' placeholder='Name ...' />
                                    </div>
                                    <div className="inputgroup w-100">
                                        <label htmlFor="img" className="btn btn-success">
                                            Choose Image
                                        </label>
                                        <input type="file" id="img" hidden />
                                    </div>

                                    <button type="submit" className='btn btn-info mt-3 px-4 fs-5'>Submit</button>
                                </form>
                            </div>
                        </div >
                    </div>
                </div>




            </div>

        </div>
    )
}

export default Form
