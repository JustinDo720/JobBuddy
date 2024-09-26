import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './styles/myStyle.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Home from './Home';
import Login from './Login';
import Register from './Register';



function App() {

  const star_link = 'https://interviewsteps.com/blogs/news/amazon-star-method'
  const glassdoor_salary_link = 'https://www.glassdoor.com/Salaries/index.htm'
  

  return (
    <>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg='dark' data-bs-theme="dark">
          <Container>
            <Navbar.Brand>
              <Link to='/' className='text-decoration-none my-title'>
                JobBuddy
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Resources" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href={star_link}>
                    STAR Interview Guide
                  </NavDropdown.Item>
                  <NavDropdown.Item href={glassdoor_salary_link}>
                    Glassdoor Salary Check
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  { /* Potential User Added Resources */ }
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link>
                  <Link to='register/' className='text-reset text-decoration-none'>
                    Register
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to='login/' className='text-reset text-decoration-none'>
                    Login
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Router Control System */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='login/' element={<Login/>}/>
          <Route path='register/' element={<Register/>}/>
        </Routes>
      </Router>
      
    </>

  );
}

export default App;
