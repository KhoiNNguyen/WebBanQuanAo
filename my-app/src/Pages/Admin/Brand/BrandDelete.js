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
                    Do you want delete?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={() => handleDelete(brandDelete.id)}>
                    Ok
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default BrandDelete;