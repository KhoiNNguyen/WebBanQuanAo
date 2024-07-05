import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Papa from "papaparse"

const ProductImport = (props) => {
    const {show,handleClose} = props
    const [productImport, setProductImport] = useState([]);
    const [productDetail, setProductDetail] = useState([]);
    const [product, setProduct] = useState([]);

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
                    // console.log(rawCSV);
                    if(rawCSV.length > 0){
                        if(rawCSV[0] && rawCSV[0].length === 8){
                            if(rawCSV[0][0] !== "name"
                                || rawCSV[0][1] !== "price"
                                || rawCSV[0][2] !== "sizeId"
                                || rawCSV[0][3] !== "colorId"
                                || rawCSV[0][4] !== "quantity"
                                || rawCSV[0][5] !== "productDetailId"
                                || rawCSV[0][6] !== "productSaleId"
                                || rawCSV[0][7] !== "status"
                            ){
                                toast.error("Wrong format CSV file!")
                            }
                            else{
                                let reasult = []
                                rawCSV.map((item,index) =>{
                                    if(index > 0 && item.length === 8){
                                        let obj = {}
                                        obj.name = item[0]
                                        obj.price = item[1]
                                        obj.sizeId = item[2]
                                        obj.colorId = item[3]
                                        obj.quantity = item[4]
                                        obj.productDetailId = item[5]
                                        obj.productSaleId = item[6]
                                        obj.status = Boolean(item[7])
                                        reasult.push(obj)
                                    }
                                    return 0
                                })
                                setProductImport(reasult)
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
    const putProudctDetail = (productList) =>{
        let filterProductDetail = productDetail.filter(id => {
            return id.id.toString() === productList.productDetailId.toString()
        })
        const listProductForId = product.filter(item => {
            return item.productDetailId.toString() === productList.productDetailId.toString()
        })
        const quantity = []
        listProductForId.map(item => {
            return quantity.push(item.quantity)
        })

        const sumQuantity = quantity.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        const obj = {
            id: filterProductDetail[0].id,
            name: filterProductDetail[0].name,
            quantity: (+sumQuantity + +productList.quantity),
            brandId: filterProductDetail[0].brandId,
            productTypeId: filterProductDetail[0].productTypeId,
            thumbnail: filterProductDetail[0].thumbnail,
            status: filterProductDetail[0].status,
        }
        // axios.put(`https://localhost:7026/api/ProductDetails/${obj.id}`,obj)
        return axios.put(`https://localhost:7026/api/ProductDetails/${obj.id}`,obj);
    }
    async function handleSubmit(e){
        try{
            e.preventDefault();
            
            if(productImport.length !== 0){
                productImport.map(item => {
                    putProudctDetail(item)
                    //axios.post(`https://localhost:7026/api/Products`,item)
                    return axios.post(`https://localhost:7026/api/Products`,item);
                })
                handleClose()
                toast.success("Thêm thành công")
            }
            else{
                toast.error("Thêm thất bại")
            }
        }
        catch (error){
            toast.error("Lỗi Máy Chủ")
        }
    }
    const getListProductDetail = () =>{
        axios.get(`https://localhost:7026/api/ProductDetails`)
        .then(res => {
            setProductDetail(res.data)
        })
    }
    const getListProduct = () =>{
        axios.get(`https://localhost:7026/api/Products`)
        .then((res) => {
            setProduct(res.data);
        })
    }
    useEffect(()=>{
        getListProductDetail()
        getListProduct()
    },[])
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
 
export default ProductImport;