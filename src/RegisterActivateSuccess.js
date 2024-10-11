import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card  from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
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
        dispatch(setActivation({acc_activated:true}))
        // axios.post(`${backendApiUrl}/users/auth/users/activation/`, {'uid':uid, 'token':token}).then((rep)=>{
        //     // Now let's go ahead and grab some user information
        //     axios.post(`${backendApiUrl}/users/api/token/`, {
        //         email: email,
        //         password: password
        //     }).then((rep)=>{
        //         // after we post we could send our dispatch for information 
        //         console.log(rep.data)
        //         // dispatch(setActivation(
        //         //     acc_activated=true,
        //         //     access_token='',
        //         //     refresh_token='',
        //         //     username='',
        //         // ));
        //     })
            
        //     // We need to update our activation state in the store so... 
        //     // Let's dispatch our action 
        // }).catch((e)=>{

        // })
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
                Return to the dashboard or continue with sign-in.
                </p>
                <Row className="mt-4">
                <Col className="d-flex justify-content-around">
                    <Button variant="outline-primary" href="/">Go to Home</Button>
                    <Button variant="outline-secondary" href="/login">Sign In</Button>
                </Col>
                </Row>
            </Card>
        </Container>
    </>)
}