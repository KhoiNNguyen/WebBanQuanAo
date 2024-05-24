import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table } from "react-bootstrap";
import ProductSaleCreate from "./ProductSaleCreate";
import ProductSaleEdit from "./ProductSaleEdit";
import ProductSaleDelete from "./ProductSaleDelete";
import ReactPaginate from "react-paginate";
import { ToastContainer} from 'react-toastify';

const ProductSale = () => {
    const [productSale, setProductSale] = useState([]);

    const [data, setData] = useState({});
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [key, setKey] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [check, setCheck] = useState(true);
    const [listFalse, setlistFalse] = useState([]);

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

    //Chuyển trang
    const productSalePerPage = 6
    const indexOfLast = productSalePerPage * currentPage
    const indexOfFirst = indexOfLast - productSalePerPage

    const totalProductSale = key.length
    const totalPages = Math.ceil(totalProductSale / productSalePerPage)
    const currentProductSale = key.slice(indexOfFirst,indexOfLast)

    const totalProductSaleFalse = listFalse.length
    const totalPagesFalse = Math.ceil(totalProductSaleFalse / productSalePerPage)
    const currentProductSaleFalse = listFalse.slice(indexOfFirst,indexOfLast)

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1)
        getListProductSale(+e.selected + 1)
    }

    //Thay đổi trạng thái load trang
    const handleRefesh = () =>{
        window.location.reload()
    }
    const handleOnchangeCheckTrue = () =>{
        setCheck(true);
    }
    const handleOnchangeCheckFalse = () =>{
        setCheck(false);
        const filter = productSale.filter(f => {
            return f.status === false;
        })
        setlistFalse(filter);
    }

    //Tìm kiếm
    const handleChangeSearch = (e) =>{
        setSearchTerm(e.target.value)
        filterProductSale(e.target.value)
    }
    const filterProductSale = (searchTerm) =>{
        const filtered = productSale.filter((item) =>
            item.ghiChu && item.ghiChu.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setlistFalse(filtered)
        setCurrentPage(1);
    }
    
    //Lấy danh sách
    const getListProductSale = () =>{
        axios.get(`https://localhost:7026/api/ProductSales`)
        .then(res => {
            setProductSale(res.data);
            setKey(res.data)
        })
    }
    useEffect(()=>{
        getListProductSale();
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
                        Tất Cả
                    </Button>
                    <Button 
                    onClick={handleOnchangeCheckFalse}
                        >
                        Ngưng hoạt động
                    </Button>
                </Form>
                <Table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Id</th>
                            <th>Thời gian bắt đầu</th>
                            <th>Thời gian kết thúc</th>
                            <th>Phần trăm giảm giá</th>
                            <th>Ghi chú</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            check === true ?(
                                currentProductSale.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.startTime}</td>
                                            <td>{item.endDate}</td>
                                            <td>{item.percentDiscount}</td>
                                            <td>{item.ghiChu}</td>
                                            <td>{item.status?"Hoạt động":"Ngưng hoạt động"}</td>
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
                            )
                            :
                            currentProductSaleFalse.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.startTime}</td>
                                        <td>{item.endDate}</td>
                                        <td>{item.percentDiscount}</td>
                                        <td>{item.ghiChu}</td>
                                        <td>{item.status?"Hoạt động":"Ngưng hoạt động"}</td>
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
                        pageCount={check===true ? totalPages : totalPagesFalse}
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
            <ProductSaleCreate
                show = {showCreate}
                handleClose = {handleClose}
            />
            <ProductSaleEdit
                show = {showEdit}
                handleClose = {handleClose}
                data = {data}
            />
            <ProductSaleDelete
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
 
export default ProductSale;