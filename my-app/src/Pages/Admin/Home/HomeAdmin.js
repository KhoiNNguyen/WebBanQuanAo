import { useEffect, useState } from 'react';
import './Home.css'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from "react-icons/bs";
import { PiInvoice } from 'react-icons/pi';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import LoiNhuanChart from './LoiNhuanChart';
import DoanhThuChart from './DoanhThuChart';

const HomeAdmin = () => {
    const [productDetail, setProductDetail] = useState([]);
    const [importInvoice, setImportInvoice] = useState([]);
    const [user, setUser] = useState([]);
    const [productType, setProductType] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [yearsDoanhThu, setYearDoanhThu] = useState([]);
    const [yearsLoiNhuan, setYearLoiNhuan] = useState([]);
    const [yearsLoiNhuan1, setYearLoiNhuan1] = useState([]);

    //Doanh thu
    const arrYears = invoice.map(item => {
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const year = parts[0];
        return year
    })
    const uniqueArray = [...new Set(arrYears)];
    const filterYears = (year) =>{
        const eventsInYear = invoice.filter(event => {
            const eventDate = new Date(event.invoiceDate);
            return eventDate.getFullYear().toString() === year.toString();
        });
        setYearDoanhThu(eventsInYear)
    }
    //Lợi nhuận
    const arrLoiNhuan = importInvoice.map(item => {
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const year = parts[0];
        return year
    })
    const uniqueLoiNhuan = [...new Set(arrLoiNhuan)];
    const filterYearsLoiNhuan = (year) =>{
        const eventsLoiNhuan = importInvoice.filter(event => {
            const eventDate = new Date(event.invoiceTime);
            return eventDate.getFullYear().toString() === year.toString();
        });
        const eventsDoanhThu = invoice.filter(event => {
            const eventDate = new Date(event.invoiceDate);
            return eventDate.getFullYear().toString() === year.toString();
        });
        setYearLoiNhuan1(eventsDoanhThu)
        setYearLoiNhuan(eventsLoiNhuan)
    }
    console.log("yearsLoiNhuan",yearsLoiNhuan);
    console.log("yearsDoanhThu",yearsDoanhThu);
    //Lấy danh sách
    const getListUser = () =>{
        axios.get(`https://localhost:7026/api/Users`)
        .then(res =>{
            setUser(res.data);
        })
    }
    const getListImportInvocie = () =>{
        axios.get(`https://localhost:7026/api/ImportInvoices`)
        .then(res => {
            setImportInvoice(res.data);
        })
    }
    const getListProductType = () =>{
        axios.get(`https://localhost:7026/api/ProductTypes`)
        .then(res => {
            setProductType(res.data);
        })
    }
    const getListProductDetail = () =>{
        axios.get(`https://localhost:7026/api/ProductDetails`)
        .then(res =>{
            setProductDetail(res.data);
        })
    }
    const getListInvoice = () =>{
        axios.get(`https://localhost:7026/api/Invoices`)
        .then(res =>{
            setInvoice(res.data);
        })
    }
    useEffect(()=>{
        getListProductDetail();
        getListUser();
        getListProductType();
        getListInvoice();
        getListImportInvocie()
    },[])
    return ( 
        <>
            <main className="main-container">
                <div className="main-title">
                    <h3>DASHBOARD</h3>
                </div>
                <div className="main-cards">
                    <div className="card">
                        <div className="card-inner">
                            <h3>SẢN PHẨM</h3>
                            <BsFillArchiveFill className="card-icon"/>
                        </div>
                        <h1>{productDetail.length}</h1>
                    </div>
                    <div className="card">
                        <div className="card-inner">
                            <h3>NGƯỜI DÙNG</h3>
                            <BsPeopleFill className="card-icon"/>
                        </div>
                        <h1>{user.length}</h1>
                    </div> 
                    <div className="card">
                        <div className="card-inner">
                            <h3>LOẠI SẢN PHẨM</h3>
                            <BsFillGrid3X3GapFill className="card-icon"/>
                        </div>
                        <h1>{productType.length}</h1>
                    </div>  
                    <div className="card">
                        <div className="card-inner">
                            <h3>HÓA ĐƠN</h3>
                            <PiInvoice className="card-icon"/>
                        </div>
                        <h1>{invoice.length}</h1>
                    </div>
                </div>
                <div> 
                    <h1>Doanh thu</h1>
                    <div className="charts">
                        <Dropdown className="display justify-content-end">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Năm
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    uniqueArray.map((item) =>{
                                        return(
                                            <Dropdown.Item onClick={() => filterYears(item)}>{item}</Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <DoanhThuChart 
                            arr = {yearsDoanhThu}
                        />
                    </div>
                </div>
                <div>
                    <h1>Lợi nhuận</h1>
                    <div className="charts">
                        <Dropdown className="display justify-content-end">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Năm
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    uniqueLoiNhuan.map((item) =>{
                                        return(
                                            <Dropdown.Item onClick={() => filterYearsLoiNhuan(item)}>{item}</Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <LoiNhuanChart 
                            arrImportInvoice = {yearsLoiNhuan}
                            arrInvoice = {yearsLoiNhuan1}
                        />
                    </div>
                </div>
            </main>   
        </>
     );
}
 
export default HomeAdmin;