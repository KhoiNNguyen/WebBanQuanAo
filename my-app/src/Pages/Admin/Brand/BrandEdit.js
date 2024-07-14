import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//xuất hiện thông báo: npm install --save-exact react-toastify@8.2.0

const BrandEdit = (props) => {
    const [brandEdit, setbrandEdit] = useState({});
    // const {id} = useParams();
    // const navigate = useNavigate();
    const {show, handleClose, data} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setbrandEdit(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setbrandEdit(prev => ({...prev, [name]: value}));
    }
    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        setbrandEdit(prev => ({...prev, imageFile : file}));
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            const formData = new FormData();
            formData.append('id', brandEdit.id);
            formData.append('name', brandEdit.name);
            formData.append('imageFile', brandEdit.imageFile)
            formData.append('image', brandEdit.image)
            formData.append('status', brandEdit.status);
            axios.put(`https://localhost:7026/api/Brands/uploadFile/${brandEdit.id}`, formData)
            handleClose()
            toast.success("Cập nhật thành công")
        }
        catch{
            toast.error("Xảy ra lỗi")
        }
    }
    useEffect(()=>{
        setbrandEdit(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa thương hiệu
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Name: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange} value={brandEdit.name}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Image: {brandEdit.image}</FormLabel>
                            <FormControl name="imageFile" type="file" onChange={handleImageChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck} checked={brandEdit.status}/>
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
 
export default BrandEdit;