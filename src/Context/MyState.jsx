import React, { createContext, useCallback, useEffect, useState } from 'react'
import Cookies from "universal-cookie";
import { jwtDecode } from 'jwt-decode';
import { Axios } from '../API/Axios';
import { ACategories, ALogout, AProducts, AUser, BaseURL } from '../API/API';
import Swal from 'sweetalert2';
import axios from 'axios';

export const MyContext = createContext()

const MyState = ({ children }) => {
    const [windowsize, setWindowSize] = useState(window.innerWidth)
    const [darkMode, SetDarkMode] = useState(false)
    const [isChangeInCart, setIsChangeInCart] = useState(false)
    const [IsOpenBar, setIsopenBar] = useState(windowsize > 991 ? true : false)
    const [CurrentUser, setCurrentUser] = useState([])
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [SavedProducts, setSavedProducts] = useState([])
    const [serach, setSerarch] = useState("")
    const cookies = new Cookies();

    //* mode 
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    // *reisase 
    useEffect(() => {
        function setWindowWidth() {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize", setWindowWidth)

        return () => {
            window.removeEventListener("resize", setWindowWidth)
        }
    }, [])

    // *methods

    const getAllSavedProducts = useCallback(() => {
        Axios.get(`/savedPrdouct`).then(e => {
            setSavedProducts(e.data.data);
        }).catch(e => { })
    }, [])


    function addForCart(id, coun, product) {
        const count = Number(coun)
        let yourCart = JSON.parse(localStorage.getItem(`yourCart`)) || []

        let productexist = yourCart.findIndex(item => +item.id === +id)
        if (+productexist !== -1) {
            if (Number(yourCart[productexist].count) <= Number(yourCart[productexist].stok)) {
                if (count + Number(yourCart[productexist].count) <= Number(yourCart[productexist].stok)) {
                    yourCart[productexist].count += count
                    Swal.fire({
                        title: " ADD succusfully!",
                        icon: "success",
                        background: darkMode ? "#333" : "#fff",
                        color: !darkMode ? "#333" : "#fff",

                    });

                } else {
                    Swal.fire({
                        title: "max is :" + product.stok,
                        icon: "warning",
                        background: darkMode ? "#333" : "#fff",
                        color: !darkMode ? "#333" : "#fff",

                    });

                }


            } else {
                Swal.fire({
                    title: "max is :" + product.stok,
                    icon: "warning",
                    background: darkMode ? "#333" : "#fff",
                    color: !darkMode ? "#333" : "#fff",

                });
            }


        }
        else {
            if (count > 1) {
                if (count <= Number(product.stok)) {

                    product.count = count
                    yourCart.push(product)
                    Swal.fire({
                        title: " ADD succusfully!",
                        icon: "success",
                        background: darkMode ? "#333" : "#fff",
                        color: !darkMode ? "#333" : "#fff",

                    });
                }
                else {
                    Swal.fire({
                        title: "max is :" + product.stok,
                        icon: "warning",
                        background: darkMode ? "#333" : "#fff",
                        color: !darkMode ? "#333" : "#fff",

                    });
                }




            }
            else {

                product.count = 1
                yourCart.push(product)
                Swal.fire({
                    title: " ADD succusfully!",
                    icon: "success",
                    background: darkMode ? "#333" : "#fff",
                    color: !darkMode ? "#333" : "#fff",

                });

            }
        }

        localStorage.setItem(`yourCart`, JSON.stringify(yourCart))


    }




    // *Auth
    // delet token 
    useEffect(() => {
        GetCurrentUser()
        const token = cookies.get("ecommerce_jivara");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();

                if (!isExpired) {
                    return true
                } else {
                    // التوكن منتهي الصلاحية، احذفه من الكوكيز
                    cookies.remove("ecommerce_jivara");
                }
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const GetCurrentUser = useCallback(() => {
        Axios.get(`/${AUser}`).then(res => {
            setCurrentUser(res.data.user);
        }).catch(e => { })
    }, [])
    const Logout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Log out ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log Out",
            background: darkMode ? "#333" : "#fff",
            color: !darkMode ? "#333" : "#fff",
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.get(`${BaseURL}/${ALogout}`).catch(e => { })

                cookies.remove("ecommerce_jivara")
                window.location.pathname = "/login"
                Swal.fire({
                    title: "Deleted!",
                    text: "Log out",
                    icon: "success",
                    background: darkMode ? "#333" : "#fff",
                    color: !darkMode ? "#333" : "#fff",

                });
            }
        })


    }

    //* get  date
    const GetAllCategories = useCallback(() => {
        Axios.get(`/${ACategories}`).then(res => {
            setCategories(res.data.data);
        }).catch(e => { })
    }, [])

    const GetAllUsers = useCallback(() => {
        axios.get(`${BaseURL}/users`).then(res => {
            setUsers(res.data.data);
        }).catch(e => { })
    }, [])

    const GetAllProducts = useCallback(() => {
        Axios.get(`/${AProducts}`).then(res => {
            setProducts(res.data.data);
        }).catch(e => { })
    }, [])


    return (
        <MyContext.Provider value={{
            Logout,
            darkMode,
            IsOpenBar,
            windowsize,
            CurrentUser,
            categories,
            products,
            users,
            isChangeInCart,
            SavedProducts,
            serach,
            setSerarch,
            getAllSavedProducts,
            setIsChangeInCart,
            GetAllUsers,
            GetAllProducts,
            GetAllCategories,
            GetCurrentUser,
            setCurrentUser,
            setWindowSize,
            setIsopenBar,
            SetDarkMode,
            addForCart,
        }}>
            {children}
        </MyContext.Provider >
    )
}

export default MyState
