import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Table } from "react-bootstrap";
import UserCreate from "./UserCreate";
import { ToastContainer } from "react-toastify";
import UserDelete from "./UserDelete";
import UserEdit from "./UserEdit";
import ReactPaginate from "react-paginate";

const User = () => {
    const [user, setUser] = useState([]);
    const [data, setData] = useState({});
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [key, setKey] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const handleClose = () =>{
        setShowCreate(false)
        setShowDelete(false)
    }
    const handleShowDelete = (data) =>{
        setData(data)
        setShowDelete(true)
    }
    const handleShowEdit = (data) => {
        setData(data)
        setShowEdit(true)
    }
    //Phân trang
    const userPerPage = 6
    const indexOfLast = userPerPage * currentPage
    const indexOfFirst = indexOfLast - userPerPage

    const totalUser = key.length
    const totalPages = Math.ceil(totalUser / userPerPage)
    const currentUser = key.slice(indexOfFirst,indexOfLast)

    const handlePageClick = (e) =>{
        setCurrentPage(+e.selected + 1)
    }

    //Thay đổi trạng thái load trang
    const handleRefesh = () =>{
        window.location.reload()
    }
    const handleOnchangeCheckTrue = () =>{
        const filter = user.filter(f => {
            return f.status === true;
        })
        setKey(filter);
    }
    const handleOnchangeCheckFalse = () =>{
        const filter = user.filter(f => {
            return f.status === false;
        })
        setKey(filter);
    }

    //Tìm kiếm
    const handleChangeSearch = (e) =>{
        setSearchTerm(e.target.value)
        filterProducts(e.target.value)
    }
    const filterProducts = (searchTerm) =>{
        const filtered = user.filter((item) =>
            item.userName && item.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setCurrentPage(1);
    }

    const getListUser = () =>{
        axios.get('https://localhost:7026/api/Users')
        .then(res => {
            setUser(res.data)
            setKey(res.data)
        })
    }
    useEffect(()=>{
        getListUser();
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
                            <td>STT</td>
                            <td>Họ và tên</td>
                            <td>Tài khoản</td>
                            <td>SDT</td>
                            <td>Địa chỉ</td>
                            <td>Trạng thái</td>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentUser.map((item,index) =>{
                                return ( 
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>
                                        <td>{item.status?"Hoạt động":"Ngưng hoạt đông"}</td>
                                        <td>
                                            {
                                                item.status === true?
                                                <Form>
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
            <UserCreate 
                show = {showCreate}
                handleClose = {handleClose}
            />
            <UserEdit
                show = {showEdit}
                handleClose = {handleClose}
                data = {data}
            />
            <UserDelete
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
 
export default User;