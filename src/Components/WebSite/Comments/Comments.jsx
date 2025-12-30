import React, { useContext, useEffect, useState } from 'react'
import { Axios } from '../../../API/Axios'
import { MyContext } from '../../../Context/MyState'
import axios from 'axios'
import { BaseURL } from '../../../API/API'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faStar as soild } from '@fortawesome/free-solid-svg-icons'
import { faStar as reg } from '@fortawesome/free-regular-svg-icons'
import Swal from 'sweetalert2'
import { SkeletonShow } from '../../ShowSkeleton/ShowSkeleton'
import { useNavigate } from 'react-router-dom'

const Comments = ({ id, darkMode }) => {

    const [addcomment, setAddComment] = useState("")


    const [Comments, setCommnets] = useState([])
    const [newComment, setNewComment] = useState("")
    const { CurrentUser, GetCurrentUser } = useContext(MyContext)
    const [rating, setRating] = useState(0); // حالة لتخزين التقييم
    const [hover, setHover] = useState(null);
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        GetCurrentUser()


        Axios.get(`/product/${id}`).then(
            res => {


                const parsedComments = JSON.parse(res.data.data[0].user_comments);

                // فرز التعليقات بناءً على الوقت
                const sortedComments = parsedComments.sort((a, b) => new Date(b.date) - new Date(a.date));

                setCommnets(sortedComments);

            }

        ).catch(e => {
            // console.log(e);
        })

            .finally(e => { setLoading(false) })





        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newComment])



    const addComments = async () => {
        if (CurrentUser?.id) {

            try {
                const res = await Axios.post(`/product/add-comment/${id}`, { addcomment, CurrentUser })
                setNewComment(res)

            }
            catch (e) {
                // console.log(e);

            }
        } else {

            Navigate("/login")
        }
    }


    const handleDeleteCommets = async (comment) => {
        try {

            const res = await axios.post(`${BaseURL}/product/delete-comment/${id}`, { comment })
            if (res.status === 200) {
                setCommnets(prev => prev.filter(item => item.id !== comment.id))

            }
        } catch (e) {
            // console.log(e);

        }

    }


    function handleStars() {
        if (CurrentUser?.id) {

            Axios.post(`/product/add-rate/${id}`, { star: rating, user: CurrentUser?.id }).then(res => {



                Swal.fire({
                    title: "Thank You For Rating",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OK",
                    background: darkMode ? "#333" : "#fff",
                    color: !darkMode ? "#333" : "#fff",
                })





            }).catch(e => {
                // console.log(e);
            })

        } else {
            Navigate("/login")
        }
    }

    return (
        <div className='col-12 col-md-5 '>
            {/* add commens  */}
            <div className='d-flex g-2 flex-wrap w-100'>
                <div className='inputForm  col-12 col-md-9'>
                    <div className='inputgroup py-2'>

                        <input type="text" placeholder='Add Comments' value={addcomment} onChange={e => setAddComment(e.target.value)} />
                    </div>
                </div>
                <div className=' text-center text-md-start'>

                    <button className='btn btn-success ' onClick={() => addComments()}>Add comment</button>
                </div>
            </div>
            <div className="d-flex gap-3 align-items-center mt-2 mb-5 justify-content-between">
                <div className='d-flex gap-2 pointer '>

                    {[1, 2, 3, 4, 5].map((star, key) => (

                        <FontAwesomeIcon key={key} icon={(rating) >= star ? soild : reg}

                            onClick={() => setRating(star)} // عند الضغط
                            onMouseEnter={() => setHover(star)} // عند المرور
                            onMouseLeave={() => setHover(null)} // عند مغادرة الماوس
                            style={{
                                color: (hover || rating) >= star ? '#FFD700' : '#ccc', // اللون الأصفر عند التحديد
                                transition: 'color 0.2s ease-in-out',
                            }}
                        />))}

                </div>
                <button className='btn btn-warning col-3' onClick={handleStars}>Rate</button>
            </div>


            {/* comments  */}
            {loading ?
                <div className=''>
                    <div className='commets border p-2 mb-4'>
                        <div className='d-flex justify-content-between  col-12 align-items-center'>

                            <div className=''>
                                <SkeletonShow width={"120px"} length={1} />
                                <SkeletonShow width={"120px"} length={1} />
                                <hr />
                            </div>

                        </div>


                        <SkeletonShow width={"90%"} length={1} />
                        <SkeletonShow width={"70%"} length={1} />

                    </div>
                    <div className='commets border p-2 mb-4'>
                        <div className='d-flex justify-content-between  col-12 align-items-center'>

                            <div className=''>
                                <SkeletonShow width={"120px"} length={1} />
                                <SkeletonShow width={"120px"} length={1} />
                                <hr />
                            </div>

                        </div>


                        <SkeletonShow width={"90%"} length={1} />
                        <SkeletonShow width={"70%"} length={1} />

                    </div>
                    <div className='commets border p-2 mb-4'>
                        <div className='d-flex justify-content-between  col-12 align-items-center'>

                            <div className=''>
                                <SkeletonShow width={"120px"} length={1} />
                                <SkeletonShow width={"120px"} length={1} />
                                <hr />
                            </div>

                        </div>


                        <SkeletonShow width={"90%"} length={1} />
                        <SkeletonShow width={"70%"} length={1} />

                    </div>


                </div>

                :
                <div className=''>
                    {
                        Comments.length > 0 ?
                            Comments?.map(comment => (
                                <div key={comment.id} className='commets border p-2 mb-4'>
                                    <div className='d-flex justify-content-between  '>

                                        <div className=''>
                                            <h5 className='text-info'>{comment?.user?.email}</h5>
                                            <p className='fst-italic' style={{ fontSize: "12px" }}>{comment.date}</p>
                                            <hr />
                                        </div>
                                        {
                                            (comment?.user?.email === CurrentUser?.email || CurrentUser?.role === "1990") &&
                                            <button className='text-danger bg-transparent fs-5' onClick={e => handleDeleteCommets(comment)}><FontAwesomeIcon icon={faTrash}/></button>
                                        }
                                    </div>


                                    <p>{comment?.commet}</p>

                                </div>
                            ))


                            : <h4>Add The First Comments</h4>}

                </div>
            }
        </div >
    )
}

export default Comments
