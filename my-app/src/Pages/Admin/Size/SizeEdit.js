import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const SizeEdit = (props) => {
    const [sizeEdit, setSizeEdit] = useState({});
    const {show,handleClose,data} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setSizeEdit(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setSizeEdit(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = () => {
        try{
            axios.put(`https://localhost:7026/api/Sizes/${data.id}`,sizeEdit)
            handleClose()
            toast.success("Cập nhật thành công")
        }
        catch{
            toast.error("Cập nhật thất bại")
        }
    }
    useEffect(() => {
        setSizeEdit(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa Size
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Name: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange} value={sizeEdit.name}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck} checked={sizeEdit.status}/>
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
 
export default SizeEdit;