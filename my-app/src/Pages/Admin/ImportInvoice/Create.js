import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const Create = (props) => {
    const [create, setCreate] = useState();
    const [paymentMethod, setPaymentMethod] = useState([]);
    const {show,handleClose} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setCreate(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setCreate(prev => ({...prev, [name]: value}));
    }
    async function handleSubmit(e){
        try{
            e.preventDefault()
            axios.post(`https://localhost:7026/api/ImportInvoices/`, create)
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
    const getListPaymentMethod = () =>{
        axios.get(`https://localhost:7026/api/PaymentMethods`)
        .then(res => {
            setPaymentMethod(res.data);
        })
    }
    useEffect(() => {
        getListPaymentMethod();
    },[])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Thêm mới hóa đơn nhập
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Ngày lập hóa đơn: </FormLabel>
                            <FormControl name="invoiceTime" type="date" format="yyyy-mm-dd" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Địa chỉ: </FormLabel>
                            <FormControl name="address" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Phương thức thanh toán: </FormLabel>
                            <FormSelect  name="paymentMethodId" onChange={handleChange}>
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
                            <FormControl name="total" type="text" onChange={handleChange}></FormControl>
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
 
export default Create;