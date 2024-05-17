import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const VoucherDelete = (props) => {
    const [voucherDelete, setVoucherDelete] = useState({});
    const {show, handleClose,data} = props

    const handleDelete = (id) =>{
        try{
            axios.delete(`https://localhost:7026/api/Vouchers/${id}`)
            handleClose()
            toast.success("Xóa thành công")
            window.location.reload()
        }
        catch{
            toast.error("Xóa thất bại")
        }
    }
    useEffect(() => {
        setVoucherDelete(data)
    },[data])
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa?
                    <p>VoucherCode: {voucherDelete.voucherCode}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(voucherDelete.id)}>
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
 
export default VoucherDelete;