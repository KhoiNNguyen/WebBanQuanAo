import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductEdit = (props) => {
    const [productEdit, setProductEdit] = useState({});
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [productSale, setProductSale] = useState([]);
    const [productDetail, setProductDetail] = useState([]);
    const {show,handleClose,data} = props


    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setProductEdit(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setProductEdit(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            axios.put(`https://localhost:7026/api/Products/${productEdit.id}`,productEdit)
            handleClose()
            toast.success("Sửa thành công")
            // window.location.reload();
        }
        catch{
            toast.error("Sửa thất bại")
        }
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
    const getListProductSale = () =>{
        axios.get(`https://localhost:7026/api/ProductSales`)
        .then(res => {
            setProductSale(res.data);
        })
    }
    const getListProductDetail = () =>{
        axios.get(`https://localhost:7026/api/ProductDetails`)
        .then(res => {
            setProductDetail(res.data)
        })
    }

    useEffect(()=>{
        setProductEdit(data)
    },[data])
    
    useEffect(()=>{
        getListSize()
        getListColor()
        getListProductSale()
        getListProductDetail()
    },[])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa sản phẩm
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Tên sản phẩm: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange} value={productEdit.name}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Giá: </FormLabel>
                            <FormControl name="price" type="text" onChange={handleChange} value={productEdit.price}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Size: </FormLabel>
                            <FormSelect  name="sizeId" onChange={handleChange}>
                            <option> None </option>
                            {
                                size.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Màu: </FormLabel>
                            <FormSelect  name="colorId" onChange={handleChange}>
                            <option> None </option>
                            {
                                color.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Số lượng: </FormLabel>
                            <FormControl name="quantity" type="text" onChange={handleChange} value={productEdit.quantity}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Chi tiết sản phẩm: </FormLabel>
                            <FormSelect  name="productDetailId" onChange={handleChange}>
                            <option> None </option>
                            {
                                productDetail.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Giảm giá: </FormLabel>
                            <FormSelect  name="productSaleId" onChange={handleChange}>
                            <option> None </option>
                            {
                                productSale.map(item =>{
                                    return(
                                        <option value={item.id} >{item.percentDiscount}% </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck} checked={productEdit.status}/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSubmit} type="submit">
                        Cập nhật
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default ProductEdit;