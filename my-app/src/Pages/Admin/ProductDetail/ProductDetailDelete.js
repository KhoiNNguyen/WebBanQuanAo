import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductDetailDelete = (props) => {
    const [productDetailDelete, setProductDetailDelete] = useState({});
    const {show, handleClose,data} = props

    const handleDelete = (id) =>{
        try{
            axios.delete(`https://localhost:7026/api/ProductDetails/${id}`)
            handleClose()
            toast.success("Xóa thành công")
        }
        catch{
            toast.danger("Xóa thất bại")
        }
    }
    useEffect(() => {
        setProductDetailDelete(data)
    },[data])
    return ( 
        <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa?
                    <p>Tên: {productDetailDelete.name}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(productDetailDelete.id)}>
                        Xóa
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
     );
}
 
export default ProductDetailDelete;