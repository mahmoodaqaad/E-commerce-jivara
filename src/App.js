import { Route, Routes } from 'react-router-dom';
// import ERR404 from "./Page/Dashboard/Page404/Page404"
// import Home from './Page/WebSite/Home/Home'
// import SingleProductShow from './Components/WebSite/SingleProductShow/SingleProductShow'
// import Profile from './Page/WebSite/Profile/Profile'
// import WebSite from './Page/WebSite/WebSite'
// import Dashboard from './Page/Dashboard/Dashboard'
// import Login from './Page/Auth/Login'
// import Register from './Page/Auth/Register'
// import RequiredBack from './Page/Auth/RequiredBack'
// import RequiredAuth from './Page/Auth/RequiredAuth'
// import HomeDshboard from './Page/Dashboard/Home/HomeDshboard'
// import Users from './Page/Dashboard/Users/Users'
// import AddUser from './Page/Dashboard/Users/AddUser'
// import UpdateUser from './Page/Dashboard/Users/EditUser'
// import Products from './Page/Dashboard/Products/Products'
// import Addproduct from './Page/Dashboard/Products/Addproduct'
// import Form from './Page/Dashboard/Form/Form'
// import AddCategory from './Page/Dashboard/Category/AddCategory'
// import Categories from './Page/Dashboard/Category/Categories'
// import CalendarPage from './Page/Dashboard/Calender/Calender'
// import Charts from './Page/Dashboard/Charts/Charts'
// import ProfileDashboard from './Page/Dashboard/Profile/Profile'
// import EditProduct from './Page/Dashboard/Products/EditProduct'
// import EditCategory from './Page/Dashboard/Category/EditCategory'
// import Reports from './Page/Dashboard/Reports/Reports'

// import Saved from './Page/WebSite/Saved/Saved';
// import SingelCategory from './Page/WebSite/SingelCategory/SingelCategory';
// import CategoriesPage from './Page/WebSite/Categories/CategoriesPage';



import { lazy, Suspense } from 'react';
import Loading from './Components/loading/Loading';
import 'react-image-gallery/styles/css/image-gallery.css'
import Search from './Page/search/search';
const ERR404 = lazy(() => import("./Page/Dashboard/Page404/Page404"))
const Home = lazy(() => import('./Page/WebSite/Home/Home'))
const SingleProductShow = lazy(() => import('./Page/WebSite/SingleProductShow/SingleProductShow'))
const Profile = lazy(() => import('./Page/WebSite/Profile/Profile'))
const WebSite = lazy(() => import('./Page/WebSite/WebSite'))
const Dashboard = lazy(() => import('./Page/Dashboard/Dashboard'))
const Login = lazy(() => import('./Page/Auth/Login'))
const Register = lazy(() => import('./Page/Auth/Register'))
const RequiredBack = lazy(() => import('./Page/Auth/RequiredBack'))
const RequiredAuth = lazy(() => import('./Page/Auth/RequiredAuth'))
const HomeDshboard = lazy(() => import('./Page/Dashboard/Home/HomeDshboard'))
const Users = lazy(() => import('./Page/Dashboard/Users/Users'))
const AddUser = lazy(() => import('./Page/Dashboard/Users/AddUser'))
const UpdateUser = lazy(() => import('./Page/Dashboard/Users/EditUser'))
const Products = lazy(() => import('./Page/Dashboard/Products/Products'))
const Addproduct = lazy(() => import('./Page/Dashboard/Products/Addproduct'))
const Form = lazy(() => import('./Page/Dashboard/Form/Form'))
const AddCategory = lazy(() => import('./Page/Dashboard/Category/AddCategory'))
const Categories = lazy(() => import('./Page/Dashboard/Category/Categories'))
const CalendarPage = lazy(() => import('./Page/Dashboard/Calender/Calender'))
const Charts = lazy(() => import('./Page/Dashboard/Charts/Charts'))
const ProfileDashboard = lazy(() => import('./Page/Dashboard/Profile/Profile'))
const EditProduct = lazy(() => import('./Page/Dashboard/Products/EditProduct'))
const EditCategory = lazy(() => import('./Page/Dashboard/Category/EditCategory'))
const Reports = lazy(() => import('./Page/Dashboard/Reports/Reports'));
const Saved = lazy(() => import('./Page/WebSite/Saved/Saved'));
const SingelCategory = lazy(() => import('./Page/WebSite/SingelCategory/SingelCategory'));
const CategoriesPage = lazy(() => import('./Page/WebSite/Categories/CategoriesPage'));
const Checkout = lazy(() => import('./Page/WebSite/Checkout/Checkout'));





function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="App">

        <Routes>
          {/* website  */}

          <Route element={<WebSite />} >
            <Route path='*' element={<ERR404 home={"/"} />} />
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<SingleProductShow />} />
            <Route path='/category/:id' element={<SingelCategory />} />
            <Route path='/category' element={<CategoriesPage />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/search' element={<Search />} />


            <Route element={<RequiredAuth Allowedrole={["1990", "1995", "2000"]} />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/Saved' element={<Saved />} />
            </Route>
          </Route>

          <Route element={<RequiredBack />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          {/* dashboard  */}

          <Route element={<RequiredAuth Allowedrole={["1990", "1995"]} />}>
            <Route path='/dashboard' element={<Dashboard />} >

              <Route path='/dashboard/*' element={<ERR404 home={"/dashboard/"} />} />

              <Route element={<RequiredAuth Allowedrole={["1990"]} />}>
                <Route path='/dashboard/' element={<HomeDshboard />} />
                <Route path='/dashboard/home' element={<HomeDshboard />} />

                <Route path='/dashboard/users' element={<Users />} />
                <Route path='/dashboard/adduser' element={<AddUser />} />
                <Route path='/dashboard/users/:id' element={<UpdateUser />} />

                <Route path='/dashboard/form' element={<Form />} />

                <Route path='/dashboard/report' element={<Reports />} />

              </Route>





              <Route path='/dashboard/products' element={<Products />} />
              <Route path='/dashboard/addproduct' element={<Addproduct />} />
              <Route path='/dashboard/products/:id' element={<EditProduct />} />


              <Route path='/dashboard/Categories' element={<Categories />} />
              <Route path='/dashboard/addcategory' element={<AddCategory />} />
              <Route path='/dashboard/categories/:id' element={<EditCategory />} />



              <Route path='/dashboard/calendar' element={<CalendarPage />} />


              <Route path='/dashboard/charts' element={<Charts />} />
              <Route path='/dashboard/profile' element={<ProfileDashboard />} />

            </Route>


          </Route>








        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
