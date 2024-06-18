import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table } from "react-bootstrap";
import ProductTypeCreate from "./ProductTypeCreate";
import ProductTypeEdit from "./ProductTypeEdit";
import ProductTypeDelete from "./ProductTypeDelete";
import ReactPaginate from "react-paginate";
import './ProductType.css'
import { ToastContainer} from 'react-toastify';

const ProductType = () => {
    const [productType, setProductType] = useState([]);
    const [data, setData] = useState({});
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [key, setKey] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClose = () =>{
        setShowCreate(false)
        setShowEdit(false)
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
    const productTypePerPage = 6
    const indexOfLast = productTypePerPage * currentPage
    const indexOfFirst = indexOfLast - productTypePerPage

    const totalProductType = key.length
    const totalPages = Math.ceil(totalProductType / productTypePerPage)
    const currentProductType = key.slice(indexOfFirst,indexOfLast)

    const handlePageClick = (e) =>{
        setCurrentPage(e.selected + 1)
    }

    //Thay đổi trạng thái load trang
    const handleRefesh = () =>{
        getListProductType()
    }
    const handleOnchangeCheckTrue = () =>{
        const filter = productType.filter(f => {
            return f.status === true;
        })
        setKey(filter);
    }
    const handleOnchangeCheckFalse = () =>{
        const filter = productType.filter(f => {
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
        const filtered = productType.filter((item) =>
            item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setCurrentPage(1);
    }

    //Lấy danh sách
    const getListProductType = () =>{
        axios.get(`https://localhost:7026/api/ProductTypes`)
        .then(res => {
            setProductType(res.data);
            setKey(res.data)
        })
    }
    useEffect(()=>{
        getListProductType();
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
                            <th className="width-100-px">STT</th>
                            <th className="width-100-px">Id</th>
                            <th className="width-200-px">Hình ảnh</th>
                            <th className="width-200-px">Loại sản phẩm</th>
                            <th className="width-150-px">Giới tính</th>
                            <th className="width-150-px">Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            currentProductType.map((item,index) => (
                                <tr key={index} >
                                    <td>{index+1}</td>
                                    <td>{item.id}</td>
                                    <td>
                                        <img src={`https://localhost:7026/images/ProductType/${item.thumbnail}`} alt="hình ảnh loại sản phấm" style={{width: "100px",height: "100px"}}/>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.gender.name}</td>
                                    <td>{item.status?"Hoạt động":"Ngưng hoạt động"}</td>
                                    <td>
                                    {item.status === true?
                                                <Form>
                                                    <Button variant="primary" onClick={() => handleShowEdit(item)} >
                                                        <FontAwesomeIcon icon={faEdit} className="color-black"/>
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleShowDelete(item)}>
                                                        <FontAwesomeIcon icon={faTrash} className="color-black"/>
                                                    </Button>
                                                </Form>
                                                :
                                                <Button variant="primary" onClick={() => handleShowEdit(item)} >
                                                    <FontAwesomeIcon icon={faEdit} className="color-black"/>
                                                </Button>
                                            }
                                    </td>
                                </tr>
                            ))
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
            <ProductTypeCreate
                show = {showCreate}
                handleClose = {handleClose}
            />
            <ProductTypeEdit
                show = {showEdit}
                handleClose = {handleClose}
                data = {data}
            />
            <ProductTypeDelete
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
 
export default ProductType;