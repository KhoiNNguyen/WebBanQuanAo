import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const BrandDelete = (props) => {
    const [brandDelete, setBrandDelete] = useState({});
    const {show, handleClose, data} = props

    const handleDelete = (id) =>{
        axios.delete(`https://localhost:7026/api/Brands/${id}`)
        handleClose(false)
        toast.success("Xóa thành công")
    }
    useEffect(()=>{
        setBrandDelete(data)
    } ,[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa?
                    <p>Tên: {brandDelete.name}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={() => handleDelete(brandDelete.id)}>
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
 
export default BrandDelete;