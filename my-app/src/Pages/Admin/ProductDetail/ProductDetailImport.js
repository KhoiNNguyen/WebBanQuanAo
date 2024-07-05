import { Button, Modal } from "react-bootstrap";
import Papa from "papaparse"
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const ProductDetailImport = (props) => {
    const [productDetailImport, setProductDetailImport] = useState([]);
    const {show,handleClose} = props

    const handleImport = (e) =>{
        if(e.target && e.target.files && e.target.files[0]){
            let file = e.target.files[0]

            if(file.type !== "text/csv"){
                toast.error("Only accept CSV files...")
                return;
            }

            Papa.parse(file, {
                delimiter: ';',
                complete: function(results) {
                    let rawCSV = results.data;
                    console.log(rawCSV);
                    if(rawCSV.length > 0){
                        if(rawCSV[0] && rawCSV[0].length === 6){
                            if(rawCSV[0][0] !== "name"
                                || rawCSV[0][1] !== "thumbnail"
                                || rawCSV[0][2] !== "quantity"
                                || rawCSV[0][3] !== "brandId"
                                || rawCSV[0][4] !== "productTypeId"
                                || rawCSV[0][5] !== "status"
                            ){
                                toast.error("Wrong format CSV file!")
                            }
                            else{
                                let reasult = []
                                rawCSV.map((item,index) =>{
                                    if(index > 0 && item.length === 6){
                                        let obj = {}
                                        obj.name = item[0]
                                        obj.thumbnail = item[1]
                                        obj.quantity = item[2]
                                        obj.brandId = item[3]
                                        obj.productTypeId = item[4]
                                        obj.status = Boolean(item[5])
                                        reasult.push(obj)
                                    }
                                    return 0
                                })
                                setProductDetailImport(reasult)
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

    async function handleSubmit(e){
        try{
            e.preventDefault();
            if(productDetailImport.length !== 0){
                productDetailImport.map(item => {
                    return axios.post(`https://localhost:7026/api/ProductDetails`,item)
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
 
export default ProductDetailImport;