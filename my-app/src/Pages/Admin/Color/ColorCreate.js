import axios from "axios";
import { useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ColorCreate = (props) => {
    const navigate = useNavigate()
    const [colorCreate, setcolorCreate] = useState();
    const {show, handleClose} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setcolorCreate(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setcolorCreate(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            axios.post(`https://localhost:7026/api/Colors`,colorCreate)
            .then(() => navigate('/Admin/Colors'))
            handleClose()
            toast.success("Thêm thành công")
            window.location.reload();
        }
        catch{
            toast.error("Thêm thất bại")
        }
    }
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Thêm mới màu
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Name: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange}></FormControl>
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
 
export default ColorCreate;