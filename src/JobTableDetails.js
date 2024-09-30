import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare  } from '@fortawesome/free-solid-svg-icons'
import './styles/modalStyle.css'


function JobTableDetails(props){

    const job_details = props.job_details

    const renderDetails = (details, msg) =>{
        // return details.length > 0 ? details : msg;
        if(details){
            return details.length > 0 ? details : msg;
        } else {
            return msg
        }
        
    }
    
    return (
        <>
        <Modal show={props.show} 
               onHide={(event) => {props.handleClose(event)}}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
               >
            <Modal.Header>
                <Container>
                    <Row>
                        <Col>
                            <Modal.Title style={{fontSize: '30px'}}>
                                { job_details.job_name } @ { job_details.company_name }
                            </Modal.Title>
                        </Col>
                        <Col>
                            <a href={job_details.link} target='_blank'> 
                                <Button >
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> 
                                </Button>
                            </a>
                        </Col>
                    </Row>                
                </Container>
            </Modal.Header>
            <Modal.Body style={{ fontSize: '20px' }}>
                <Container style={{padding: '10px'}}>
                    <b>
                        Current Status:
                    </b> { job_details.status }
                    <br style={{ marginBottom: '10px' }}></br>
                    <b>
                        Salary: 
                    </b> { renderDetails(job_details.salary,"Salary not mentioned.")}
                    <br/>
                    <b>
                        Location:
                    </b> { renderDetails(job_details.location,"Location not mentioned.")}
                </Container>
                <Container style={{marginTop: '30px'}}>
                    <b>
                        Job Summary:
                    </b> 
                    <br></br>
                    { renderDetails(job_details.job_summary,"Job Summary not mentioned.")}
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

export default JobTableDetails