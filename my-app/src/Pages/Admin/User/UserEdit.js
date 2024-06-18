import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal} from "react-bootstrap";
import { toast } from "react-toastify";

const UserEdit = (props) => {
    const [userEdit, setUserEdit] = useState({});
    const {show,handleClose,data} = props

    const handleDelete = (id) =>{
        try{
            axios.put(`https://localhost:7026/api/Users/${id}`)
            handleClose()
            toast.success("Khôi phục thành công")
            window.location.reload()
        }
        catch{
            toast.danger("Xóa thất bại")
        }
    }
    useEffect(() => {
        setUserEdit(data)
    },[data])
    return ( 
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                Bạn có muốn khôi phục tài khoản
                <p>Tên: {userEdit.userName}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => handleDelete(userEdit.id)}>
                    Có
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default UserEdit;