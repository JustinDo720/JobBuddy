import { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Figure from 'react-bootstrap/Figure';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faKey } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import './styles/myBtn.css'
import { Link } from 'react-router-dom'
import ForgotPassword from "./LoginForgotPassword";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setActivation } from "./redux/Activation/activation_action";
import { useNavigate } from "react-router-dom";

export default function Register(){
    useEffect(()=>{
        document.title = 'JobBuddy | Login'
      },[])

    const [showFP, setShowFP] = useState(false)
    const [fd, setFD] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const baseUrl = useSelector((state)=>state.api_url.backendApiUrl)

    const submitForm = (e)=>{
        e.preventDefault()
        console.log(fd)
        axios.post(`${baseUrl}/users/api/token/`, fd).then((rep)=>{
            console.log(rep.data)
            dispatch(setActivation({
                acc_activated: true,
                access_token:rep.data.access,
                refresh_token:rep.data.refresh,
                trusted_dev: fd['trust_device']?true:false
            }))
            navigate('/')
        })
    }

    const updateFD = (e)=>{
        const {name,value} = e.target

        setFD((prevFD)=>({
            ...prevFD,
            [name]:value
        }))
    }

    const toggleShowFP = ()=>{
        setShowFP(!showFP)
    }

    const handleClose = ()=>{
        setShowFP(false)
    }

    return <>
        <Container style={{
                padding: '150px', 
                marginTop: '20px', 
                borderRadius: '6px',
                backgroundColor: 'white', 
            }} 
            fluid='md'>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Container style={{padding: '20px'}}>
                        <Figure style={{textAlign: 'center'}}>
                            <Figure.Image
                                width={350}
                                height={350}
                                alt="job_buddy_icon_transparent"
                                src="/job_buddy_icon-removebg-preview.png"
                            />
                            <Figure.Caption style={{fontSize: '1.5rem'}}>
                                <i>
                                    Track your job applications, set goals, and stay organized on your job search journey.
                                </i>
                            </Figure.Caption>
                        </Figure>
                    </Container>
                </Col>
                <Col xs={12} md={6} style={{margin:'auto'}}>
                    <Container style={{padding: '20px', textAlign:'center'}}>
                        <h1 style={{ marginBottom: '35px', color: '#2b343e'}}>
                            <b>
                                Sign In 
                            </b>
                        </h1>
                        <Form onSubmit={(e)=>{submitForm(e)}}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="email_field">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </InputGroup.Text>
                                <Form.Control
                                    size="lg"
                                    type='email'
                                    name='email'
                                    onChange={updateFD}
                                    required
                                    placeholder="Email"
                                    aria-label="email"
                                    aria-describedby="email_field"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="password_field">
                                    <FontAwesomeIcon icon={faLock} />
                                </InputGroup.Text>
                                <Form.Control
                                    size="lg"
                                    type='password'
                                    name='password'
                                    onChange={updateFD}
                                    required
                                    placeholder="Password"
                                    aria-label="password"
                                    aria-describedby="password_field"
                                />
                            </InputGroup>
                
                            <Row className="justify-content-md-center" style={{padding:'15px'}}>
                                <Col xs={12} md={7}>
                                    <InputGroup>
                                        <Form.Check type="checkbox" label='Remember me' name="trust_device" onChange={updateFD} style={{ fontSize: '1.12rem'}}/>
                                    </InputGroup>
                                </Col>
                                <Col xs={12} md={5}>
                                    <Link onClick={toggleShowFP} className='no-underline-link' style={{ fontSize: '1.12rem'}}>Forgot Password</Link>
                                </Col>
                            </Row>

                            <div className="d-grid gap-2" style={{padding:'15px'}}>
                                <Button variant="success" type='submit'>
                                    Login
                                </Button>
                            </div>
            
                        </Form>
                        
                    </Container>
                    <div style={{ textAlign:'center'}}>
                        <p style={{fontSize:'0.8rem'}} className="secondary">
                            Don't have an account? <Link to='/register' className='no-underline-link'>Register</Link>
                        </p>
                    </div>
                    
                </Col>
            </Row>
        </Container>
        
        {/* Forgot Password Modal */}
        <ForgotPassword show={showFP} handleClose={handleClose}></ForgotPassword>
    </>
}