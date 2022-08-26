import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import './header.css';
const header = () => {
    return (
        <div className='header'>
            <Navbar className='header_nav' >
                <Container>
                    <Navbar.Brand href="#home">React Todo Project</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/">Todos List</Link>|
                        <Link to="/new_todo">New Todo</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
export default header