import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const InvoiceDetailCreate = (props) => {
    const [invoiceDetailCreate, setInvoiceDetailCreate] = useState();
    const [invoice, setIncoice] = useState([]);
    const [product, setProduct] = useState([]);
    const {show,handleClose} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setInvoiceDetailCreate(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            axios.post(`https://localhost:7026/api/InvoiceDetails`,invoiceDetailCreate)
            .then(handleClose())
            toast.success("Thêm thành công")
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
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Thêm mới Chi tiết hóa đơn
                </ModalHeader>
                <Modal.Body>
                    <Form >
                        <FormGroup>
                            <FormLabel>Hóa đơn: </FormLabel>
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
                            <FormLabel>Sản phẩm: </FormLabel>
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
                            <FormControl name="quantity" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Giá tiền: </FormLabel>
                            <FormControl name="unitPrice" type="text" onChange={handleChange}></FormControl>
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
 
export default InvoiceDetailCreate;