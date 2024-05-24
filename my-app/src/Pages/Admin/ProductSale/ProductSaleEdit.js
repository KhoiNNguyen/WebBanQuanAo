import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductSaleEdit = (props) => {
    const [productSaleEdit, setproductSaleEdit] = useState({});
    const {show,handleClose,data} = props

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setproductSaleEdit(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setproductSaleEdit(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = () => {
        try{
            axios.put(`https://localhost:7026/api/ProductSales/${data.id}`,productSaleEdit)
            handleClose()
            window.location.reload()
            toast.success("Cập nhật thành công")
        }
        catch{
            toast.error("Cập nhật thất bại")
        }
    }
    useEffect(() => {
        setproductSaleEdit(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Sửa Giảm giá sản phẩm
                </ModalHeader>
                <Modal.Body>
                    <Form >
                        <FormGroup>
                            <FormLabel>Thời gian bắt đầu: </FormLabel>
                            <FormControl name="startTime" type="date" format="yyyy-mm-dd" onChange={handleChange} value={productSaleEdit.startTime}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Thời gian kết thúc: </FormLabel>
                            <FormControl name="endDate" type="date" format="yyyy-mm-dd" onChange={handleChange} value={productSaleEdit.endDate}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Phần trăm giảm giá: </FormLabel>
                            <FormControl name="percentDiscount" type="text" onChange={handleChange} value={productSaleEdit.percentDiscount}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Ghi chú: </FormLabel>
                            <FormControl name="ghiChu" type="text" onChange={handleChange} value={productSaleEdit.ghiChu}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck} checked={productSaleEdit.status}/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button Bodyvariant="success" onClick={handleSubmit} type="submit">
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
 
export default ProductSaleEdit;