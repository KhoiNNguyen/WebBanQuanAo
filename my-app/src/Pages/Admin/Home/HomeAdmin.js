import { useEffect, useState } from 'react';
import './Home.css'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from "react-icons/bs";
import { PiInvoice } from 'react-icons/pi';
import axios from 'axios';
import HomeChart from './HomeChart';

const HomeAdmin = () => {
    const [productDetail, setProductDetail] = useState([]);
    const [user, setUser] = useState([]);
    const [productType, setProductType] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const getListUser = () =>{
        axios.get(`https://localhost:7026/api/Users`)
        .then(res =>{
            setUser(res.data);
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
    },[])
    var arr = [
        {
            invoiceDate : "2024-06-17T14:39:28.362Z",
            total: 200,
        },
        {
            invoiceDate : "10-01-2003",
            total: 100,
        },
        {
            invoiceDate : "10-01-2003",
            total: 100,
        },
        {
            invoiceDate : "10-02-2003",
            total: 200,
        },
        {
            invoiceDate : "10-03-2003",
            total: 300,
        },
        {
            invoiceDate : "10-03-2003",
            total: 300,
        },
        {
            invoiceDate : "10-03-2003",
            total: 300,
        },
        {
            invoiceDate : "10-04-2003",
            total: 400,
        },
        {
            invoiceDate : "10-07-2003",
            total: 200,
        },
        {
            invoiceDate : "2024-06-17T14:39:28.362Z",
            total: 200,
        },
        {
            invoiceDate : "10-08-2003",
            total: 300,
        },
        {
            invoiceDate : "10-09-2003",
            total: 400,
        },
        {
            invoiceDate : "10-10-2003",
            total: 500,
        },
        {
            invoiceDate : "10-11-2003",
            total: 500,
        },
        {
            invoiceDate : "10-12-2003",
            total: 600,
        },
        {
            invoiceDate : "10-05-2003",
            total: 500,
        },
    ]
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
                <div className="charts">
                    <HomeChart 
                        arr = {arr}
                    />

                </div>
            </main>
            
        </>
     );
}
 
export default HomeAdmin;