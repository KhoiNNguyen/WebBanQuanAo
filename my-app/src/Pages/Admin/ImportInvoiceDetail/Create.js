import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const Create = (props) => {
    const {show,handleClose} = props
    const [create, setCreate] = useState();
    const [importInvoice, setImportInvoice] = useState([]);
    const [product, setProduct] = useState([]);
    const [importInvoiceDetail, setImportInvoiceDetail] = useState([]);

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setCreate(prev => ({...prev, [name]: value}));
    }

    const putImportInvoice = () =>{
        const arrImportInvoice = importInvoice.filter(item => {
            return item.id.toString() === create.importInvoiceId.toString()
        })
        //lấy danh sách các sản phẩm theo id hóa đơn
        const arrImportInvoiceDetail = importInvoiceDetail.filter(item =>{
            return item.importInvoice.id.toString() === create.importInvoiceId.toString()
        })
        //tính tổng của hóa đơn
        const totalPrice = []
        arrImportInvoiceDetail.map(item => {
            return totalPrice.push(item.unitPrice * item.quantity)
        })
        const totalImportInvoice = totalPrice.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        //cập nhật lại tổng tiền hóa đơn
        const obj = {
            id: arrImportInvoice[0].id,
            invoiceTime: arrImportInvoice[0].invoiceTime,
            address: arrImportInvoice[0].address,
            paymentMethodId: arrImportInvoice[0].paymentMethodId,
            total: ((+create.unitPrice * +create.quantity) + +totalImportInvoice),
            status: arrImportInvoice[0].status
        }
        axios.put(`https://localhost:7026/api/ImportInvoices/${obj.id}`,obj)
        // console.log(" ");
        // console.log("invoiceNumber",arrImportInvoice);
        // console.log("totalImportInvoice",totalImportInvoice);
        // console.log("totalPrice",totalPrice);
        // console.log("obj",obj);
    }
    async function handleSubmit(e){
        try{
            e.preventDefault()
            putImportInvoice()
            axios.post(`https://localhost:7026/api/ImportInvoiceDetails/`, create)
            .then(handleClose())
            
            toast.success("Thêm thành công")
        }
        catch{  
            toast.error("Xảy ra lỗi")
        }
    }

    const getListImportInvoiceDetail = () =>{
        axios.get(`https://localhost:7026/api/ImportInvoiceDetails`)
        .then(res => {
            setImportInvoiceDetail(res.data);
        })
    }
    const getListImportInvocie = () =>{
        axios.get(`https://localhost:7026/api/ImportInvoices`)
        .then(res => {
            setImportInvoice(res.data);
        })
    }
    const getListProduct = () =>{
        axios.get(`https://localhost:7026/api/Products`)
        .then((res) => {
            setProduct(res.data);
        })
    }
    useEffect(() => {
        getListImportInvocie();
        getListProduct();
        getListImportInvoiceDetail()
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
                            <FormLabel>Hóa đơn: </FormLabel>
                            <FormSelect  name="importInvoiceId" onChange={handleChange}>
                                <option> None </option>
                                {
                                    importInvoice.map(item =>{
                                        return(
                                            <>
                                                <option value={item.id}>{item.id}</option>
                                            </>
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
                                            <>
                                                <option 
                                                    value={item.id} >{item.name} - Màu {item.color.name} - Size {item.size.name}
                                                </option>
                                            </>
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
                            <FormLabel>Giá: </FormLabel>
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
 
export default Create;