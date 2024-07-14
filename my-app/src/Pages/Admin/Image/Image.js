import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table, ToastContainer } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ImageCreate from "./ImageCreate";

const Image = () => {
    const [image, setImage] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [key, setKey] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClose = () =>{
        setShowCreate(false)
    }
    const handleShowEdit = () =>{

    }
    const handleShowDelete = () =>{

    }
    //Phân trang
    const imagePerPage = 20
    const indexOfLast = imagePerPage * currentPage
    const indexOfFirst = indexOfLast - imagePerPage

    const totalImage = key.length
    const totalPages = Math.ceil(totalImage / imagePerPage)
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
        const filtered = image.filter((item) =>
            item.product.name && item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setCurrentPage(1);
    }
    const handleRefesh = () =>{
        getListImage()
    }
    const getListImage = () =>{
        axios.get(`https://localhost:7026/api/Images`)
        .then(res => {
            setImage(res.data)
            setKey(res.data)
        })
    }
    useEffect(()=>{
        getListImage();
    },[])
    return ( 
        <>
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
            <Button
                variant="success" 
                className="margin-top-10px"
                onClick={handleRefesh}
            >
                Refesh
            </Button>
            <Table className="margin-top-10px">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Sản Phẩm</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentInvoice.map((item,index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.product?.name}</td>
                                    <td>
                                        <Form>
                                            <Button variant="primary"  onClick={() =>  handleShowEdit(item)}>
                                                <FontAwesomeIcon icon={faEdit} className="color-black"/>
                                            </Button>
                                            <Button variant="danger" onClick={() =>  handleShowDelete(item)}>
                                                <FontAwesomeIcon icon={faTrash} className="color-black"/>
                                            </Button>
                                        </Form>
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
            <ImageCreate 
                show = {showCreate}
                handleClose = {handleClose}
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
 
export default Image;