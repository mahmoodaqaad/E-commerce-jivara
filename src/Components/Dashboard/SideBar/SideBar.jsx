import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashboard, faX } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect } from 'react';
import { MyContext } from '../../../Context/MyState';
import { NavLink } from 'react-router-dom';
import sideBar from '../../../Data/SideBar';
import './Sidebar.css'

const SideBar = () => {
    const { DarkMode, IsOpenBar, windowsize, setIsopenBar, CurrentUser, GetCurrentUser } = useContext(MyContext);


    useEffect(() => {
        GetCurrentUser()
    }, [])

    const iconColors = {
        website: DarkMode ? "#6ac5fa" : "#38b6ff", // أحمر داكن
        home: DarkMode ? "#4CAF50" : "#388E3C", // أخضر
        order: DarkMode ? "#2196F3" : "#1976D2", // أزرق
        form: DarkMode ? "#FF9800" : "#F57C00", // برتقالي
        calendar: DarkMode ? "#9C27B0" : "#7B1FA2", // بنفسجي
        charts: DarkMode ? "#FF5722" : "#E64A19", // أحمر
        users: DarkMode ? "#3F51B5" : "#303F9F", // أزرق داكن
        product: DarkMode ? "#009688" : "#00796B", // فيروز
        profile: DarkMode ? "#8BC34A" : "#7CB342", // أخضر فاتح
        history: DarkMode ? "#E91E63" : "#D81B60", // وردي
        reports: DarkMode ? "#F44336" : "#D32F2F", // أحمر داكن
    };

    return (
        <div className={` col-1 sidebar  overflow-y-auto overflow-x-hidden ${windowsize < 991 || IsOpenBar ? "isopen" : ""} ${windowsize < 991 && (IsOpenBar ? "isopenFexid" : "fexid")}`}>
            <div className=' pe-0'>
                <div className='fs-2 px-3  pt-3 pointer title position-relative'>
                    <div className='d-flex align-items-center gap-2'>
                        <FontAwesomeIcon icon={faDashboard} />
                        <p className='m-0'>Dashboard</p>
                    </div>
                    {
                        windowsize < 991 &&
                        <div className={`bars position-absolute end-0 top-50 translate-middle-y m-0${DarkMode ? "shadow-dark" : "shadow"} `} onClick={() => setIsopenBar((prev) => !prev)} >

                            <FontAwesomeIcon fontSize={"20px"} icon={faX} />
                        </div>
                    }

                </div>
                <hr className='mb-0 ' />
                {

                    sideBar?.map((item, key) => (

                        item.role.includes(CurrentUser?.role) &&
                        <div key={key} className='navitem pe-0' onClick={e => windowsize < 991 ? setIsopenBar(false) : ""}>
                            <NavLink className="text-decoration-none d-flex align-items-center gap-2 fs-4 py-3" to={`${item.link}`}>
                                <FontAwesomeIcon color={iconColors[item.iconColor]} icon={item.icon} /> {/* استدعاء اللون بشكل صحيح */}
                                <p className='m-0 fs-4' >{item.title}</p>
                            </NavLink>
                        </div>

                    ))
                }

            </div>

        </div>
    )
}

export default SideBar
