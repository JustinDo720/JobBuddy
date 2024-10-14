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

    const [showRA, setShowRA] = useState(false)

    const toggleShowRA = () =>{
        setShowRA(!showRA)
    }

    const handleCloseRA = () => {
        setShowRA(false)
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
                // If successful we'll clear all err messages
                setFormErr(prevErr=>{
                    const {email_err, pass_err, pass_missmatch, ...rest} = prevErr
                    return rest
                })
                toggleShowRA()
            }).catch((err)=>{
                if(err.response.data.email){
                    setFormErr((prevErr)=>({
                        ...prevErr,
                        'email_err': "This email is already in use. Please use a different Email."
                    }))

                    // If there's an err with email we'll clear password 
                    setFormErr(prevErr=>{
                        const {pass_err, ...rest} = prevErr
                        return rest 
                    })
                } else if(err.response.data.password){
                    setFormErr((prevErr)=>({
                        ...prevErr,
                        'pass_err': "This password is too common"
                    }))
                    // If there's an err with email we'll clear password 
                    setFormErr(prevErr=>{
                        const {email_err, ...rest} = prevErr
                        return rest
                    })
                }
            })

        } else {
            setFormErr((prevErr)=>({
                ...prevErr,
                'pass_missmatch': 'Both passwords must match'
            }))
        }
    }

    const addErr = (err_msg)=>{
        setFormData((prevErr)=>({
            ...prevErr,
            'current_form_err': err_msg
        }))
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
                                    {Object.values(formErr).map(err=> (
                                        <>
                                            <br/>
                                            <Form.Text style={{color:'red'}}>
                                                { err }
                                            </Form.Text>
                                        </>
                                    ))}
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
        <RegActivate show={showRA} handleClose={handleCloseRA} email={formData.email} password={formData.password}></RegActivate>

    </>
}