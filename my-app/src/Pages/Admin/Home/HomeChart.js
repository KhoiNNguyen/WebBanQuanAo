import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HomeChart = (props) => {
    const {arr} = props
    
    //Tháng 1
    const arrTotalJanuary = arr.map(item =>{
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
    const sumTotalJanuary = arrTotalJanuary.reduce((total, num) => total + num, 0)
    const arrInvoiceJanuary = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "01"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceJanuary = arrInvoiceJanuary.filter(item =>{
        return item !== 0
    })

    //Tháng 2
    const arrTotalFebruary = arr.map(item =>{
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
    const sumTotalFebruary = arrTotalFebruary.reduce((total, num) => total + num, 0)
    const arrInvoiceFebruary = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "02"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceFebruary = arrInvoiceFebruary.filter(item =>{
        return item !== 0
    })

    //Tháng 3
    const arrTotalMarch = arr.map(item =>{
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
    const sumTotalMarch = arrTotalMarch.reduce((total, num) => total + num, 0)
    const arrInvoiceMarch = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "03"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceMarch = arrInvoiceMarch.filter(item =>{
        return item !== 0
    })

    //Tháng 4
    const arrTotalApril = arr.map(item =>{
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
    const sumTotalApril = arrTotalApril.reduce((total, num) => total + num, 0)
    const arrInvoiceApril = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "04"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceApril = arrInvoiceApril.filter(item =>{
        return item !== 0
    })

    //Tháng 5
    const arrTotalMay = arr.map(item =>{
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
    const sumTotalMay = arrTotalMay.reduce((total, num) => total + num, 0)
    const arrInvoiceMay = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "05"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceMay = arrInvoiceMay.filter(item =>{
        return item !== 0
    })

    //Tháng 6
    const arrTotalJune = arr.map(item =>{
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
    const sumTotalJune = arrTotalJune.reduce((total, num) => total + num, 0)
    const arrInvoiceJune = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "06"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceJune = arrInvoiceJune.filter(item =>{
        return item !== 0
    })

    //Tháng 7
    const arrTotalJuly = arr.map(item =>{
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
    const sumTotalJuly = arrTotalJuly.reduce((total, num) => total + num, 0)
    const arrInvoiceJuly = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "07"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceJuly = arrInvoiceJuly.filter(item =>{
        return item !== 0
    })

    //Tháng 8
    const arrTotalAugust = arr.map(item =>{
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
    const sumTotalAugust = arrTotalAugust.reduce((total, num) => total + num, 0)
    const arrInvoiceAugust = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "08"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceAugust = arrInvoiceAugust.filter(item =>{
        return item !== 0
    })

    //Tháng 9
    const arrTotalSeptember = arr.map(item =>{
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
    const sumTotalSeptember = arrTotalSeptember.reduce((total, num) => total + num, 0)
    const arrInvoiceSeptember = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "09"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceSeptember = arrInvoiceSeptember.filter(item =>{
        return item !== 0
    })

    //Tháng 10
    const arrTotalOctober = arr.map(item =>{
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
    const sumTotalOctober = arrTotalOctober.reduce((total, num) => total + num, 0)
    const arrInvoiceOctober = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "10"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceOctober = arrInvoiceOctober.filter(item =>{
        return item !== 0
    })

    //Tháng 11
    const arrTotalNovember = arr.map(item =>{
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
    const sumTotalNovember = arrTotalNovember.reduce((total, num) => total + num, 0)
    const arrInvoiceNovember = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "11"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceNovember = arrInvoiceNovember.filter(item =>{
        return item !== 0
    })

    //Tháng 12
    const arrTotalDecember = arr.map(item =>{
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
    const sumTotalDecember = arrTotalDecember.reduce((total, num) => total + num, 0)
    const arrInvoiceDecember = arr.map(item =>{
        const parts = item.invoiceDate.split('-'); // Tách chuỗi bởi dấu '-'
        const month = parts[1];
        if(month === "12"){
            const listTotal = item
            return listTotal
        }
        else{
            return 0
        }
    })
    const listInvoiceDecember = arrInvoiceDecember.filter(item =>{
        return item !== 0
    })
    //dữ liệu Charts
    const data = [
        {
            name: 'Tháng 1',
            invoice: listInvoiceJanuary.length,
            total: sumTotalJanuary,
            amt: 2400,
        },
        {
            name: 'Tháng 2',
            invoice: listInvoiceFebruary.length,
            total: sumTotalFebruary,
            amt: 2210,
        },
        {
            name: 'Tháng 3',
            invoice: listInvoiceMarch.length,
            total: sumTotalMarch,
            amt: 2400,
        },
        {
            name: 'Tháng 4',
            invoice: listInvoiceApril.length,
            total: sumTotalApril,
            amt: 2400,
        },
        {
            name: 'Tháng 5',
            invoice: listInvoiceMay.length,
            total: sumTotalMay,
            amt: 2400,
        },
        {
            name: 'Tháng 6',
            invoice: listInvoiceJune.length,
            total: sumTotalJune,
            amt: 2400,
        },
        {
            name: 'Tháng 7',
            invoice: listInvoiceJuly.length,
            total: sumTotalJuly,
            amt: 2400,
        },
        {
            name: 'Tháng 8',
            invoice: listInvoiceAugust.length,
            total: sumTotalAugust,
            amt: 2400,
        },
        {
            name: 'Tháng 9',
            invoice: listInvoiceSeptember.length,
            total: sumTotalSeptember,
            amt: 2400,
        },
        {
            name: 'Tháng 10',
            invoice: listInvoiceOctober.length,
            total: sumTotalOctober,
            amt: 2400,
        },
        {
            name: 'Tháng 11',
            invoice: listInvoiceNovember.length,
            total: sumTotalNovember,
            amt: 2400,
        },
        {
            name: 'Tháng 12',
            invoice: listInvoiceDecember.length,
            total: sumTotalDecember,
            amt: 2400,
        },
    ];
    return ( 
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
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
            <Bar dataKey="invoice" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="total" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer>

    );
}
 
export default HomeChart;