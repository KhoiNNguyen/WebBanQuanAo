import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const InvoiceDetailEdit = (props) => {
    const [invoiceDetailEdit, setInvoiceDetailEdit] = useState({});
    const [invoice, setIncoice] = useState([]);
    const [product, setProduct] = useState([]);
    const {show,handleClose,data} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setInvoiceDetailEdit(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            axios.put(`https://localhost:7026/api/InvoiceDetails/${invoiceDetailEdit.id}`,invoiceDetailEdit)
            .then(handleClose())
            toast.success("Sửa thành công")
            window.location.reload();
        }
        catch{
            toast.error("Thêm thất bại")
        }
    }
    const getListProduct = () =>{
        axios.get(`https://localhost:7026/api/Products`)
        .then((res) => {
            setProduct(res.data);
        })
    }
    const getListInvoice = () =>{
        axios.get(`https://localhost:7026/api/Invoices`)
        .then(res =>{
            setIncoice(res.data);
        })
    }
    useEffect(() => {
        getListInvoice();
        getListProduct();
    },[])
    useEffect(() => {
        setInvoiceDetailEdit(data)
    },[data])
    console.log(invoiceDetailEdit)
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa chi tiết hóa đơn
                </ModalHeader>
                <Modal.Body>
                    <Form >
                        <FormGroup>
                            <FormLabel>Hóa đơn: {invoiceDetailEdit.invoiceId}</FormLabel>
                            <FormSelect  name="invoiceId" onChange={handleChange}>
                            <option> None </option>
                            {
                                invoice.map(item =>{
                                    return(
                                        <option value={item.id} >{item.id} </option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Sản phẩm: {invoiceDetailEdit.productId} </FormLabel>
                            <FormSelect  name="productId" onChange={handleChange}>
                            <option> None </option>
                            {
                                product.map(item =>{
                                    return(
                                        <option value={item.id} >{item.name} - Màu {item.color.name} - Size {item.size.name}</option>
                                    )
                                })
                            }
                            </FormSelect>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Số lượng: </FormLabel>
                            <FormControl name="quantity" type="text" onChange={handleChange} value={invoiceDetailEdit.quantity}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Giá tiền: </FormLabel>
                            <FormControl name="unitPrice" type="text" onChange={handleChange} value={invoiceDetailEdit.unitPrice}></FormControl>
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
 
export default InvoiceDetailEdit;