import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare  } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import './styles/modalStyle.css'
import { formatSalary } from './utils/formatSalary';
import { useState } from 'react';

function JobTableDetails(props){

    const job_details = props.job_details
    const date = new Date(job_details.job_post_date)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [hoveringImg, setHoveringImg] = useState(false)

    const handleSelect = (selImg) => {
      console.log(selImg)
    };

    const renderDetails = (details, msg) =>{
        // return details.length > 0 ? details : msg;
        if(details){
            // Some fields like "salary" are integers therefore we'll change it to string to display the length
            return details.toString().length > 0 ? details : msg;
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
                            {job_details.job_link? 
                                <Modal.Title style={{fontSize: '30px'}}>
                                    <a href={job_details.job_link} target='_blank'>
                                        { job_details.job_name }
                                    </a> @ { job_details.company_name }
                                </Modal.Title>
                            :  <Modal.Title style={{fontSize: '30px'}}>
                                    { job_details.job_name } @ { job_details.company_name }
                                </Modal.Title>}
                           
                        </Col>
                        {/* <Col>
                            <a href={job_details.job_link} target='_blank'> 
                                <Button >
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> 
                                </Button>
                            </a>
                        </Col> */}
                    </Row>                
                </Container>
            </Modal.Header>
            <Modal.Body style={{ fontSize: '20px' }}>
                <Container>
                    <p muted style={{ fontSize: '15px'}}>
                        Posted: {formattedDate}
                    </p>
                </Container>
                
                <Container style={{padding: '10px'}}>
                
                    <b>
                        Current Status:
                    </b> { job_details.status }
                    <br style={{ marginBottom: '10px' }}></br>
                    <b>
                        Salary: 
                    </b> { job_details.salary?formatSalary(job_details.salary):"Salary not mentioned."}
                    <br/>
                    <b>
                        Location:
                    </b> { renderDetails(job_details.location,"Location not mentioned.")}
                </Container>
                {/* We don't use the "in" operator because it checks for keys. Includes checks the values*/}
                {Object.keys(job_details).includes('job_images')?
                    <Container style={{marginTop: '30px'}}>
                        <Row>
                            <Col md={6} lg={10} className="mx-auto">
                                <Carousel pause='hover' fade data-bs-theme="dark" onMouseEnter={()=>setHoveringImg(true)} onMouseLeave={()=>setHoveringImg(false)}>
                                    {job_details.job_images.map(img=>(
                                        <Carousel.Item interval={15000} >
                                            <Image 
                                                src={img.job_img_resized}
                                                className='carousel-image'
                                                fluid
                                            />
                                            {hoveringImg?
                                                <Carousel.Caption>
                                                    <Button href={img.job_img} target='_blank'>View Image</Button>
                                                </Carousel.Caption>
                                            :<></>}
                                            
                                        </Carousel.Item>
                                        
                                    ))}
                                </Carousel>
                            </Col>
                        </Row>
                    </Container>
                :<></>}
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