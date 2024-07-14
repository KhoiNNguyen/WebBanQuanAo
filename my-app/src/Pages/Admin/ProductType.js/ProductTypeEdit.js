import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductTypeEdit = (props) => {
    const [productTypeEdit, setProductTypeEdit] = useState({});
    const [gender, setGender] = useState([]);
    const {show, handleClose, data} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setProductTypeEdit(prev => ({...prev, [name]: value}));
        console.log(productTypeEdit)
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setProductTypeEdit(prev => ({...prev, [name]: value}));
    }
    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        setProductTypeEdit(prev => ({...prev, imageFile : file}));
    }
    const handleSubmit = () => {
        try{
            const formData = new FormData()
            formData.append('id', productTypeEdit.id);
            formData.append("name",productTypeEdit.name)
            formData.append("imageFile",productTypeEdit.imageFile)
            formData.append("thumbnail",productTypeEdit.thumbnail)
            formData.append("genderId",productTypeEdit.genderId)
            formData.append("status",productTypeEdit.status)
            axios.put(`https://localhost:7026/api/ProductTypes/uploadFile/${productTypeEdit.id}`,formData)
            handleClose()
            toast.success("Cập nhật thành công")
        }
        catch{
            toast.error("Cập nhật thất bại")
        }
    }
    const getListGender = () =>{
        axios.get(`https://localhost:7026/api/Genders`)
        .then((res) => setGender(res.data))
    }
    useEffect(() => {
        getListGender()
    },[])
    useEffect(() => {
        setProductTypeEdit(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa Loại sản phẩm
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Tên Loại sản phẩm: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange} value={productTypeEdit.name}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Image: {productTypeEdit.thumbnail}</FormLabel>
                            <FormControl name="imageFile" type="file" onChange={handleImageChange}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Gender: {productTypeEdit.genderId}</FormLabel>
                            <FormSelect  name="genderId" onChange={handleChange}>
                            <option> None </option>
                            {
                                gender.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck} checked={productTypeEdit.status}/>
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
 
export default ProductTypeEdit;