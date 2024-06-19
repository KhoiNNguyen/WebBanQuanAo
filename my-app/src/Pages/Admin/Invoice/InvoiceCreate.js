import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const InvoiceCreate = (props) => {
    const {show,handleClose} = props
    const [invoiceCreate, setInvoiceCreate] = useState();
    const [user, setUser] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [voucher, setVoucher] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState([]);
    const [shippingStatus, setShippingStatus] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setInvoiceCreate(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        try{
            axios.post(`https://localhost:7026/api/Invoices`,invoiceCreate, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(handleClose())
            toast.success("Thêm thành công")
            window.location.reload()
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
              setErrorMessage(error.response.data.message);
            } else {
              setErrorMessage('Đã xảy ra lỗi khi đăng ký.');
            }
            toast.error(errorMessage)
        }
    }
    const getListUser = () =>{
        axios.get('https://localhost:7026/api/Users')
        .then(res => {
            setUser(res.data)
        })
    }
    const getListPaymentMethod = () =>{
        axios.get(`https://localhost:7026/api/PaymentMethods`)
        .then(res => {
            setPaymentMethod(res.data);
        })
    }
    const getListVoucher = () =>{
        axios.get(`https://localhost:7026/api/Vouchers`)
        .then(res =>{
            setVoucher(res.data);
        })
    }
    const getListShippingStaus = () =>{
        axios.get(`https://localhost:7026/api/ShippingStatus`)
        .then(res =>{
            setShippingStatus(res.data);
        })
    }
    const getListPaymentStatus = () =>{
        axios.get(`https://localhost:7026/api/PaymentStatus`)
        .then(res =>{
            setPaymentStatus(res.data);
        })
    }
    useEffect(()=>{
        getListUser();
        getListPaymentMethod()
        getListVoucher()
        getListPaymentStatus()
        getListShippingStaus()
    },[])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Thêm mới Hóa Đơn
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>InvoiceDate: </FormLabel>
                            <FormControl name="invoiceDate" type="date" format="yyyy-mm-dd" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>AddressShip: </FormLabel>
                            <FormControl name="addressShip" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Total: </FormLabel>
                            <FormControl name="total" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>User: </FormLabel>
                            <FormSelect  name="userId" onChange={handleChange}>
                            <option value={1}> None </option>
                            {
                                user.map(item =>{
                                    return(
                                        <option value={item.id} >{item.userName} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>PaymentMethod: </FormLabel>
                            <FormSelect  name="paymentMethodId" onChange={handleChange}>
                            <option> None </option>
                            {
                                paymentMethod.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Voucher: </FormLabel>
                            <FormSelect  name="voucherId" onChange={handleChange}>
                            <option> None </option>
                            {
                                voucher.map(item =>{
                                    return(
                                        <option value={item.id}>{item.description} </option>
                                        
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>PaymentStatus: </FormLabel>
                            <FormSelect  name="paymentStatusId" onChange={handleChange}>
                            <option> None </option>
                            {
                                paymentStatus.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>ShippingStatus: </FormLabel>
                            <FormSelect  name="shippingStatusId" onChange={handleChange}>
                            <option> None </option>
                            {
                                shippingStatus.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>DiscountTotal: </FormLabel>
                            <FormControl name="discoundTotal" type="text" placeholder="total - voucher" onChange={handleChange}></FormControl>
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
 
export default InvoiceCreate;