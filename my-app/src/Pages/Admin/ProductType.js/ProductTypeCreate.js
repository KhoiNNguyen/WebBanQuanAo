import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductTypeCreate = (props) => {
    const navigate = useNavigate()
    const [productTypeCreate, setProductTypeCreate] = useState();
    const [gender, setGender] = useState([]);
    const {show,handleClose} = props
    
    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setProductTypeCreate(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setProductTypeCreate(prev => ({...prev, [name]: value}));
    }
    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        setProductTypeCreate(prev => ({...prev, imageFile : file}));
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            const formData = new FormData()
            formData.append("name",productTypeCreate.name)
            formData.append("imageFile",productTypeCreate.imageFile)
            formData.append("genderId",productTypeCreate.genderId)
            formData.append("status",productTypeCreate.status)
            axios.post(`https://localhost:7026/api/ProductTypes/uploadFile`,formData)
            .then(() => navigate('/Admin/ProductTypes'))
            handleClose()
            toast.success("Thêm thành công")
        }
        catch{
            toast.error("Thêm thất bại")
        }
    }
    const getListGender = () =>{
        axios.get(`https://localhost:7026/api/Genders`)
        .then((res) => setGender(res.data))
    }
    useEffect(() => {
        getListGender()
    },[])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Thêm mới Loại sản phẩm
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Tên Loại sản phẩm: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Image: </FormLabel>
                            <FormControl name="imageFile" type="file" onChange={handleImageChange}></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Gender: </FormLabel>
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
 
export default ProductTypeCreate;