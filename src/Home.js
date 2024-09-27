import { useEffect } from "react"
import JobTable from './JobTable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export default function Home(){
    useEffect(()=>{
        document.title = 'JobBuddy | Home Page'
      })

    return <>
        <Container>
            <Row>
                <Col>
                </Col>
                <Col xs={8}>
                    <JobTable/>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
       
    </>
}