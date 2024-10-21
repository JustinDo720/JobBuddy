import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card  from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from './api/axiosConfig'
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setActivation } from './redux/Activation/activation_action'; // Import the action

export default function ActivateSuccess(){

    const { uid, token } = useParams();
    const backendApiUrl = useSelector((state)=>state.api_url.backendApiUrl)
    const dispatch = useDispatch();
    const isActivated = useSelector((state) => state.activate.acc_activated);

    useEffect(()=>{
        // Here's our error: we were posting to the wrong url.
        // In Django Djoser settings, we had a url:  'ACTIVATION_URL': '/activate/{uid}/{token}'
        //
        // This is NOT what you're posting to with axios. You're posting to 'users/activation' with a uid and token
        document.title = 'JobBuddy | Activation'
  
        axios.post(`${backendApiUrl}/users/auth/users/activation/`, {'uid':uid, 'token':token}).then((rep)=>{
                dispatch(setActivation({acc_activated:true}))
        }).catch((e)=>{})
    }, [])

    return(<>
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '100%', maxWidth: '500px', padding: '20px' }}>
                <h2 className={`text-center ${isActivated? "text-success":"text-danger"}`}>
                    {isActivated?"Success":"Failed"}
                </h2>
                <p className="text-center">
                    {isActivated?"Your account has been activated. You are automatically signed in."
                    :"Your account has NOT been activated. Please check your email."}
                
                </p>
                <p className="text-center text-muted">
                Return to the dashboard or previous tab to be sign-in.
                </p>
                <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                    <Button variant="outline-primary" href="/">Go to Home</Button>
                </Col>
                </Row>
            </Card>
        </Container>
    </>)
}