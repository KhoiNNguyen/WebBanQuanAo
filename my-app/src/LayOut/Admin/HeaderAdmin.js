import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const HeaderAdmin = () => {
    return ( 
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Admin/Brands">Thương Hiệu</Nav.Link>
                        <Nav.Link href="/Admin/Colors">Màu Sắc</Nav.Link>
                        <Nav.Link href="/Admin/Sizes">Size</Nav.Link>
                        <Nav.Link href="/Admin/Vouchers">Vouchers</Nav.Link>
                        <Nav.Link href="/Admin/ProductTypes">Loại sản phẩm</Nav.Link>
                        <Nav.Link href="/Admin/ProductSales">Giảm giá sản phẩm</Nav.Link>
                        <Nav.Link href="/Admin/PaymentMethods">Phương thức thanh toán</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
     );
}
 
export default HeaderAdmin;