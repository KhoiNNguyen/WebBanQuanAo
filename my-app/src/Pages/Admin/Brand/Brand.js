import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, FormGroup, Table } from "react-bootstrap";
import BrandCreate from "./BrandCreate";
import './Brand.css'
import { ToastContainer} from 'react-toastify';
// import { Link } from "react-router-dom";
import BrandEdit from "./BrandEdit";
import BrandDelete from "./BrandDelete";
import ReactPaginate from 'react-paginate';
//xuất hiện thông báo: npm install --save-exact react-toastify@8.2.0
//phan trang: npm install react-paginate --save

const Brand = () => {
    const [brands, setBrands] = useState([]);
    const [key, setKey] = useState([]);
    const [showCreate, setshowCreate] = useState(false);
    const [showEdit, setshowEdit] = useState(false);
    const [showDelete, setshowDelete] = useState(false);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);  
    const [searchTerm, setSearchTerm] = useState('');
    const [check, setCheck] = useState(true);
    const [listFalse, setlistFalse] = useState([]);
    // const [number, setNumber] = useState(0);

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

    const handleRefesh = () =>{
        window.location.reload();
    }
    //Thay đổi trang thành trạng thái hoạt động hoặc không hoạt động
    const handleOnchangeCheckFalse = () => {
        setCheck(false);
        const filter = brands.filter(f => {
            return f.status === false;
        })
        setlistFalse(filter);
    }
    const handleOnchangeCheckTrue = () => {
        setCheck(true);
    }
    //Tìm kiếm
    const handleChangeSearch = (e) =>{
        setSearchTerm(e.target.value)
        filterBrands(e.target.value);
    }
    const filterBrands = (searchTerm) =>{
        const filtered = brands.filter((brand) =>
            brand.name && brand.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setlistFalse(filtered)
        setCurrentPage(1);
    }
    
    //Chuyển trang
    const brandsPerPage = 6; // Số sản phẩm mỗi trang
    const indexOfLastBrand = currentPage * brandsPerPage;//Tính toán chỉ số của sản phẩm đầu tiên
    const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;// Tính toán chỉ số của sản phẩm cuối cùng

    const totalBrands = key.length; // Tổng số sản phẩm
    const totalPages = Math.ceil(totalBrands / brandsPerPage);// Tổng số trang hiển thị
    const currentBrandsTrue = (key.slice(indexOfFirstBrand, indexOfLastBrand));

    const totalBrandsFalse = listFalse.length; // Tổng số sản phẩm false
    const totalPagesFalse = Math.ceil(totalBrandsFalse / brandsPerPage);// Tổng số trang hiển thị false
    const currentBrandsFalse = (listFalse.slice(indexOfFirstBrand, indexOfLastBrand));

    const handlePageClick = (e) =>{
        setCurrentPage(+e.selected + 1)
        getBrandList(+e.selected + 1)
    }

    //Lấy danh sách data
    const getBrandList = async () =>{
        axios.get(`https://localhost:7026/api/Brands`)
            .then(res => {
                setBrands(res.data)
                setKey(res.data)
            });
    }
    useEffect(() => {
        getBrandList()
    }, [])
    return ( 
        <>
            <div className="container margin-top-10px">
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
                <Form className="margin-top-10px">
                    <Button
                        variant="success" 
                        className="margin-right-10px"
                        onClick={handleRefesh } >
                        Refesh
                    </Button>
                    <Button 
                        className="margin-right-10px"
                        onClick={handleOnchangeCheckTrue } >
                        Tất Cả
                    </Button>
                    <Button 
                        onClick= {handleOnchangeCheckFalse} >
                        Ngưng hoạt động
                    </Button>
                </Form>
                <Table>
                    <thead>
                        <tr>
                            <th className="width-80-px">STT</th>
                            <th className="width-80-px">Id</th>
                            <th className="width-100-px">Hình ảnh</th>
                            <th style={{width: "400px"}}>Tên</th>
                            <th className="width-100-px">Trạng thái</th>
                            <th className="width-100-px">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            check === true ?(
                                currentBrandsTrue.map((item,index) =>{
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>
                                                <img src={`https://localhost:7026/images/brands/${item.image}`} alt="hình ảnh thương hiệu" style={{width: "50px",height: "50px"}}/>
                                            </td>
                                            <td>{item.name}</td>
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
                            )
                                :
                                currentBrandsFalse.map((item,index) =>{
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>
                                                <img src={`https://localhost:7026/images/brands/${item.image}`} alt="hình ảnh thương hiệu" style={{width: "50px",height: "50px"}}/>
                                            </td>
                                            <td>{item.name}</td>
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
                <BrandCreate 
                    show={showCreate} 
                    handleClose={handleClose}
                />
                <BrandEdit
                    show={showEdit} 
                    handleClose={handleClose}
                    data={data}
                />
                <BrandDelete
                    show={showDelete} 
                    handleClose={handleClose}
                    data={data}
                />
            </div>
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
 
export default Brand;