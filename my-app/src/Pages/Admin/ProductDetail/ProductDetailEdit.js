import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductDetailEdit = (props) => {
    const [productDetailEdit, setproductDetailEdit] = useState({});
    const [brand, setBrands] = useState([]);
    const [productType, setProductType] = useState([]);
    const {show,handleClose,data} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setproductDetailEdit(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setproductDetailEdit(prev => ({...prev, [name]: value}));
    }
    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        setproductDetailEdit(prev => ({...prev, imageFile : file}));
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            const formData = new FormData()
            formData.append('id', productDetailEdit.id);
            formData.append("name",productDetailEdit.name)
            formData.append("imageFile",productDetailEdit.imageFile)
            formData.append("thumbnail",productDetailEdit.thumbnail)
            formData.append("quantity",productDetailEdit.quantity)
            formData.append("brandId",productDetailEdit.brandId)
            formData.append("productTypeId",productDetailEdit.productTypeId)
            formData.append("status",productDetailEdit.status)
            axios.put(`https://localhost:7026/api/ProductDetails/uploadFile/${productDetailEdit.id}`,formData)
            handleClose()
            toast.success("Sửa thành công")
        }
        catch{
            toast.error("Thêm thất bại")
        }
    }

    const getListBrand = () =>{
        axios.get(`https://localhost:7026/api/Brands`)
        .then(res => {
            setBrands(res.data)
        });
    }
    const getListProductType = () =>{
        axios.get(`https://localhost:7026/api/ProductTypes`)
        .then(res => {
            setProductType(res.data);
        })
    }
    useEffect(()=>{
        getListBrand();
        getListProductType();
    },[])
    useEffect(()=>{
        setproductDetailEdit(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa Sản phẩm
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Tên Loại sản phẩm: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange} value={productDetailEdit.name}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Hình ảnh: {productDetailEdit.thumbnail}</FormLabel>
                            <FormControl name="imageFile" type="file" onChange={handleImageChange} ></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Số lượng: </FormLabel>
                            <FormControl name="quantity" type="text" onChange={handleChange} value={productDetailEdit.quantity}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Thương hiệu: </FormLabel>
                            <FormSelect  name="brandId" onChange={handleChange} value={productDetailEdit.brandId}>
                            <option> None </option>
                            {
                                brand.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Loại sản phẩm: </FormLabel>
                            <FormSelect  name="productTypeId" onChange={handleChange} value={productDetailEdit.productTypeId}>
                            <option> None </option>
                            {
                                productType.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck} checked={productDetailEdit.status}/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSubmit} type="submit">
                        Sửa
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default ProductDetailEdit;