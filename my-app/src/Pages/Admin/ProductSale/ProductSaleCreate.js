import axios from "axios";
import { useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductSaleCreate = (props) => {
    const navigate = useNavigate()
    const [productSaleCreate, setproductSaleCreate] = useState();
    const {show,handleClose} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setproductSaleCreate(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setproductSaleCreate(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            axios.post(`https://localhost:7026/api/ProductSales`,productSaleCreate)
            .then(() => navigate('/Admin/ProductSales'))
            handleClose()
            toast.success("Thêm thành công")
        }
        catch{
            toast.error("Thêm thất bại")
        }
    }
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Thêm mới Giảm giá sản phẩm
                </ModalHeader>
                <Modal.Body>
                    <Form >
                        <FormGroup>
                            <FormLabel>Thời gian bắt đầu: </FormLabel>
                            <FormControl name="startTime" type="date" format="yyyy-mm-dd" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Thời gian kết thúc: </FormLabel>
                            <FormControl name="endDate" type="date" format="yyyy-mm-dd" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Phần trăm giảm giá: </FormLabel>
                            <FormControl name="percentDiscount" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Ghi chú: </FormLabel>
                            <FormControl name="ghiChu" type="text" onChange={handleChange}></FormControl>
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
 
export default ProductSaleCreate;