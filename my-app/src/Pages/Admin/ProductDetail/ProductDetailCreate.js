import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductDetailCreate = (props) => {
    const [productDetailCreate, setproductDetailCreate] = useState();
    const [brand, setBrands] = useState([]);
    const [productType, setProductType] = useState([]);
    const {show,handleClose} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setproductDetailCreate(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setproductDetailCreate(prev => ({...prev, [name]: value}));
    }
    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        setproductDetailCreate(prev => ({...prev, imageFile : file}));
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            const formData = new FormData()
            formData.append("name",productDetailCreate.name)
            formData.append("imageFile",productDetailCreate.imageFile)
            formData.append("quantity",productDetailCreate.quantity)
            formData.append("brandId",productDetailCreate.brandId)
            formData.append("productTypeId",productDetailCreate.productTypeId)
            formData.append("status",productDetailCreate.status)
            axios.post(`https://localhost:7026/api/ProductDetails/uploadFile`,formData)
            handleClose()
            toast.success("Thêm thành công")
            window.location.reload();
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
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Thêm mới Sản phẩm
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Tên Loại sản phẩm: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Hình ảnh: </FormLabel>
                            <FormControl name="imageFile" type="file" onChange={handleImageChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Số lượng: </FormLabel>
                            <FormControl name="quantity" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Thương hiệu: </FormLabel>
                            <FormSelect  name="brandId" onChange={handleChange}>
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
                            <FormSelect  name="productTypeId" onChange={handleChange}>
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
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck}/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSubmit} type="submit">
                        Thêm
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default ProductDetailCreate;