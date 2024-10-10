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
import ResendConfirmation from "./RegisterResendConfirmation";
import RegActivate from "./RegisterActivate";
import axios from "axios";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Register(){
    useEffect(()=>{
        document.title = 'JobBuddy | Register'
      },[])

    const backendApiUrl = useSelector((state)=>state.api_url.backendApiUrl)
    const navigate = useNavigate();

    const [showRC, setShowRC] = useState(false)

    const toggleShowRC = ()=>{
        setShowRC(!showRC)
    }

    const handleClose = ()=>{
        setShowRC(false)
    }

    const [showActivate, setShowActivate] = useState(false)

    const toggleShowActivate = ()=>{
        setShowActivate(!showActivate)
    }

    const handleCloseActivate = ()=>{
        setShowActivate(false)
    }

    const [formData, setFormData] = useState({})

    const addFormData = (e)=>{
        let {name, value} = e.target
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const [formErr, setFormErr] = useState({})

    const submitForm = (e)=>{
        e.preventDefault()
        if (formData['password'] === formData['re_password']){

            axios.post(`${backendApiUrl}/users/auth/users/`, formData).then((rep)=>{
                console.log(rep.data)
                let uid = '#'
                let token = '#'
                toggleShowActivate()
                // // Redirect to the activate page with uid and token
                // navigate(`/activate/${uid}/${token}`);
                // Then we save their email and password as cookies (maybe have a checkbox to do keep signed in )
                // Redirect to Home Page
            })

        } else {
            setFormErr((prevErr)=>({
                ...prevErr,
                'pass_missmatch': 'Both passwords must match'
            }))
        }
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
                                Create Account
                            </b>
                        </h1>
                        <Form onSubmit={(e)=>submitForm(e)}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="username_field">@</InputGroup.Text>
                                <Form.Control
                                    size="lg"
                                    type='text'
                                    name='username'
                                    required
                                    onChange={addFormData}
                                    placeholder="Username"
                                    aria-label="username"
                                    aria-describedby="username_field"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="email_field">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </InputGroup.Text>
                                <Form.Control
                                    size="lg"
                                    type='email'
                                    required
                                    name='email'
                                    onChange={addFormData}
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
                                    required
                                    name='password'
                                    onChange={addFormData}
                                    placeholder="Password"
                                    aria-label="password"
                                    aria-describedby="password_field"
                                />
                                
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="confirm_password_field">
                                    <FontAwesomeIcon icon={faKey} />
                                </InputGroup.Text>
                                <Form.Control
                                    id='conf_pass'
                                    size="lg" 
                                    type='password'
                                    required
                                    name='re_password'
                                    onChange={addFormData}
                                    placeholder="Confirm Password"
                                    aria-label="confirm password"
                                    aria-describedby="confirm_password_field"
                                />
                                <br/>
                            </InputGroup>                           
                        
                            <Row className="justify-content-md-center" style={{padding:'15px'}}>
                                <Col xs={12} md={5}>
                                    {formErr.pass_missmatch?
                                        <Form.Text id="conf_pass" style={{color:'red'}}>
                                            { formErr.pass_missmatch}
                                        </Form.Text>
                                    : <></>}
                                </Col>
                                <Col xs={12} md={7}>
                                    <Link onClick={toggleShowRC} className='no-underline-link' style={{ fontSize: '1.12rem'}}>Resend Confirmation</Link>
                                </Col>
                            </Row>
                            <div className="d-grid gap-2" style={{padding:'15px'}}>
                                <Button className='my-orange-btn' variant="outline-none" type='submit'>
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </Container>
                    <div style={{ textAlign:'center'}}>
                        <p style={{fontSize:'0.8rem'}} className="secondary">
                            Already have an account? <Link to='/login' className='no-underline-link'>Login</Link>
                        </p>
                    </div>
                    
                </Col>
            </Row>
        </Container>

        {/* Confirmation Modal */}
        <ResendConfirmation show={showRC} handleClose={handleClose}></ResendConfirmation>
        <RegActivate show={showActivate} handleClose={handleCloseActivate} email={formData.email}></RegActivate>

    </>
}