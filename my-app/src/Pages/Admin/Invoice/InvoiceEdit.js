import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const InvoiceEdit = (props) => {
    const {show,handleClose,data} = props
    const [invoiceEdit, setInvoiceEdit] = useState({});
    const [user, setUser] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [voucher, setVoucher] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState([]);
    const [shippingStatus, setShippingStatus] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setInvoiceEdit(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        try{
            axios.put(`https://localhost:7026/api/Invoices/${invoiceEdit.id}`,invoiceEdit, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(handleClose())
            toast.success("Sửa thành công")
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
    useEffect(() => {
        setInvoiceEdit(data)
    },[data])
    console.log(invoiceEdit);
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa Hóa Đơn
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>InvoiceDate: </FormLabel>
                            <FormControl name="invoiceDate" type="date" format="yyyy-mm-dd" onChange={handleChange} value={invoiceEdit.invoiceDate}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>AddressShip: </FormLabel>
                            <FormControl name="addressShip" type="text" onChange={handleChange} value={invoiceEdit.addressShip}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Total: </FormLabel>
                            <FormControl name="total" type="text" onChange={handleChange} value={invoiceEdit.total}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>User: </FormLabel>
                            <FormSelect  name="userId" onChange={handleChange} value={invoiceEdit.userId}>
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
                            <FormSelect  name="paymentMethodId" onChange={handleChange} value={invoiceEdit.paymentMethodId}>
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
                            <FormSelect  name="voucherId" onChange={handleChange} value={invoiceEdit.voucherId}>
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
                            <FormSelect  name="paymentStatusId" onChange={handleChange} value={invoiceEdit.paymentStatusId}>
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
                            <FormSelect  name="shippingStatusId" onChange={handleChange} value={invoiceEdit.shippingStatusId}>
                            <option> None </option>
                            {
                                shippingStatus.map(item =>{
                                    return <option value={item.id} >{item.name} </option>
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>DiscountTotal: </FormLabel>
                            <FormControl name="discoundTotal" type="text" placeholder="total - voucher" onChange={handleChange} value={invoiceEdit.discoundTotal}></FormControl>
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
 
export default InvoiceEdit;