import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import './styles/modalStyle.css'

function JobTableAddJob(props){
    
    return (
        <>
        <Modal show={props.show} 
               onHide={(event) => {props.handleClose(event)}}
               size="lg"
               backdrop="static"
               aria-labelledby="contained-modal-title-vcenter"
               centered
               >
            <Modal.Header>
                <Modal.Title style={{fontSize: '30px'}}>
                    Adding Job
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: '20px' }}>
                {/* 
                    Fields: 
                        job_name (Text)
                        company_name (Text)
                        salary (Int)
                        status (Dropdown selection)
                        link (Text)
                        location (Country, State)
                        job_summary (Textarea)

                */}
                <Container>
                    <Row className="mb-3">
                        <Col>
                            <FloatingLabel
                                controlId="floatingJobTitle"
                                label="Job Title"
                                style={{ fontSize: '20px'}}
                            >
                                <Form.Control type="text" placeholder="Software Engineer" />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingCtyName" label="Company Name" style={{ fontSize: '20px'}}>
                                <Form.Control type="text" placeholder="Google" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel
                                    controlId="floatingLink"
                                    label="Link"
                                    style={{ fontSize: '20px'}}
                                >
                                    <Form.Control type="url" placeholder="#" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={(event) => {props.handleClose(event)}}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default JobTableAddJob