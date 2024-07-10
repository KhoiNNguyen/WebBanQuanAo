import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table } from "react-bootstrap";
import InvoiceCreate from "./InvoiceCreate";
import InvoiceEdit from "./InvoiceEdit";
import InvoiceDelete from "./InvoiceDelete";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";

const Invoice = () => {
    const [invoice, setIncoice] = useState([]);
    const [data, setData] = useState({});
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [key, setKey] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClose = () =>{
        setShowCreate(false);
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
    //Phân trang
    const invoicePerPage = 6
    const indexOfLast = invoicePerPage * currentPage
    const indexOfFirst = indexOfLast - invoicePerPage

    const totalInvoice = key.length
    const totalPages = Math.ceil(totalInvoice / invoicePerPage)
    const currentInvoice = key.slice(indexOfFirst,indexOfLast)

    const handlePageClick = (e) =>{
        setCurrentPage(+e.selected + 1)
    }
    //Tìm kiếm
    const handleChangeSearch = (e) =>{
        setSearchTerm(e.target.value)
        filterProducts(e.target.value)
    }
    const filterProducts = (searchTerm) =>{
        const filtered = invoice.filter((item) =>
            item.user.userName && item.user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setCurrentPage(1);
    }
    //Lấy danh sách
    const getListInvoice = () =>{
        axios.get(`https://localhost:7026/api/Invoices`)
        .then(res =>{
            setIncoice(res.data);
            setKey(res.data)
        })
    }
    useEffect(() => {
        getListInvoice();
    },[])

    function formatPrice(price) {
        price = parseInt(price);
        return price.toLocaleString("vi-VN") + "đ";
      }
    return ( 
        <>
            <div className="">
                <Form className="display">
                    <FormGroup className="width-80-percent">
                        <input type="text" className="width-100-percent height-40-px" placeholder="Tìm kiếm" onChange={handleChangeSearch} value={searchTerm}/>
                    </FormGroup>
                    <FormGroup className="justify-content-end display width-20-percent ">
                        <Button variant="success" onClick={() =>  setShowCreate(true) } >
                            <FontAwesomeIcon icon={faPlus} /> Create
                        </Button>
                    </FormGroup>
                </Form>
                <Table className="margin-top-10px">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>InvoiceDate</th>
                            <th>AddressShip</th>
                            <th>Total</th>
                            <th>discoundTotal</th>
                            <th>User</th>
                            <th>PaymentMethod</th>
                            <th>Voucher</th>
                            <th>PaymentStatus</th>
                            <th>ShippingStatus</th>
                            <th>Chứ năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentInvoice.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.invoiceDate}</td>
                                        <td>{item.addressShip}</td>
                                        <td>{formatPrice(item.total)}</td>
                                        <td>{formatPrice(item.discoundTotal)}</td>
                                        <td>{item.user.userName}</td>
                                        <td>{item.paymentMethod.name}</td>
                                        <td>{item.voucher?.discount?formatPrice(item.voucher.discount):0}</td>
                                        <td>{item.paymentStatus.name}</td>
                                        <td>{item.shippingStatus.name}</td>
                                        <td>
                                            {
                                                item.paymentStatus.id !== 5 || item.paymentStatus.id !== 8?
                                                <Form>
                                                    <Button variant="primary"  onClick={() =>  handleShowEdit(item)}>
                                                        <FontAwesomeIcon icon={faEdit} className="color-black"/>
                                                    </Button>
                                                    <Button variant="danger" onClick={() =>  handleShowDelete(item)}>
                                                        <FontAwesomeIcon icon={faTrash} className="color-black"/>
                                                    </Button>
                                                </Form>
                                                :
                                                <Button variant="primary"  onClick={() =>  handleShowEdit(item)}>
                                                    <FontAwesomeIcon icon={faEdit} className="color-black"/>
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
            <InvoiceCreate
                show = {showCreate}
                handleClose = {handleClose}
            />
            <InvoiceEdit
                show = {showEdit}
                handleClose = {handleClose}
                data = {data}
            />
            <InvoiceDelete
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
 
export default Invoice;