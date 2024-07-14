import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const InvoiceDelete = (props) => {
    const [invoiceDelete, setInvoiceDelete] = useState({});
    const {show, handleClose,data} = props

    const handleDelete = (id) =>{
        try{
            axios.delete(`https://localhost:7026/api/Invoices/${id}`)
            handleClose()
            toast.success("Xóa thành công")
        }
        catch{
            toast.danger("Xóa thất bại")
        }
    }
    useEffect(() => {
        setInvoiceDelete(data)
    },[data])
    console.log(data)
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <h3 style={{color:"red"}}>Dữ liệu sẽ xóa vĩnh viễn!</h3>
                    <p>Bạn chắc chắn muốn xóa Hóa đơn số {invoiceDelete.id} ?</p>
                    <p><i style={{color:"blue"}}>bạn sẽ chịu mọi trách nhiệm sao này!</i></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(invoiceDelete.id)}>
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
 
export default InvoiceDelete;