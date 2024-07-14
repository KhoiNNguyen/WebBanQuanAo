import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductSaleDelete = (props) => {
    const [productSaleDelete, setProductSaleDelete] = useState({});

    const {show, handleClose,data} = props

    const handleDelete = (id) =>{
        try{
            axios.delete(`https://localhost:7026/api/ProductSales/${id}`)
            handleClose()
            toast.success("Xóa thành công")
        }
        catch{
            toast.error("Xóa thất bại")
        }
    }
    useEffect(() => {
        setProductSaleDelete(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa?
                    <p>Giảm giá: {productSaleDelete.percentDiscount}%</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(productSaleDelete.id)}>
                        Xóa
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default ProductSaleDelete;