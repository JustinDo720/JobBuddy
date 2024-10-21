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
import ActivateSuccess from './RegisterActivateSuccess';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from './redux/Logout/logout_action';
import { useNavigate } from 'react-router-dom';
import ResetPassword from './LoginResetPassword';
import { setActivation } from './redux/Activation/activation_action';
import ForgotPassword from './LoginForgotPassword';
import ChangeEmail from './LoginChangeEmail';
import ResetEmail from './LoginResetEmail';
import { refreshToken } from './utils/refreshToken';
import { setNewAccessToken } from './redux/RefreshToken/refresh_action';

function App() {

  const star_link = 'https://interviewsteps.com/blogs/news/amazon-star-method'
  const glassdoor_salary_link = 'https://www.glassdoor.com/Salaries/index.htm'
  const username = localStorage.getItem('username') || ''
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const baseURL = useSelector((state)=>state.api_url.backendApiUrl)
  const {access_token,refresh_token} = useSelector((state)=>state.activate)

  const [showFP, setShowFP] = useState(false)
  const [showCE, setShowCE] = useState(false)

  // Since ONLY App has our logout button
  const logout = async () => {
    await dispatch(setLogout({})); // Wait for the logout to complete
    // It's better to force a refresh because we don't want content remaining if the user is logged out so 
    navigate('/')
    window.location.reload()
  };

  // useEffect(() => {
  //   // We don't need to dispatch our setActivation because...
  //   // Redux initializes all reducer states, and since our activationReducer pulls values from localStorage...
  //   // our store is populated with those values upon app initialization.
  //   //
  //   // These values will remain in the Redux store until the user logs out. 
  //   // Every time the user registers or logs in, the values are updated in localStorage, 
  //   // which are then used by the store until the session ends or the user logs out.
  //   const checkingAccessToken = async()=>{
  //     if (access_token && refresh_token) {
  //       // Therefore we create an additional refresh token action/reducer to verify that our access token is still valid
  //       // If not, it will update the localStorage which then updates the redux store.
  //       // If the refreshToken expires then we redirect to the login page
  //       const new_token = await refreshToken(access_token, refresh_token, baseURL)
  //       // If the new access token doesn't match our current access token, then it changed and our util function works
  //       if(new_token.length > 0 && new_token != access_token){
  //         console.log('Access Token Expired; however, refresh token still works so we are getting a new access token')
  //         dispatch(setNewAccessToken({access_token:new_token}));
  //         window.location.reload()
  //       } else if(!new_token){
  //         // The refresh token has expired or something wrong with our store
  //         logout()
  //       }
  //     }
  //   }

  //   // Running our async function (because we cannot async useEffect, we created a local anonymous function)
  //   checkingAccessToken()
    
  // });

  return (
    <>
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
              { !localStorage.getItem('acc_activated') ?
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
              : <Nav>
                  <Navbar.Text style={{margin:'auto'}} className='my-custom-text-color'>
                      Welcome, <b>{ username }</b>  
                  </Navbar.Text>
                  <NavDropdown 
                    title={<Button variant="outline-light">
                          <FontAwesomeIcon icon={faUser} />
                          </Button>} 
                    id="basic-nav-dropdown"
                    className='custom-dropdown'
                    alignRight
                    style={{'margin-left': '20px'}}
                    >
                    <NavDropdown.Item href="#action/3.1">View Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>{setShowCE(true)}}>
                      Change Email
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>{setShowFP(true)}}>
                      Forgot Password
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.ItemText style={{textAlign:'center'}}>
                      <div className="d-grid gap-2">
                        <Button variant="danger" size="sm" onClick={logout}>Log Out</Button>
                      </div>
                    </NavDropdown.ItemText>
                  </NavDropdown>
                </Nav>
              }
              
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Router Control System */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='login/' element={<Login/>}/>
          <Route path='register/' element={<Register/>}/>
          <Route path='activate/:uid/:token' element={<ActivateSuccess/>}/>
          <Route path='email/reset/confirm/:uid/:token' element={<ResetEmail/>}/>
          <Route path='password/reset/confirm/:uid/:token' element={<ResetPassword/>}/>
        </Routes>
      
        {/* Modals */}
        <ForgotPassword show={showFP} handleClose={()=>{setShowFP(false)}}></ForgotPassword>
        <ChangeEmail show={showCE} handleClose={()=>{setShowCE(false)}}></ChangeEmail>
    </>

  );
}

export default App;
