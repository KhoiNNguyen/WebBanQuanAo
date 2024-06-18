import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table } from "react-bootstrap";
import ProductDetailCreate from "./ProductDetailCreate";
import { ToastContainer} from 'react-toastify';
import ProductDetailEdit from "./ProductDetailEdit";
import ProductDetailDelete from "./ProductDetailDelete";
import ReactPaginate from "react-paginate";

const ProductDetailAdmin = () => {
    const [productDetail, setProductDetail] = useState([]);

    const [data, setData] = useState({});
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [key, setKey] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleClose = () =>{
        setShowCreate(false);
        setShowEdit(false)
        setShowDelete(false)
    }
    const handleShowEdit = (data) =>{
        setShowEdit(true);
        setData(data)
    }
    const handleShowDelete = (data) =>{
        setShowDelete(true);
        setData(data)
    }

    //Phân trang
    const productDetailPerPage = 6
    const indexOfLast = productDetailPerPage * currentPage
    const indexOfFirst = indexOfLast - productDetailPerPage

    const totalProductDetail = key.length
    const totalPages = Math.ceil(totalProductDetail / productDetailPerPage)
    const currentProductDetail = key.slice(indexOfFirst, indexOfLast)

    const handlePageClick = (e) =>{
        setCurrentPage(+e.selected + 1)
    }

    //Thay đổi trạng thái load trang
    const handleRefesh = () =>{
        getListProductDetail()
    }
    const handleOnchangeCheckTrue = () =>{
        const filter = productDetail.filter(f => {
            return f.status === true;
        })
        setKey(filter);
    }
    const handleOnchangeCheckFalse = () =>{
        const filter = productDetail.filter(f => {
            return f.status === false;
        })
        setKey(filter);
    }


    //Tìm kiếm
    const handleChangeSearch = (e) =>{
        setSearchTerm(e.target.value)
        filterProductType(e.target.value)
    }
    const filterProductType = (searchTerm) =>{
        const filtered = productDetail.filter((item) =>
            item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setCurrentPage(1);
    }

    //Lấy danh sách
    const getListProductDetail = () =>{
        axios.get(`https://localhost:7026/api/ProductDetails`)
        .then(res =>{
            setProductDetail(res.data);
            setKey(res.data)
        })
    }
    useEffect(()=>{
        getListProductDetail();
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
                            <FontAwesomeIcon icon={faPlus}/> Create
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
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Thương hiệu</th>
                            <th>Loại sản phẩm</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentProductDetail.map((item, index) =>{
                                return(
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={`https://localhost:7026/images/products/${item.thumbnail}`} alt="hình ảnh loại sản phấm" style={{width: "170px",height: "200px"}}/>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.brand.name}</td>
                                        <td>{item.productType.name}</td>
                                        <td>{item.status?"Còn hàng":"Hết hàng"}</td>
                                        <td>
                                            {item.status === true?
                                                <Form>
                                                    <Button variant="primary" onClick={() =>{handleShowEdit(item)}}>
                                                        <FontAwesomeIcon icon={faEdit} className="color-black"/>
                                                    </Button>
                                                    <Button variant="danger" onClick={() =>{handleShowDelete(item)}}>
                                                        <FontAwesomeIcon icon={faTrash} className="color-black"/>
                                                    </Button>
                                                </Form>
                                                :
                                                <Button variant="primary" onClick={() =>{handleShowEdit(item)}}>
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
            <ProductDetailCreate
                show= {showCreate}
                handleClose = {handleClose}
            />
            <ProductDetailEdit
                show = {showEdit}
                handleClose = {handleClose}
                data = {data}
            />
            <ProductDetailDelete
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
 
export default ProductDetailAdmin;