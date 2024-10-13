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

export default function ResetPassword(){

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
            axios.post(`${backendApiUrl}/users/auth/users/reset_password_confirm/`,{
                uid: uid,
                token: token,
                new_password: fd['new_pass'],
                re_new_password: fd['conf_new_pass']
            }).then((rep)=>{
                setLoading(true)
                showToast(true)
                // Need to wait a bit then redirect to login
                const timeoutFc = () =>{
                    setLoading(false)
                    nav('/login')
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
                        'new_pass': e.response.data.new_password
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
                    Resetting Password
                </h2>
                <p className="text-center text-muted">
                    Enter your new password.
                </p>
                <Form onSubmit={subForm}>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="New Password"
                        className="mb-3"
                    >
                        <Form.Control name='new_pass' onChange={updateForm} type="password" required placeholder="New Password" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Confirm New Password">
                        <Form.Control name='conf_new_pass' onChange={updateForm} type="password" required placeholder="Confirm New Password" />
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
                            <Button variant="outline-danger" type='submit'>Reset Password</Button>
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
                <strong className="me-auto">Password Reset</strong>
            </Toast.Header>
            <Toast.Body>
                Your password has been reset! Please login with your new password.
            </Toast.Body>
        </Toast>
    </>)
}