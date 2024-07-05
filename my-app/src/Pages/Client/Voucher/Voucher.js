import { useDispatch, useSelector } from "react-redux";
import { getAllVoucher } from "../../../features/voucher/voucherSlice";
import { useEffect } from "react";

function VoucherClient() {
    const dispatch=useDispatch();
    const productState=useSelector(state=>state)

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts=()=>{
        dispatch(getAllVoucher())
    }
    const resultVoucher=[];
  if (productState.voucher.product && Array.isArray(productState.voucher.product)) {
    for(let i=0;i<productState.voucher.product.length;i++){
      const fm=productState.voucher.product[i];
      resultVoucher.push(fm)
    }
    } else {
      console.error("Products are undefined or not an array");
    }
    console.log(resultVoucher)
    return (
      <div className="container">
        <table className="table1">
              <thead className="thead-default">
                <tr>
                  <th>Mã giảm giá</th>
                  <th>Thông tin chi tiết</th>
                  <th>
                    Ngày bắt đầu
        
                  </th>
                  <th>
                    Ngày kết thúc
                  </th>
                  <th>
                    Trạng thái
                    <br />
                    Voucher
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultVoucher ? (
                  resultVoucher.map((product) => (
                    <tr key={product.id}>
                      <td>{product.voucherCode}</td>
                      <td>{product.discount}</td>
                      <td>{product.startTime }</td>
                      <td>{product.endDate }</td>
                      <td>{product.status===true?"Đang hoạt động":"Đã hết hạn"}</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colspan="6">
                      <p>Không có đơn hàng nào.</p>
                    </td>{" "}
                  </tr>
                )}
              </tbody>
            </table>
      </div>
    );
}

export default VoucherClient;