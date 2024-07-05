import axios from "axios";
import React, { useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
import { toast } from 'react-toastify';

const BrandCreate = (props) => {
    const [brandCreate, setbrandCreate] = useState();
    const {show, handleClose} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setbrandCreate(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setbrandCreate(prev => ({...prev, [name]: value}));
    }
    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        setbrandCreate(prev => ({...prev, imageFile : file}));
    }
    async function handleSubmit(e){
        try{
            e.preventDefault()
            const formData = new FormData();
            formData.append('name', brandCreate.name);
            formData.append('imageFile', brandCreate.imageFile)
            formData.append('status', brandCreate.status);
            console.log(formData);
            axios.post(`https://localhost:7026/api/Brands/uploadFile`, formData)
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
    return ( 
        <>
            {/* (e) => { setbrandCreate(e.target.files[0]) } */}
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Thêm mới thương hiệu
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Name: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Image: </FormLabel>
                            <FormControl name="imageFile" type="file" onChange={handleImageChange}></FormControl>
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
 
export default BrandCreate;