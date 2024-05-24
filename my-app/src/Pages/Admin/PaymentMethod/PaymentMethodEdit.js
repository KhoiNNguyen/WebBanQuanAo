import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const PaymentMethodEdit = (props) => {
    const [paymentMethodEdit, setPaymentMethodEdit] = useState({});
    const {show,handleClose,data} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setPaymentMethodEdit(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setPaymentMethodEdit(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = () => {
        try{
            axios.put(`https://localhost:7026/api/PaymentMethods/${data.id}`,paymentMethodEdit)
            handleClose()
            window.location.reload()
            toast.success("Cập nhật thành công")
        }
        catch{
            toast.error("Cập nhật thất bại")
        }
    }
    useEffect(() => {
        setPaymentMethodEdit(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa phương thức thanh toán
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Phương thức thanh toán: </FormLabel>
                            <FormControl name="name" type="text" onChange={handleChange} value={paymentMethodEdit.name}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck} checked={paymentMethodEdit.status}/>
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
 
export default PaymentMethodEdit;