import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const Edit = (props) => {
    const {show,handleClose,data} = props
    const [edit, setEdit] = useState({});
    const [importInvoice, setImportInvoice] = useState([]);
    const [product, setProduct] = useState([]);
    
    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setEdit(prev => ({...prev, [name]: value}));
    }
    async function handleSubmit(e){
        try{
            e.preventDefault()
            axios.put(`https://localhost:7026/api/ImportInvoiceDetails/${edit.id}`, edit)
            .then(handleClose())
            
            toast.success("Sửa thành công")
            // window.location.reload()
        }
        catch{
            toast.error("Xảy ra lỗi")
        }
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
                            <FormLabel>Hóa đơn: </FormLabel>
                            <FormSelect  name="importInvoiceId" onChange={handleChange} value={edit.importInvoiceId}>
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
                            <FormSelect  name="productId" onChange={handleChange} value={edit.productId}>
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
                            <FormControl name="quantity" type="text" onChange={handleChange} value={edit.quantity}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Giá: </FormLabel>
                            <FormControl name="unitPrice" type="text" onChange={handleChange} value={edit.unitPrice}></FormControl>
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