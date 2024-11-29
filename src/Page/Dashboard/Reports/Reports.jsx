import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileExcel} from '@fortawesome/free-solid-svg-icons';
import { MyContext } from '../../../Context/MyState';
import Cards from '../../../Components/Cards/Cards';
// import { jsPDF } from 'jspdf';
// import * as XLSX from 'xlsx';
import Charts from '../Charts/Charts';
import { Table } from 'react-bootstrap';

const Reports = () => {
    const { darkMode, categories,
        products,
        users,
        GetAllUsers,
        GetAllProducts,
        GetAllCategories, } = useContext(MyContext);

    useEffect(() => {

        GetAllUsers()
        GetAllProducts()
        GetAllCategories()
    }, [])

    const categoriesCount = categories.length; // مثال: عدد المستخدمين
    const productsCount = products.length; // مثال: عدد المنتجات
    const usersCount = users.length; // مثال: عدد الفئات


    const styleTd = {
        color: darkMode ? '#fff' : '#000',
        background: darkMode ? '#353535' : '#fff',
    };


    // const exportToPDF = () => {
    //     const doc = new jsPDF();
    //     doc.text('تقرير المتجر الإلكتروني', 10, 10);
    //     doc.text(`عدد المستخدمين: ${usersCount}`, 10, 20);
    //     doc.text(`عدد المنتجات: ${productsCount}`, 10, 30);
    //     doc.text(`عدد الفئات: ${categoriesCount}`, 10, 40);
    //     doc.save('report.pdf');
    // };

    // وظيفة لتصدير التقرير كملف Excel
    const exportToExcel1 = () => {
        const data = [
            { title: 'users', count: usersCount },
            { title: 'products', count: productsCount },
            { title: 'categoreis', count: categoriesCount },
        ];
        // const worksheet = XLSX.utils.json_to_sheet(data);
        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheet, 'تقرير');
        // XLSX.writeFile(workbook, 'report.xlsx');
    };
    const exportToExcel2 = () => {
        const reportData = [
            { id: 1, name: 'Sales', date: '2024-11-01', status: 'Completed', amount: '$1,000' },
            { id: 2, name: 'Clients', date: '2024-11-05', status: 'In Progress', amount: '$500' },
            { id: 3, name: 'Profit Report', date: '2024-11-10', status: 'Completed', amount: '$2,300' },
            { id: 4, name: 'Product Report', date: '2024-11-15', status: 'Pending', amount: '$750' }
        ];
        // const worksheet = XLSX.utils.json_to_sheet(reportData);
        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheet, 'تقرير');
        // XLSX.writeFile(workbook, 'data.xlsx');
    };

    const reportData = [
        { id: 1, name: 'Sales', date: '2024-11-01', status: 'Completed', amount: '$1,000' },
        { id: 2, name: 'Clients', date: '2024-11-05', status: 'In Progress', amount: '$500' },
        { id: 3, name: 'Profit Report', date: '2024-11-10', status: 'Completed', amount: '$2,300' },
        { id: 4, name: 'Product Report', date: '2024-11-15', status: 'Pending', amount: '$750' }
    ];

    return (
        <div className=''>
            <div className="text-inherit">
                <h1>Reports</h1>

            </div>
            <Cards />

            <div className="export-buttons mt-4">
                {/* <button style={buttonStyle}
                    onClick={exportToPDF}
                >
                    <FontAwesomeIcon icon={faFilePdf} /> تصدير إلى PDF
                </button> */}
                <button className='btn btn-primary ' onClick={exportToExcel1}>
                    <FontAwesomeIcon icon={faFileExcel} /> تصدير إلى Excel
                </button>
            </div>
            <div className="table-section mt-4 ">
                <h2>Detalies</h2>
                <Table className="table-show shadow overflow-x-auto bg-card"
                    striped
                    bordered
                    hover
                    style={{ borderColor: darkMode ? '#666' : '#ecccec' }}>
                    <thead>
                        <tr>
                            <td className="p-3" style={styleTd}>ID</td>
                            <td className="p-3" style={styleTd}>Tilte</td>
                            <td className="p-3" style={styleTd}>Date</td>
                            <td className="p-3" style={styleTd}>Status</td>
                            <td className="p-3" style={styleTd}>amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((report) => (
                            <tr key={report.id}>
                                <td style={styleTd}>{report.id}</td>
                                <td style={styleTd}>{report.name}</td>
                                <td style={styleTd} className=''>{report.date}</td>
                                <td style={styleTd} className={report.status === "Completed" ? "text-success " : report.status === "In Progress" ? "text-info" : "text-warning"}>{report.status}</td>
                                <td style={styleTd}>{report.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="export-buttons">
                {/* <button style={buttonStyle}
                    onClick={exportToPDF}
                >
                    <FontAwesomeIcon icon={faFilePdf} /> تصدير إلى PDF
                </button> */}
                <button className='btn btn-info' onClick={exportToExcel2}>
                    <FontAwesomeIcon icon={faFileExcel} /> تصدير إلى Excel
                </button>
            </div>

            <div className="charts-section">
                <Charts />
            </div>
        </div >
    );
};

export default Reports;
