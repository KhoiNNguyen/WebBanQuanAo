import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const ColorEdit = (props) => {
    const [colorEdit, setcolorEdit] = useState({});
    const {show,handleClose,data} = props
    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setcolorEdit(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setcolorEdit(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = () => {
        try{
            axios.put(`https://localhost:7026/api/Colors/${data.id}`,colorEdit)
            handleClose()
            toast.success("Cập nhật thành công")
        }
        catch{
            toast.danger("Cập nhật thất bại")
        }
    }
    useEffect(() => {
        setcolorEdit(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa màu
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Name: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange} value={colorEdit.name}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck} checked={colorEdit.status}/>
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
 
export default ColorEdit;