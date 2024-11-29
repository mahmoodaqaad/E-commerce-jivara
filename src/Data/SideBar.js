import { faHome, faCartShopping, faList, faCalendar, faChartSimple, faUsers, faShop, faUser, faHistory, faFileInvoice, faUserPlus, faCartPlus, faEarth, faFolderPlus, faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const sideBar = [
    {
        icon: faHome,
        title: "DashBoard",
        link: "home",
        iconColor: "home",
        role: ["1990"]
    }, {
        icon: faUsers,
        title: "Users",
        link: "users",
        iconColor: "users",
        role: ["1990"]
    },
    {
        icon: faUserPlus,
        title: "Add User",
        link: "adduser",
        iconColor: "adduser",
        role: ["1990"]
    },
    {
        icon: faCartShopping,
        title: "products",
        link: "products",
        iconColor: "product",
        role: ["1990", "1995"]
    },
    {
        icon: faCartPlus,
        title: "Add Poduct",
        link: "addproduct",
        iconColor: "order",
        role: ["1990", "1995"]
    },
    {
        icon: faFolderOpen,
        title: "Catygories",
        link: "categories",
        iconColor: "users",
        role: ["1990", "1995"]
    },
    {
        icon: faFolderPlus,
        title: "Add Category",
        link: "addcategory",
        iconColor: "home",
        role: ["1990", "1995"]
    },
    {
        icon: faList,
        title: "Form",
        link: "form",
        iconColor: "form",
        role: ["1990"]

    },
    {
        icon: faCalendar,
        title: "Calendar",
        link: "calendar",
        iconColor: "calendar",
        role: ["1990", "1995"]
    },
    {
        icon: faChartSimple,
        title: "Charts",
        link: "charts",
        iconColor: "charts",
        role: ["1990", "1995"]
    },

    {
        icon: faUser,
        title: "Profile",
        link: "profile",
        iconColor: "profile",
        role: ["1990", "1995"]
    },
    // {
    //     icon: faHistory,
    //     title: "History",
    //     link: "history",
    //     iconColor: "history",
    // role: ["1990", "1995"]
    // },
    {
        icon: faFileInvoice,
        title: "Reports",
        link: "report",
        iconColor: "reports",
        role: ["1990"]
    },
    {
        icon: faEarth,
        title: "Website",
        link: "/",
        iconColor: "website",
        role: ["1990", "1995"]
    },
];

export default sideBar;
