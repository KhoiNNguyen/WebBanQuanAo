import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const Edit = (props) => {
    const {show,handleClose,data} = props
    const [edit, setEdit] = useState({});
    const [paymentMethod, setPaymentMethod] = useState([]);

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setEdit(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setEdit(prev => ({...prev, [name]: value}));
    }
    console.log(edit);
    const handleSubmit = (e) =>{
        e.preventDefault();
        try{
            axios.put(`https://localhost:7026/api/ImportInvoices/${edit.id}`,edit, {
            })
            .then(handleClose())
            toast.success("Sửa thành công")
        }
        catch{
            toast.error("Sửa Thất Bại")
        }
    }
    const getListPaymentMethod = () =>{
        axios.get(`https://localhost:7026/api/PaymentMethods`)
        .then(res => {
            setPaymentMethod(res.data);
        })
    }
    useEffect(() => {
        getListPaymentMethod();
    },[])
    useEffect(() => {
        setEdit(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa hóa đơn nhập
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Ngày lập hóa đơn: </FormLabel>
                            <FormControl name="invoiceTime" type="date" format="yyyy-mm-dd" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Địa chỉ: </FormLabel>
                            <FormControl name="address" type="text" onChange={handleChange} value={edit.address}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Phương thức thanh toán: </FormLabel>
                            <FormSelect  name="paymentMethodId" onChange={handleChange} value={edit.paymentMethodId}>
                                <option> None </option>
                                {
                                    paymentMethod.map(item =>{
                                        return(
                                            <>
                                                <option value={item.id}>{item.name}</option>
                                            </>
                                        )
                                    })
                                }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Tổng tiền: </FormLabel>
                            <FormControl name="total" type="text" onChange={handleChange} value={edit.total}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck} checked={edit.status}/>
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
 
export default Edit;