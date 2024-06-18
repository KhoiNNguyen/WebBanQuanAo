import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table } from "react-bootstrap";
import VoucherCreate from "./VoucherCreate";
import VoucherEdit from "./VoucherEdit";
import VoucherDelete from "./VoucherDelete";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";

const Voucher = () => {
    const [voucher, setVoucher] = useState([]);

    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [data, setData] = useState({});
    const [key, setKey] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState('');


    const handleClose = () =>{
        setShowCreate(false);
        setShowEdit(false)
        setShowDelete(false)
    }
    const handleShowEdit = (data) =>{
        setData(data)
        setShowEdit(true)
    }
    const handleShowDelete = (data) =>{
        setData(data)
        setShowDelete(true)
    }

    //Chuyển trang
    const voucherPerPage = 6
    const indexOfLast = currentPage * voucherPerPage
    const indexOfFirst = indexOfLast - voucherPerPage

    const totalVoucher = key.length
    const totalPages = Math.ceil(totalVoucher / voucherPerPage)
    const currentVoucherTrue = (key.slice(indexOfFirst, indexOfLast))

    const handlePageClick = (e) =>{
        setCurrentPage(+e.selected + 1)
    }

    //Thay đổi trạng thái load trang
    const handleRefesh = () =>{
        getListVoucher()
    }
    const handleOnchangeCheckTrue = () =>{
        const filter = voucher.filter(f => {
            return f.status === true;
        })
        setKey(filter);
    }
    const handleOnchangeCheckFalse = () =>{
        const filter = voucher.filter(f => {
            return f.status === false;
        })
        setKey(filter);
    }

    //Tìm kiếm
    const handleChangeSearch = (e) =>{
        setSearchTerm(e.target.value)
        filterVouchers(e.target.value)
    }
    const filterVouchers = (searchTerm) =>{
        const filtered = voucher.filter((item) =>
            item.voucherCode && item.voucherCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setCurrentPage(1);
    }

    //Lấy danh sách
    const getListVoucher = () =>{
        axios.get(`https://localhost:7026/api/Vouchers`)
        .then(res =>{
            setVoucher(res.data);
            setKey(res.data);
        })
    }
    useEffect(() => {
        getListVoucher();
    },[])
    return ( 
        <>
            <div className="container">
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
                <Form className="margin-top-10px">
                    <Button
                        variant="success" 
                        className="margin-right-10px"
                        onClick={handleRefesh}
                        >
                        Refesh
                    </Button>
                    <Button 
                        className="margin-right-10px"
                        onClick={handleOnchangeCheckTrue}
                        >
                        Hoạt động
                    </Button>
                    <Button 
                        onClick={handleOnchangeCheckFalse}
                        >
                        Ngưng hoạt động
                    </Button>
                </Form>
                <Table className="margin-top-10px">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>VoucherCode</th>
                            <th>Giá giảm</th>
                            <th>Thời gian bắt đầu</th>
                            <th>Thời gian kết thúc</th>
                            <th>Ghi chú</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentVoucherTrue.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.voucherCode}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.startTime}</td>
                                        <td>{item.endDate}</td>
                                        <td>{item.description}</td>
                                        <td>{item.status?"Hoạt động" : "Ngưng hoạt đông"}</td>
                                        <td>
                                            {item.status === true?(
                                                <Form>
                                                    <Button variant="primary" onClick={() => handleShowEdit(item)}>
                                                        <FontAwesomeIcon icon={faEdit} style={{color:"black"}}/>
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleShowDelete(item)}>
                                                        <FontAwesomeIcon icon={faTrash} style={{color:"black"}}/>
                                                    </Button>
                                                </Form>
                                            )
                                                :
                                                <Button variant="primary" onClick={() => handleShowEdit(item)}>
                                                    <FontAwesomeIcon icon={faEdit} style={{color:"black"}}/>
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
            <VoucherCreate
                show = {showCreate}
                handleClose = {handleClose}
            />
            <VoucherEdit
                show = {showEdit}
                handleClose = {handleClose}
                data = {data}
            />
            <VoucherDelete
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
 
export default Voucher;