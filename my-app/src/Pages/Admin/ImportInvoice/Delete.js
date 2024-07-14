import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const Delete = (props) => {
    const [del, setDelete] = useState({});
    const {show, handleClose,data} = props

    const handleDelete = (id) =>{
        try{
            axios.delete(`https://localhost:7026/api/ImportInvoices/${id}`)
            handleClose()
            toast.success("Xóa thành công")
            window.location.reload()
        }
        catch{
            toast.danger("Xóa thất bại")
        }
    }
    useEffect(() => {
        setDelete(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <p>Bạn chắc chắn muốn xóa Hóa đơn số {del.id} ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(del.id)}>
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
 
export default Delete;