import { useEffect, useState } from 'react';
import MenuService from '../../service/MenuService';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MainNavigation = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        MenuService.getAllMenus().then((res) => {
            setMenus(res.data);
        })

        // eslint-disable-next-line
        
    }, []);

    return (
        <div>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                {menus.map(
                    menu =>
                    <Nav.Link key={menu.menuCd} href={`http://localhost:3000/${menu.menuCd}`}>{menu.menuNm}</Nav.Link>
                )}
            </Nav>
            </Container>
        </Navbar>
        
        </div>
        );
};

export default MainNavigation;