import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table } from "react-bootstrap";
import './Color.css'
import ColorCreate from "./ColorCreate";
import { ToastContainer } from "react-toastify";
import ColorEdit from "./ColorEdit";
import ColorDelete from "./ColorDelete";
import ReactPaginate from "react-paginate";

const Color = () => {
    const [color, setColor] = useState([]);
    const [key, setKey] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);  
    const [searchTerm, setSearchTerm] = useState('');
    const [listFalse, setlistFalse] = useState([]);
    const [check, setCheck] = useState(true);

    const handleClose = () =>{
        setShowCreate(false)
        setShowEdit(false)
        setShowDelete(false)
    }
    const handleShowEdit = (data) => {
        setData(data)
        setShowEdit(true)
    }
    const handleShowDelete = (data) => {
        setData(data)
        setShowDelete(true)
    }

    //Chuyển trang
    const colorsPerPage = 6;
    const indexOfLast = currentPage * colorsPerPage
    const indexOfFirst = indexOfLast - colorsPerPage
    
    const totalColors = key.length
    const totalPages = Math.ceil(totalColors / colorsPerPage)
    const currentColorsTrue = (key.slice(indexOfFirst, indexOfLast));

    const totalColorsFalse = listFalse.length; // Tổng số sản phẩm false
    const totalPagesFalse = Math.ceil(totalColorsFalse / colorsPerPage);// Tổng số trang hiển thị false
    const currentColorsFalse = (listFalse.slice(indexOfFirst, indexOfLast));

    const handlePageClick = (e) =>{
        setCurrentPage(+e.selected + 1)
        getListColor(+e.selected + 1)
    }

    //Tìm Kiếm
    const handleChangeSearch = (e) =>{
        setSearchTerm(e.target.value)
        filterColors(e.target.value)
    }
    const filterColors = (searchTerm) =>{
        const filtered = color.filter((item) =>
            item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setlistFalse(filtered)
        setCurrentPage(1);
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
        const filter = color.filter(f => {
            return f.status === false;
        })
        setlistFalse(filter);
    }

    //Lấy danh sách
    const getListColor = () =>{
        axios.get(`https://localhost:7026/api/Colors`)
        .then((res) => {
            setColor(res.data)
            setKey(res.data)
        })
    }
    useEffect(()=>{
        getListColor()
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
                            <th className="width-100-px">STT</th>
                            <th className="width-100-px">Id</th>
                            <th className="width-400-px">Tên</th>
                            <th >Trạng Thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            check === true ? (
                                currentColorsTrue.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.status?"Hoạt động":"Ngưng hoạt động"}</td>
                                            <td>
                                                {item.status === true?
                                                        <Form>
                                                            <Button variant="primary" onClick={() =>  handleShowEdit(item)}>
                                                                <FontAwesomeIcon icon={faEdit} style={{color:"black"}}/>
                                                            </Button>
                                                            <Button variant="danger" onClick={() =>  handleShowDelete(item)}>
                                                                <FontAwesomeIcon icon={faTrash} style={{color:"black"}}/>
                                                            </Button>
                                                        </Form>
                                                        :
                                                        <Button variant="primary" onClick={() =>  handleShowEdit(item)}>
                                                            <FontAwesomeIcon icon={faEdit} style={{color:"black"}}/>
                                                        </Button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                            :
                            currentColorsFalse.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.status?"Hoạt động":"Ngưng hoạt động"}</td>
                                        <td>
                                            {item.status === true?
                                                    <Form>
                                                        <Button variant="primary" onClick={() =>  handleShowEdit(item)}>
                                                            <FontAwesomeIcon icon={faEdit} style={{color:"black"}}/>
                                                        </Button>
                                                        <Button variant="danger" onClick={() =>  handleShowDelete(item)}>
                                                            <FontAwesomeIcon icon={faTrash} style={{color:"black"}}/>
                                                        </Button>
                                                    </Form>
                                                    :
                                                    <Button variant="primary" onClick={() =>  handleShowEdit(item)}>
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
            <ColorCreate
                show={showCreate} 
                handleClose={handleClose}
            />
            <ColorEdit
                show={showEdit}
                handleClose={handleClose}
                data={data}
            />
            <ColorDelete
                show={showDelete}
                handleClose={handleClose}
                data={data}
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
 
export default Color;