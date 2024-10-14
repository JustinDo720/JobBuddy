import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card  from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast'; 
// Redux
import { useSelector } from 'react-redux';

export default function ResetEmail(){

    const { uid, token } = useParams();
    const [fd, setFD] = useState({});
    const [fdErr, setFDErr] =  useState({});
    const [loading, setLoading] = useState(false)
    const [toast, showToast] = useState(false)
    const nav = useNavigate()
    const backendApiUrl = useSelector((state)=>state.api_url.backendApiUrl)

    const updateForm = (e) =>{
        const {name, value} = e.target
        setFD((prevFD)=>({
            ...prevFD,
            [name]:value
        }))
    }

    const subForm = (e) => {
        e.preventDefault()
        if(fd.new_pass === fd.conf_new_pass){
            axios.post(`${backendApiUrl}/users/auth/users/reset_email_confirm/`,{
                uid: uid,
                token: token,
                new_email: fd['new_email'],
                re_new_email: fd['conf_new_email']
            }).then((rep)=>{
                setLoading(true)
                showToast(true)
                // Need to wait a bit then redirect to login
                const timeoutFc = () =>{
                    setLoading(false)
                    if(localStorage.getItem('access_token')){
                        nav('/')
                    }
                    
                } 
                setTimeout(timeoutFc, 3000)

            }).catch((e)=>{
                console.log(e.response.data)
                setFDErr(prevErr=>{
                    const {pass_missmatch, ...rest} = prevErr
                    return rest
                })

                if (e.response.data.new_password){
                    setFDErr((prevErr)=>({
                        ...prevErr,
                        'new_email': e.response.data.new_email
                    }))
                }
            })
        } else {
            setFDErr((prevErr)=>({
                ...prevErr,
                'pass_missmatch': "These two passwords do not match."
            }))
        }
        
    }

    return(<>
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '100%', maxWidth: '500px', padding: '20px' }}>
                <h2 className='text-center'>
                    Resetting Email
                </h2>
                <p className="text-center text-muted">
                    Enter your new email.
                </p>
                <Form onSubmit={subForm}>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="New Email"
                        className="mb-3"
                    >
                        <Form.Control name='new_email' onChange={updateForm} type="Email" required placeholder="New Email" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingEmail" label="Confirm New Email">
                        <Form.Control name='conf_new_email' onChange={updateForm} type="email" required placeholder="Confirm New Email" />
                    </FloatingLabel>
                    {fd?
                      <>
                        <Row className="mt-4">
                            <Col className="d-flex justify-content-center">
                                {Object.values(fdErr).map(err=>(
                                    <p style={{color:'red'}}>
                                        {err}
                                    </p>
                                ))}
                            </Col>
                        </Row>
                    </>
                    :<></>}        
                    <Row className="mt-4">
                        <Col className="d-flex justify-content-center">
                            <Button variant="outline-danger" type='submit'>Reset Email</Button>
                        </Col>
                    </Row>
                    { loading ?
                        <>
                            <Row className="mt-4">
                                <Col className="d-flex justify-content-center">
                                    <div style={{textAlign:'center', padding:'15px'}}>
                                        <Spinner animation="grow" />
                                    </div>
                                </Col>
                            </Row>
                        </>
                    :<></>}
                </Form>
            </Card>
        </Container>
        <Toast bg='warning' 
            className="d-inline-block m-1" 
            style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}
            onClose={() => showToast(false)} 
            show={toast}
            autohide
            >
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Email Reset</strong>
            </Toast.Header>
            <Toast.Body>
                Your email has been reset! Please login with your new email.
            </Toast.Body>
        </Toast>
    </>)
}