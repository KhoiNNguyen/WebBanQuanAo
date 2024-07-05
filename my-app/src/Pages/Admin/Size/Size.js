import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table } from "react-bootstrap";
import './Size.css'
import SizeEdit from "./SizeEdit";
import SizeDelete from "./SizeDelete";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";
import SizeCreate from "./SizeCreate";
import { CiExport, CiImport } from "react-icons/ci";
import { CSVLink } from "react-csv";
import SizeImport from "./SizeImport";


const Size = () => {
    const [size, setSize] = useState([]);
    const [data, setData] = useState({});
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [key, setKey] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showImport, setShowImport] = useState(false);


    const handleClose = () =>{
        setShowCreate(false)
        setShowEdit(false)
        setShowDelete(false)
        setShowImport(false)
    }
    const handleShowEdit = (data) => {
        setData(data)
        setShowEdit(true)
    }
    const handleShowDelete = (data) =>{
        setData(data)
        setShowDelete(true)
    }

    //Chuyển trang
    const sizePerPage = 6
    const indexOfLast = currentPage * sizePerPage
    const indexOfFirst = indexOfLast - sizePerPage

    const totalSize = key.length
    const totalPages = Math.ceil(totalSize / sizePerPage)
    const currentSizeTrue = (key.slice(indexOfFirst, indexOfLast))

    const handlePageClick = (e) =>{
        setCurrentPage(+e.selected + 1)
    }

    //Tìm kiềm
    const handleChangeSearch = (e) =>{
        setSearchTerm(e.target.value)
        filterSizes(e.target.value)
    }
    const filterSizes = (searchTerm) =>{
        const filtered = size.filter((item) =>
            item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setCurrentPage(1);
    }

    //Thay đổi trạng thái load trang
    const handleRefesh = () =>{
        getListSize()
    }
    const handleOnchangeCheckTrue = () =>{
        const filter = size.filter(f => {
            return f.status === true;
        })
        setKey(filter);
    }
    const handleOnchangeCheckFalse = () =>{
        const filter = size.filter(f => {
            return f.status === false;
        })
        setKey(filter);
    }

    //Lấy danh sách
    const getListSize = () =>{
        axios.get(`https://localhost:7026/api/Sizes`)
        .then(res => {
            setSize(res.data)
            setKey(res.data)
        })
    }
    useEffect(()=>{
        getListSize();
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
                            data={size} 
                            separator={";"}
                            filename={"size.csv"}
                            className="btn btn-primary margin-right-10px"
                        > <CiExport /> Export</CSVLink>
                        <form>
                            <label htmlFor="import" className="btn btn-warning"><CiImport/> Import</label>
                            <input 
                                id="import" 
                                hidden
                                onClick={() =>  setShowImport(true)}
                            ></input>
                        </form>
                    </div>  
                </Form>
                <Table className="margin-top-10px">
                    <thead>
                        <tr>
                            <th className="width-100-px">STT</th>
                            <th className="width-400-px">Tên</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentSizeTrue.map((item , index) => (
                                <tr key={index}>
                                    <td>{index +1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.status?"Hoạt động":"Ngưng hoạt động"}</td>
                                    <td>
                                        {item.status === true?
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
            <SizeCreate
                show = {showCreate}
                handleClose = {handleClose}
            />
            <SizeEdit
                show = {showEdit}
                handleClose = {handleClose}
                data = {data}
            />
            <SizeDelete
                show = {showDelete}
                handleClose = {handleClose}
                data = {data}
            />
            <SizeImport
                show = {showImport}
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
 
export default Size;
