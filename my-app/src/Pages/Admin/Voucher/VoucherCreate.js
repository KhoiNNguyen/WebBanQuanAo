import axios from "axios";
import { useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VoucherCreate = (props) => {
    const navigate = useNavigate()
    const [voucherCreate, setVoucherCreate] = useState();
    const {show,handleClose} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setVoucherCreate(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setVoucherCreate(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            console.log(voucherCreate)
            axios.post(`https://localhost:7026/api/Vouchers`,voucherCreate)
            .then(() => navigate('/Admin/Vouchers'))
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
                    Thêm mới voucher
                </ModalHeader>
                <Modal.Body>
                    <Form >
                        <FormGroup>
                            <FormLabel>VoucherCode: </FormLabel>
                            <FormControl name="voucherCode" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Giảm giá: </FormLabel>
                            <FormControl name="discount" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Thời gian bắt đầu: </FormLabel>
                            <FormControl name="startTime" type="date" format="yyyy-mm-dd" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Thời gian kết thúc: </FormLabel>
                            <FormControl name="endDate" type="date" format="yyyy-mm-dd" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Ghi chú: </FormLabel>
                            <FormControl name="description" type="text" onChange={handleChange}></FormControl>
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
 
export default VoucherCreate;