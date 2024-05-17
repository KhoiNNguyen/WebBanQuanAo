import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const VoucherEdit = (props) => {
    const [voucherEdit, setVoucherEdit] = useState({});
    const {show,handleClose,data} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setVoucherEdit(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setVoucherEdit(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = () => {
        try{
            axios.put(`https://localhost:7026/api/Vouchers/${data.id}`,voucherEdit)
            handleClose()
            window.location.reload()
            toast.success("Cập nhật thành công")
        }
        catch{
            toast.error("Cập nhật thất bại")
        }
    }
    useEffect(() => {
        setVoucherEdit(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa voucher
                </ModalHeader>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <FormLabel>VoucherCode: </FormLabel>
                            <FormControl name="voucherCode" type="text" onChange={handleChange} value={voucherEdit.voucherCode}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Giảm giá: </FormLabel>
                            <FormControl name="discount" type="text" onChange={handleChange} value={voucherEdit.discount}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Thời gian bắt đầu: </FormLabel>
                            <FormControl name="startTime" type="date" format="yyyy-mm-dd" onChange={handleChange} value={voucherEdit.startTime}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Thời gian kết thúc: </FormLabel>
                            <FormControl name="endDate" type="date" format="yyyy-mm-dd" onChange={handleChange} value={voucherEdit.endDate}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Ghi chú: </FormLabel>
                            <FormControl name="description" type="text" onChange={handleChange} value={voucherEdit.description}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck} checked={voucherEdit.status}/>
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
 
export default VoucherEdit;