import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MenuService from '../service/MenuService';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

const HeaderComponent = () => {

    const [menus, setMenus] = useState([]);

    useEffect(() => {
        MenuService.getAllMenus().then((res) => {
            setMenus(res.data);
        })

        // eslint-disable-next-line
        
    }, []);

    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        {menus.map(
                            menu =>
                            <Nav.Link key={menu.id} href={`http://localhost:3000/${menu.id}`}>{menu.menuNm}</Nav.Link>
                        )}
                    </Nav>
                    </Container>
                </Navbar>
                <div className='Text-align'>
                    <Link to='/login'>로그인</Link>
                </div>
                
                
            </header>

        </div>
        
    );
};

export default HeaderComponent;