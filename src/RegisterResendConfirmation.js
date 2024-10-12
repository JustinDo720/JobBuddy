import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast'; 

export default function ResendConfirmation(props){
    const baseUrl = useSelector((state)=>state.api_url.backendApiUrl)
    
    const [email, setEmail] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [toast, showToast] = useState(false)

    const updateEmail = (e)=>{
        setEmail(e.target.value)
    }

    const submitForm = (e)=>{
        e.preventDefault()
        setLoading(true)
        axios.post(`${baseUrl}/users/auth/users/resend_activation/`, {email: email}).then((rep)=>{
            setLoading(false)
            showToast(true)
            props.handleClose()
            
        }).catch((e)=>{
            setErrMsg('We cannot send an email to this email address. Please try a different email address.')
            console.log(e.response)
        })
    }

    return(
        <>
            <div
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal
                    show={props.show}
                    onHide={props.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation Link</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e)=>submitForm(e)}>
                            <Form.Label htmlFor="inputEmail">Email</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={updateEmail}
                                id="inputEmail"
                                required
                                aria-describedby="emailHelpBlock"
                            />
                            <Form.Text id="emailHelpBlock" muted>
                               You will recieve an email from us if an account exists with that email.
                            </Form.Text>
                            <br></br>
                            { errMsg ? 
                                <Form.Text id="emailHelpBlock" style={{color:'red'}}>
                                    { errMsg }
                                </Form.Text>
                            : <></>}    
                            
                            <br/>
                            <div style={{textAlign:'center', padding:'15px'}}>
                                <Button variant='primary' style={{color:'white'}} type='submit'>
                                    Resend Confirmation Link 
                                </Button>
                            </div>
                            <br></br>
                            { loading ?
                                <div style={{textAlign:'center', padding:'15px'}}>
                                    <Spinner animation="grow" />
                                </div>
                            :<></>}
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            
            <Toast bg='success' 
                className="d-inline-block m-1" 
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}
                onClose={() => showToast(false)} 
                show={toast}
                autohide
                >
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Email Confirmation Sent!</strong>
                </Toast.Header>
                <Toast.Body>An email has been sent. Please check your inbox. Remember, an email will only appear if there's a user with that email.</Toast.Body>
            </Toast>
            </div>
        </>
    )
}