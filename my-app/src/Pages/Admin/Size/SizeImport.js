import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Papa from "papaparse"

const SizeImport = (props) => {
    const [sizeImport, setSizeImport] = useState([]);
    const {show,handleClose} = props

    const handleImport = (e) =>{
        if(e.target && e.target.files && e.target.files[0]){
            let file = e.target.files[0]

            if(file.type !== "text/csv"){
                toast.error("Only accept csv files...")
                return;
            }

            Papa.parse(file, {
                delimiter: ';',
                complete: function(results) {
                    console.log("Finished:", results.data);
                    let rawCSV = results.data;
                    if(rawCSV.length > 0){
                        if(rawCSV[0] && rawCSV[0].length === 2){
                            if(rawCSV[0][0] !== "name"
                                || rawCSV[0][1] !== "status"
                            ){
                                toast.error("Wrong format CSV file!")
                            }
                            else{
                                let reasult = []
                                rawCSV.map((item,index) =>{
                                    if(index > 0 && item.length === 2){
                                        let obj = {}
                                        obj.name = item[0]
                                        obj.status = Boolean(item[1])
                                        reasult.push(obj)
                                    }
                                    return 0
                                })
                                setSizeImport(reasult)
                            }

                        }else{
                            toast.error("Wrong format header CSV file!")
                        }
                    }
                    else{
                        toast.error("Not found data on CSV file!")
                    }
                }
            });
        }        
    }
    const handleSubmit = (e) =>{
        try{
            e.preventDefault();
            if(sizeImport.length !== 0){
                sizeImport.map(item => {
                    return axios.post(`https://localhost:7026/api/Sizes`,item)
                })
                handleClose()
                toast.success("Thêm thành công")
            }
            else{
                toast.error("Thêm thất bại")
            }
        }
        catch (error){
            toast.error("Thêm thất bại")
        }
    }
    return ( 
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Import dữ liệu từ CSV</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <input 
                        id="import" 
                        type="file"
                        onChange={(e) => handleImport(e)}
                    ></input>
                </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
      </Modal>
    );
}
 
export default SizeImport;