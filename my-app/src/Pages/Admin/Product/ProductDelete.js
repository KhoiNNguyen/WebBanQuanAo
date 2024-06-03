import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductDelete = (props) => {
    const [productDelete, setProductDelete] = useState({});
    const {show, handleClose, data} = props

    const handleDelete = (id) =>{
        try{
            axios.delete(`https://localhost:7026/api/Products/${id}`)
            handleClose()
            toast.success("Xóa thành công")
            window.location.reload()
        }
        catch{
            toast.danger("Xóa thất bại")
        }
    }
    useEffect(() => {
        setProductDelete(data)
    },[data])
    return ( 
        <>
             <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                    Bạn chắc chắn muốn xóa?
                    <p>Tên: {productDelete.name}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={() => handleDelete(productDelete.id)}>
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
 
export default ProductDelete;