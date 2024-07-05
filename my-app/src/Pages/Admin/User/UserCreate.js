import axios from "axios";
import { useState } from "react";
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, Modal, ModalHeader } from "react-bootstrap";
import { toast } from "react-toastify";


const UserCreate = (props) => {
    const [userCreate, setUserCreate] = useState();
    const {show,handleClose} = props
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) =>{
        let name = e.target.name
        let value = e.target.value
        setUserCreate(prev => ({...prev, [name]: value}));
    }
    const handleCheck = (e) =>{
        let name = e.target.name
        let value = e.target.checked
        setUserCreate(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const newUser = {
            userName: userCreate.userName,
            password: userCreate.password,
            email: userCreate.email,
            phone: userCreate.phone,
            fullName: userCreate.fullName,
            address: userCreate.address,
            status: userCreate.status
        }
        try{
            axios.post(`https://localhost:7026/api/Users/register-admin`,newUser, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(handleClose())
            toast.success("Thêm thành công")
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
              setErrorMessage(error.response.data.message);
            } else {
              setErrorMessage('Đã xảy ra lỗi khi đăng ký.');
            }
            toast.error(errorMessage)
        }
    }
    return ( 
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    Thêm mới User
                </ModalHeader>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <FormLabel>Username: </FormLabel>
                            <FormControl name="userName" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Password: </FormLabel>
                            <FormControl name="password" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Email: </FormLabel>
                            <FormControl name="email" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Phone: </FormLabel>
                            <FormControl name="phone" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>FullName: </FormLabel>
                            <FormControl name="fullName" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Address: </FormLabel>
                            <FormControl name="address" type="text" onChange={handleChange}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck name="status" type="switch" label="Hoạt động" onChange={handleCheck}/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSubmit} type="submit">
                        Thêm
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default UserCreate;