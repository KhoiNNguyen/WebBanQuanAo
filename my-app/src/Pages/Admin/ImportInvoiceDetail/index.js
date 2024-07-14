import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table } from "react-bootstrap";
import Create from "./Create";
import { ToastContainer } from "react-toastify";
import Edit from "./Edit";
import Delete from "./Delete";
import { CiExport } from "react-icons/ci";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";

const ImportInvoiceDetail = () => {
    const [importInvoiceDetail, setImportInvoiceDetail] = useState([]);
    const [key, setKey] = useState([]);
    const [showCreate, setshowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);  
    const [searchTerm, setSearchTerm] = useState('');

    const handleClose = () =>{
        setshowCreate(false);
        setShowEdit(false)
        setShowDelete(false)
    }
    const handleShowEdit = (data) =>{
        setShowEdit(true)
        setData(data)
    }
    const handleShowDelete = (data) =>{
        setShowDelete(true)
        setData(data)
    }

    //Chuyển trang
    const PerPage = 6; // Số sản phẩm mỗi trang
    const indexOfLastBrand = currentPage * PerPage;//Tính toán chỉ số của sản phẩm đầu tiên
    const indexOfFirstBrand = indexOfLastBrand - PerPage;// Tính toán chỉ số của sản phẩm cuối cùng

    const totalImportInvoiceDetail = key.length; // Tổng số sản phẩm
    const totalPages = Math.ceil(totalImportInvoiceDetail / PerPage);// Tổng số trang hiển thị
    const currentImportInvoiceDetail = (key.slice(indexOfFirstBrand, indexOfLastBrand));

    const handlePageClick = (e) =>{
        setCurrentPage(+e.selected + 1)
    }

    //Tìm kiếm
    const handleChangeSearch = (e) =>{
        setSearchTerm(e.target.value)
        filterImportInvoice(e.target.value);
    }
    const filterImportInvoice = (searchTerm) =>{
        const filtered = importInvoiceDetail.filter((item) =>
            (item.product.name && item.product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            || 
            (item.product.size.name && item.product.size.name.toLowerCase().includes(searchTerm.toLowerCase()))
            || 
            (item.product.color.name && item.product.color.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setKey(filtered);
        setCurrentPage(1);
    }

    const handleRefesh = () =>{
        getListImportInvoiceDetail()
     }
    //Lấy danh sách
    const getListImportInvoiceDetail = () =>{
        axios.get(`https://localhost:7026/api/ImportInvoiceDetails`)
        .then(res => {
            setImportInvoiceDetail(res.data);
            setKey(res.data)
        })
    }
    useEffect(()=>{
        getListImportInvoiceDetail();
    },[])
    return ( 
        <>
            <div>
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
                    </div>
                    <div className="width-20-percent justify-content-end display">
                        <CSVLink 
                            data={importInvoiceDetail} 
                            separator={";"}
                            filename={"Chi_tiet_hoa_don_nhap.csv"}
                            className="btn btn-primary"
                        > <CiExport /> Export</CSVLink>
                    </div>  
                </Form>
                <Table className="margin-top-10px">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Hóa đơn</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentImportInvoiceDetail.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.importInvoice.id}</td>
                                        <td>{item.product.name} - Màu {item.product.color.name} - Size {item.product.size.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.unitPrice}</td>
                                        <td>
                                            <Button variant="primary"  onClick={() =>  handleShowEdit(item)}>
                                                <FontAwesomeIcon icon={faEdit} className="color-black"/>
                                            </Button>
                                            <Button variant="danger" onClick={() =>  handleShowDelete(item)}>
                                                <FontAwesomeIcon icon={faTrash} className="color-black"/>
                                            </Button>
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
                show={showCreate}
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
 
export default ImportInvoiceDetail;