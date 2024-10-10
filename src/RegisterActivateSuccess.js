import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card  from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export default function ActivateSuccess(){

    const { uid, token } = useParams();
    useEffect(()=>{

    }, [uid, token])

    return(<>
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '100%', maxWidth: '500px', padding: '20px' }}>
                <h2 className="text-center text-success">Success</h2>
                <p className="text-center">
                Your account has been activated. You are automatically signed in.
                </p>
                <p className="text-center text-muted">
                Return to the dashboard or continue with sign-in.
                </p>
                <Row className="mt-4">
                <Col className="d-flex justify-content-around">
                    <Button variant="outline-primary" href="/dashboard">Go to Dashboard</Button>
                    <Button variant="outline-secondary" href="/login">Sign In</Button>
                </Col>
                </Row>
            </Card>
        </Container>
    </>)
}