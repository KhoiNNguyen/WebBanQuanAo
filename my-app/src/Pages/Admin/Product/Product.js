import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table ,Form, FormGroup, Dropdown} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";
import ReactPaginate from "react-paginate";
import { CiExport, CiImport } from "react-icons/ci";
import { CSVLink } from "react-csv";
import ProductImport from "./ProductImport";
import { FaSortAlphaDown } from "react-icons/fa";
import { BsSortDown, BsSortUp } from "react-icons/bs";

const Products = () => {
    const [product, setProduct] = useState([]);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [data, setData] = useState({});
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [key, setKey] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showImport, setShowImport] = useState(false);

    const handleClose = () =>{
        setShowCreate(false);
        setShowEdit(false)
        setShowDelete(false)
        setShowImport(false)
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
    const productPerPage = 10
    const indexOfLast = productPerPage * currentPage
    const indexOfFirst = indexOfLast - productPerPage

    const totalProduct = key.length
    const totalPages = Math.ceil(totalProduct / productPerPage)
    const currentProuduct = key.slice(indexOfFirst,indexOfLast)

    const handlePageClick = (e) =>{
        setCurrentPage(+e.selected + 1)
        // getListProduct(+e.selected + 1)
    }

    //Thay đổi trạng thái load trang
    const handleRefesh = () =>{
        getListProduct()
    }
    const handleOnchangeCheckTrue = () =>{
        const filter = product.filter(f => {
            return f.status === true;
        })
        setKey(filter);
    }
    const handleOnchangeCheckFalse = () =>{
        const filter = product.filter(f => {
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
        const filtered = product.filter((item) =>
            item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKey(filtered);
        setCurrentPage(1);
    }
    //.sort((a,b) => a.price > b.price ? 1 : -1)
    //Sort
    const sortAZ = () =>{
        const sortedName = [...product].sort((a, b) => {
            return a.name.localeCompare(b.name); // Sắp xếp theo tên theo thứ tự từ điển
          });
        setKey(sortedName)
    }
    const sortPriceUp = () =>{
        const sortedPrice = product.sort((a,b) => a.price > b.price ? 1 : -1)
        setKey(sortedPrice)
    }
    const sortPriceDown = () =>{
        const sortedPrice = product.sort((a,b) => a.price > b.price ? -1 : 1)
        setKey(sortedPrice)
    }

    //Filter
    const filterSize = (id) =>{
        const filterSize = product.filter((item) =>{
            return item.sizeId === id
            }
        );
        setKey(filterSize)
    }
    const filterColor = (id) =>{
        const filterColor = product.filter(item =>{
            return item.colorId === id
        })
        setKey(filterColor)
    }

    //Format Price
    function formatPrice(price) {
        price = parseInt(price);
        return price.toLocaleString("vi-VN") + "đ";
      }

    //Lấy danh sách
    const getListProduct = () =>{
        axios.get(`https://localhost:7026/api/Products`)
        .then((res) => {
            setProduct(res.data);
            setKey(res.data)
        })
    }
    const getListSize = () =>{
        axios.get(`https://localhost:7026/api/Sizes`)
        .then(res => {
            setSize(res.data)
        })
    }
    const getListColor = () =>{
        axios.get(`https://localhost:7026/api/Colors`)
        .then((res) => {
            setColor(res.data)
        })
    }
    useEffect(()=>{
        getListProduct();
        getListSize();
        getListColor();
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
                <Form className="margin-top-10px display" >
                    <div className="width-80-percent display">
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
                            Còn hàng
                        </Button>
                        <Button
                            onClick={handleOnchangeCheckFalse}
                            className="margin-right-10px">
                            Hết hàng
                        </Button>
                        <Dropdown className="margin-right-10px">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Size
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    size.map(item =>{
                                        return(
                                            <Dropdown.Item onClick={() => filterSize(item.id)}>{item.name}</Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="margin-right-10px">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Color
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    color.map(item =>{
                                        return(
                                            <Dropdown.Item onClick={() => filterColor(item.id)}>{item.name}</Dropdown.Item>
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown >
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Giá
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => sortPriceDown()}>Giảm dần <BsSortDown/></Dropdown.Item>
                                <Dropdown.Item onClick={() =>sortPriceUp()}>Tăng dần <BsSortUp/></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="width-20-percent justify-content-end display">
                        <CSVLink 
                            data={product} 
                            separator={";"}
                            filename={"BienTheSanpham.csv"}
                            className="btn btn-primary margin-right-10px"
                        > <CiExport /> Export</CSVLink>
                        <form>
                            <label htmlFor="import" className="btn btn-warning"><CiImport /> Import</label>
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
                            <th>STT</th>
                            <th style={{width: "250px"}}>
                                Tên sản phẩm
                                <button style={{border: "none",backgroundColor: "white",marginLeft: "5px"}} onClick={()=>sortAZ()}><FaSortAlphaDown /></button> 
                            </th>
                            <th>Giá</th>
                            <th>Size</th>
                            <th>Màu</th>
                            <th>Số lượng</th>
                            <th>Giảm giá SP</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentProuduct.map((item,index) =>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{formatPrice(item.price)}</td>
                                        <td>{item.size.name}</td>
                                        <td>{item.color.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.productSale.percentDiscount}%</td>
                                        <td>{item.status?"Còn hàng":"Hết hàng"}</td>
                                        <td>
                                            {item.status === true?
                                                <Form>
                                                    <Button variant="primary" onClick={() => handleShowEdit(item)}>
                                                        <FontAwesomeIcon icon={faEdit} style={{color:"black"}}/>
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleShowDelete(item)}>
                                                        <FontAwesomeIcon icon={faTrash} style={{color:"black"}}/>
                                                    </Button>
                                                </Form>
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
            <ProductCreate
                show = {showCreate}
                handleClose = {handleClose}
            />
            <ProductEdit
                show = {showEdit}
                handleClose = {handleClose}
                data = {data}
            />
            <ProductDelete
                show = {showDelete}
                handleClose = {handleClose}
                data = {data}
            />
            <ProductImport 
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
 
export default Products;