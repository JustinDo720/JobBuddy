import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from 'react'
import './styles/modalStyle.css'
import { useSelector } from 'react-redux';
import axios from 'axios';

function JobTableDeleteJob(props){

    const api_url = useSelector(state=>state.api_url.backendApiUrl)
    const access_token = useSelector(state=>state.activate.access_token)

    const [data, setData] = useState({
        id: '',
        job_name: '',
        company_name: '',
    });


    useEffect(()=>{
        setData(prev_state => ({
            ...prev_state,
            id: props.job_object.id,
            job_name: props.job_object.job_name,
            company_name: props.job_object.company_name
        }))

    }, [props.show])  // Agaain we're only running htis effect if it detects changes to our job_object 

    const submitForm = (e) => {
        e.preventDefault()
        axios.delete(`${api_url}/jobs/delete/${data.id}/`, {headers:{Authorization: `Bearer ${access_token}`}}).then(()=>{
            props.refreshJobs()
            props.toasting()
            props.handleClose()
        })
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
                <Modal.Title style={{fontSize: '30px'}}>
                    Remove {data.job_name} @ {data.company_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: '20px' }}>
                {/* 
                    Fields: 
                        job_name (Text) (D)
                        company_name (Text) (D)
                        salary (Int) (D)
                        status (Dropdown selection)
                        link (Text) (D)
                        location (Country, State)
                        job_summary (Textarea)

                */}
                <Container>
                    <Form onSubmit={ submitForm }>
                        <Row className='mb-2'>
                            <Col>
                                <Form.Text muted>
                                    Are you sure you want to remove <b>"{data.job_name}"</b> at the company: <b>"{data.company_name}"</b> from your list
                                    of jobs?
                                </Form.Text>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="d-grid gap-2" style={{ textAlign: 'center'}}>
                                <Button variant='outline-danger' type='submit'>
                                    Confirm Delete
                                </Button>
                            </Col>
                        </Row>
                    </Form>
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

export default JobTableDeleteJob