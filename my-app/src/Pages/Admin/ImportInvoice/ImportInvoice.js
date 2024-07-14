import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table, ToastContainer } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { CiExport } from "react-icons/ci";
import Create from "./Create";
import Edit from "./Edit";
import Delete from "./Delete";
import ReactPaginate from "react-paginate";

const ImportInvoice = () => {
    const [importInvoice, setImportInvoice] = useState([]);
    const [key, setKey] = useState([]);
    const [showCreate, setshowCreate] = useState(false);
    const [showEdit, setshowEdit] = useState(false);
    const [showDelete, setshowDelete] = useState(false);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);  
    const [searchTerm, setSearchTerm] = useState('');

    const  handleClose = () => {
        setshowCreate(false) ;
        setshowEdit(false) ;
        setshowDelete(false) ;
    }

    const handleShowEdit = (data) =>{
        setData(data)
        setshowEdit(true)
    }

    const handleShowDelete = (data) =>{
        setData(data)
        setshowDelete(true)
    }

    //Chuyển trang
    const PerPage = 6; // Số sản phẩm mỗi trang
    const indexOfLastBrand = currentPage * PerPage;//Tính toán chỉ số của sản phẩm đầu tiên
    const indexOfFirstBrand = indexOfLastBrand - PerPage;// Tính toán chỉ số của sản phẩm cuối cùng

    const totalImportInvoice = key.length; // Tổng số sản phẩm
    const totalPages = Math.ceil(totalImportInvoice / PerPage);// Tổng số trang hiển thị
    const currentImportInvoice = (key.slice(indexOfFirstBrand, indexOfLastBrand));

    const handlePageClick = (e) =>{
        setCurrentPage(+e.selected + 1)
    }

    //Tìm kiếm
    const handleChangeSearch = (e) =>{
        setSearchTerm(e.target.value)
        filterImportInvoice(e.target.value);
    }
    const filterImportInvoice = (searchTerm) =>{
        const filtered = importInvoice.filter((item) =>
            (item.invoiceTime && item.invoiceTime.toLowerCase().includes(searchTerm.toLowerCase()))
            || 
            (item.address && item.address.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setKey(filtered);
        setCurrentPage(1);
    }
    //Thay đổi trang thành trạng thái hoạt động hoặc không hoạt động
    const handleRefesh = () =>{
        getListImportInvocie()
     }
    const handleOnchangeCheckFalse = () => {
        const filter = importInvoice.filter(f => {
            return f.status === false;
        })
        setKey(filter);
    }
    const handleOnchangeCheckTrue = () => {
        const filter = importInvoice.filter(f => {
            return f.status === true;
        })
        setKey(filter);
    }

    const getListImportInvocie = () =>{
        axios.get(`https://localhost:7026/api/ImportInvoices`)
        .then(res => {
            setImportInvoice(res.data);
            setKey(res.data)
        })
    }
    useEffect(() => {
        getListImportInvocie();
    },[])
    return ( 
        <>
            <div className="margin-top-10px">
                <Form className="display">
                    <FormGroup className="width-80-percent">
                        <input type="text" className="width-100-percent height-40-px" placeholder="Tìm kiếm" onChange={handleChangeSearch} value={searchTerm}/>
                    </FormGroup>
                    <FormGroup className="justify-content-end display width-20-percent ">
                        
                        <Button variant="success" onClick={() =>  setshowCreate(true) } >
                            <FontAwesomeIcon icon={faPlus} /> Create
                        </Button>
                    </FormGroup>
                </Form>
                <Form className="margin-top-10px display ">
                    <div className="width-80-percent">
                        <Button
                            variant="success" 
                            className="margin-right-10px"
                            onClick={handleRefesh } >
                            Refesh
                        </Button>
                        <Button 
                            className="margin-right-10px"
                            onClick={handleOnchangeCheckTrue } >
                            Hoạt động
                        </Button>
                        <Button 
                            onClick= {handleOnchangeCheckFalse} 
                            className="margin-right-10px">
                            Ngưng hoạt động
                        </Button>
                    </div>
                    <div className="width-20-percent justify-content-end display">
                        <CSVLink 
                            data={importInvoice} 
                            separator={";"}
                            filename={"hoa_don_nhap.csv"}
                            className="btn btn-primary"
                        > <CiExport /> Export</CSVLink>
                    </div>  
                </Form>
                <Table className="margin-top-10px">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã hóa đơn</th>
                            <th>Ngày lập hóa đơn</th>
                            <th>Địa chỉ</th>
                            <th>Phương thức thanh toán</th>
                            <th>Tổng</th>
                            <th>Trạng Thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentImportInvoice.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.invoiceTime}</td>
                                        <td>{item.address}</td>
                                        <td>{item.paymentMethod.name}</td>
                                        <td>{item.total}</td>
                                        <td>{item.status?"Hoạt động":"Ngưng hoạt động"}</td>
                                        <td>
                                            {item.status === true?(
                                                <Form>
                                                    <Button variant="primary" onClick={() =>  handleShowEdit(item)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} style={{color:"black"}}/>
                                                    </Button>
                                                    <Button variant="danger" onClick={() =>  handleShowDelete(item)}>
                                                        <FontAwesomeIcon icon={faTrash} style={{color:"black"}}/>
                                                    </Button>
                                                </Form>
                                            )
                                                :
                                                <Button variant="primary" onClick={() =>  handleShowEdit(item)}>
                                                    <FontAwesomeIcon icon={faPenToSquare} style={{color:"black"}}/>
                                                </Button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <div className="pagination-container">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={3}
                        pageCount={totalPages}
                        previousLabel="< previous"

                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </div>
            </div>
            <Create 
                show = {showCreate}
                handleClose = {handleClose}
            />
            <Edit 
                show = {showEdit}
                handleClose = {handleClose}
                data = {data}
            />
            <Delete 
                show = {showDelete}
                handleClose = {handleClose}
                data = {data}
            />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
     );
}
 
export default ImportInvoice;