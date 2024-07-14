import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LoiNhuanChart = (props) => {
    const {arrImportInvoice,arrInvoice} = props
    //Tháng 1
    //Doanh thu
    const arrDoanhThu1 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "01"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu1 = arrDoanhThu1.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua1 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "01"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua1 = arrThuMua1.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan1 = +sumDoanhThu1 - +sumThuMua1
    //Số hóa đơn theo tháng
    const arrInvoice1 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "01"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice1 = arrInvoice1.filter(item =>{
        return item !== 0
    })

    //Tháng 2
    //Doanh thu
    const arrDoanhThu2 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "02"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu2 = arrDoanhThu2.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua2 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "02"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua2 = arrThuMua2.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan2 = +sumDoanhThu2 - +sumThuMua2
    //Số hóa đơn theo tháng
    const arrInvoice2 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "02"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice2 = arrInvoice2.filter(item =>{
        return item !== 0
    })

    //Tháng 3
    //Doanh thu
    const arrDoanhThu3 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "03"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu3 = arrDoanhThu3.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua3 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "03"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua3 = arrThuMua3.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan3 = +sumDoanhThu3 - +sumThuMua3
    //Số hóa đơn theo tháng
    const arrInvoice3 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "03"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice3 = arrInvoice3.filter(item =>{
        return item !== 0
    })

    //Tháng 4
    //Doanh thu
    const arrDoanhThu4 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "04"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu4 = arrDoanhThu4.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua4 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "04"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua4 = arrThuMua4.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan4 = +sumDoanhThu4 - +sumThuMua4
    //Số hóa đơn theo tháng
    const arrInvoice4 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "04"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice4 = arrInvoice4.filter(item =>{
        return item !== 0
    })

    //Tháng 5
    //Doanh thu
    const arrDoanhThu5 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "05"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu5 = arrDoanhThu5.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua5 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "05"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua5 = arrThuMua5.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan5 = +sumDoanhThu5 - +sumThuMua5
    //Số hóa đơn theo tháng
    const arrInvoice5 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "05"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice5 = arrInvoice5.filter(item =>{
        return item !== 0
    })

    //Tháng 6
    //Doanh thu
    const arrDoanhThu6 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "06"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu6 = arrDoanhThu6.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua6 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "06"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua6 = arrThuMua6.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan6 = +sumDoanhThu6 - +sumThuMua6
    //Số hóa đơn theo tháng
    const arrInvoice6 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "06"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice6 = arrInvoice6.filter(item =>{
        return item !== 0
    })

    //Tháng 7
    //Doanh thu
    const arrDoanhThu7 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "07"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu7 = arrDoanhThu7.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua7 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "07"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua7 = arrThuMua7.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan7 = +sumDoanhThu7 - +sumThuMua7
    //Số hóa đơn theo tháng
    const arrInvoice7 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "07"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice7 = arrInvoice7.filter(item =>{
        return item !== 0
    })

    //Tháng 8
    //Doanh thu
    const arrDoanhThu8 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "08"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu8 = arrDoanhThu8.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua8 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "08"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua8 = arrThuMua8.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan8 = +sumDoanhThu8 - +sumThuMua8
    //Số hóa đơn theo tháng
    const arrInvoice8 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "08"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice8 = arrInvoice8.filter(item =>{
        return item !== 0
    })

    //Tháng 9
    //Doanh thu
    const arrDoanhThu9 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "09"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu9 = arrDoanhThu9.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua9 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "09"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua9 = arrThuMua9.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan9 = +sumDoanhThu9 - +sumThuMua9
    //Số hóa đơn theo tháng
    const arrInvoice9 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "09"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice9 = arrInvoice9.filter(item =>{
        return item !== 0
    })

    //Tháng 10
    //Doanh thu
    const arrDoanhThu10 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "10"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu10 = arrDoanhThu10.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua10 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "10"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua10 = arrThuMua10.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan10 = +sumDoanhThu10 - +sumThuMua10
    //Số hóa đơn theo tháng
    const arrInvoice10 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "10"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice10 = arrInvoice10.filter(item =>{
        return item !== 0
    })

    //Tháng 11
    //Doanh thu
    const arrDoanhThu11 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "11"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu11 = arrDoanhThu11.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua11 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "11"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua11 = arrThuMua11.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan11 = +sumDoanhThu11 - +sumThuMua11
    //Số hóa đơn theo tháng
    const arrInvoice11 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "11"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice11 = arrInvoice11.filter(item =>{
        return item !== 0
    })

    //Tháng 12
    //Doanh thu
    const arrDoanhThu12 = arrInvoice.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "12"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumDoanhThu12 = arrDoanhThu12.reduce((total, num) => total + num, 0)
    //Tổng tiền thu mua
    const arrThuMua12 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "12"){
            const listTotal = item.total
            return listTotal
        }
        else{
            return 0
        }
    })
    const sumThuMua12 = arrThuMua12.reduce((total, num) => total + num, 0)
    //Tính lợi nhuận
    const sumLoiNhuan12 = +sumDoanhThu12 - +sumThuMua12
    //Số hóa đơn theo tháng
    const arrInvoice12 = arrImportInvoice.map(item =>{
        const parts = item.invoiceTime.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "12"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoice12 = arrInvoice12.filter(item =>{
        return item !== 0
    })

    //format giá tiền
    function formatPrice(price) {
        price = parseInt(price);
        return price.toLocaleString("vi-VN") + "đ";
    }   
    
    //dữ liệu chart
    const dataLoiNhuan = [
        {
            name: 'Tháng 1',
            invoiceImport: listInvoice1.length,
            totalImport: sumThuMua1,
            total: sumLoiNhuan1,
            amt: 2400,
        },
        {
            name: 'Tháng 2',
            invoiceImport: listInvoice2.length,
            totalImport: sumThuMua2,
            total: sumLoiNhuan2,
            amt: 2210,
        },
        {
            name: 'Tháng 3',
            invoiceImport: listInvoice3.length,
            totalImport: sumThuMua3,
            total: sumLoiNhuan3,
            amt: 2400,
        },
        {
            name: 'Tháng 4',
            invoiceImport: listInvoice4.length,
            totalImport: sumThuMua4,
            total: sumLoiNhuan4,
            amt: 2400,
        },
        {
            name: 'Tháng 5',
            invoiceImport: listInvoice5.length,
            totalImport: sumThuMua5,
            total: sumLoiNhuan5,
            amt: 2400,
        },
        {
            name: 'Tháng 6',
            invoiceImport: listInvoice6.length,
            totalImport: sumThuMua6,
            total: sumLoiNhuan6,
            amt: 2400,
        },
        {
            name: 'Tháng 7',
            invoiceImport: listInvoice7.length,
            totalImport: sumThuMua7,
            total: sumLoiNhuan7,
            amt: 2400,
        },
        {
            name: 'Tháng 8',
            invoiceImport: listInvoice8.length,
            totalImport: sumThuMua8,
            total: sumLoiNhuan8,
            amt: 2400,
        },
        {
            name: 'Tháng 9',
            invoiceImport: listInvoice9.length,
            totalImport: sumThuMua9,
            total: sumLoiNhuan9,
            amt: 2400,
        },
        {
            name: 'Tháng 10',
            invoiceImport: listInvoice10.length,
            totalImport: sumThuMua10,
            total: sumLoiNhuan10,
            amt: 2400,
        },
        {
            name: 'Tháng 11',
            invoiceImport: listInvoice11.length,
            totalImport: sumThuMua11,
            total: sumLoiNhuan11,
            amt: 2400,
        },
        {
            name: 'Tháng 12',
            invoiceImport: listInvoice12.length,
            totalImport: sumThuMua12,
            total: sumLoiNhuan12,
            amt: 2400,
        },
    ];
    const arrSumLoiNhuan = []
    dataLoiNhuan.map(item =>{
        return arrSumLoiNhuan.push(item.total)
    })
    const sumLoiNhuan = arrSumLoiNhuan.reduce((total, num) => total + num, 0)
    return ( 
        <>
            <h2>Tổng lợi nhuận năm: {formatPrice(sumLoiNhuan)}</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                width={500}
                height={300}
                data={dataLoiNhuan}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="invoiceImport" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="totalImport" fill="#ffc658" activeBar={<Rectangle fill="green" stroke="yellow" />} />
                <Bar dataKey="total" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>
        </>
     );
}
 
export default LoiNhuanChart;