import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const ImageCreate = (props) => {
    const [imageCreate, setImageCreate] = useState();
    const [product, setProduct] = useState([]);
    const {show, handleClose} = props
    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setImageCreate(prev => ({...prev, [name]: value}));
    }
    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        setImageCreate(prev => ({...prev, imageFile : file}));
    }
    console.log(imageCreate);
    async function handleSubmit(e){
        try{
            e.preventDefault()
            const formData = new FormData();
            formData.append('imageFile', imageCreate.imageFile);
            formData.append('productId', imageCreate.productId)
            console.log(formData);
            axios.post(`https://localhost:7026/api/Images/uploadFile`, formData)
            .then(handleClose())
            
            toast.success("Thêm thành công")
            // window.location.reload()
        }
        catch{
            toast.error("Xảy ra lỗi")
        }
        // axios.post(`https://localhost:7026/api/Brands`, brandCreate)
        //    .then(() => navigate('/Admin/Brands'))
    }
    const getListProduct = () =>{
        axios.get(`https://localhost:7026/api/Products`)
        .then((res) => {
            setProduct(res.data);
        })
    }
    useEffect(()=>{
        getListProduct();
    },[])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Thêm mới hình ảnh
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Tên hình ảnh: </FormLabel>
                            <FormControl name="imageFile" type="file" onChange={handleImageChange}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Màu: </FormLabel>
                            <FormSelect  name="productId" onChange={handleChange}>
                            <option> None </option>
                            {
                                product.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} - Màu {item.color.name} - Size {item.size.name}</option>
                                    )
                                })
                            }
                            </FormSelect>
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
 
export default ImageCreate;