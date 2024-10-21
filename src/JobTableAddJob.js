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
import axios from './api/axiosConfig'
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Spinner from 'react-bootstrap/Spinner';

function JobTableAddJob(props){

    const baseURL = useSelector((state)=>state.api_url.backendApiUrl)
    const {user_id, access_token} = useSelector((state)=>state.activate)
    const [imgs, setImgs] = useState([])
    const [states, setStates] = useState([])
    const [status, setStatus] = useState([])
    // Stirng at first then we'll change to digit afterwards
    const [imgPercent, setImgPercent] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        axios.get(`${baseURL}/choices/`).then((rep)=>{
            setStatus(rep.data.status_choices)
            setStates(rep.data.state_choices.slice(1))
        })
    },[])
    

    // Default dictionary keys of all <Form.Control name=''> attribute for us to use the spread operator
    const [formData, setFormData] = useState({
        job_name: '',
        company_name: '',
        link: '',
        salary: '',
        city: '',
        state: '',
        status: '',
        job_summary: '',
    });

    const location = () => {
        return `${formData.city}, ${formData.state}`;
    };

    const updateField = (e) => {
        // These are set meaning you cannot change the name of these because you're essentially doing:
        // e.target.name
        // e.target.value
        const { name, value } = e.target

        // Using the spread operator
        setFormData({
            ...formData,
            [name]:value
        })
    }
    
    const updateFile = (e) => {
        // You need to treat this as an array. We have multiple files; therefore, we're going to add them all to our "imgs" state.
        const selectedFiles = Array.from(e.target.files);
        // Make sure this isn't a dictionary but rather an array because we're going to forEach this during the posting phase
        setImgs(prevImgs=>[
            ...prevImgs,
            // Spread operator for our array
            ...selectedFiles
        ])
    }
    
    const closing_modal = (completed=false)=>{
        // Make sure we clear out formdata
        setFormData(
            {
                job_name: '',
                company_name: '',
                link: '',
                salary: '',
                city: '',
                state: '',
                status: '',
                job_summary: '',

            }        
        )
        // In case our users set an image we reset our properties back to default
        setLoading(false)
        setImgs([])

        if(completed){
            props.refreshJobs()
            props.toasting()
        }
        props.handleClose()
    }

    const uploadImage = (img, job_id)=>{
        // Making a new FormData because this is dealing with files 
        const img_fd = new FormData();
        // This is going to making our img_fd = {job:id, job_img:img_obj}
        img_fd.append('job', job_id)
        img_fd.append('job_img', img)

        axios.post(`${baseURL}/jobs/images/`,img_fd, {headers:{Authorization:`Bearer ${access_token}`,'Content-Type': 'multipart/form-data'}}).then((rep)=>{
            

        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        setLoading(true)
        const api_fd = {
            // Required:
            "job_name": formData.job_name,
            "job_city": formData.city,
            "company_name": formData.company_name,
            "user": user_id,
            // Optional:
            "salary": Number(formData.salary),
            "job_link": formData.link,
            "job_summary": formData.job_summary,
            "job_state": formData.state,
            // applied is our default so if we have status:'' that just means the user chose applied 
            "status": formData.status === ''? 'applied' :formData.status
        }

        axios.post(`${baseURL}/jobs/`, api_fd,{headers:{Authorization:`Bearer ${access_token}`}}).then((rep)=>{
            // We need to check if our user is submitting an image.
            // Once we post we should have the new jobs ID so we could use that to post our image 
            if(imgs.length > 0){
                imgs.forEach(img=>{
                    uploadImage(img, rep.data.id)
                })
            } else {
                closing_modal(true)
            }

        }).catch((e)=>{
            console.log(e)
        })
        
    }

    return (
        <>
        <Modal show={props.show} 
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
                                <Form.Text id="required_fields" style={{color: 'red'}}>
                                    * Are Required Fields
                                </Form.Text>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <FloatingLabel
                                    controlId="floatingJobTitle"
                                    label="* Job Title"
                                    style={{ fontSize: '17px'}}
                                >
                                    <Form.Control type="text" name='job_name' value={formData.job_name} onChange={updateField} required placeholder="Software Engineer" />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingCtyName" label="* Company Name" style={{ fontSize: '17px'}}>
                                    <Form.Control type="text" name='company_name' value={formData.company_name} onChange={updateField} required placeholder="Google" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <FloatingLabel
                                        controlId="floatingLink"
                                        label="Link"
                                        style={{ fontSize: '17px'}}
                                    >
                                        <Form.Control type="url" name='link' value={formData.link} onChange={updateField} placeholder="#" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                    Salary
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control type='number' name='salary' value={formData.salary} onChange={updateField} id="inlineFormInputGroup" placeholder="Salary" />
                                </InputGroup>
                            </Col>
                            <Col xs='auto'>
                                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                    Location
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control type='text' name='city' value={formData.city} onChange={updateField} placeholder="* City" required/>
                                    <Form.Select required name='state' value={formData.state} onChange={updateField}>
                                        <option value=''>* Select State</option>
                                        {states.map((state)=>(
                                            <option value={state[0]}>
                                                {state[1]}
                                            </option>
                                        ))}
                                        
                                    </Form.Select>
                                </InputGroup>
                            </Col>
                            <Col xs='auto'>
                                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                    Status
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>* Status:</InputGroup.Text>
                                    <Form.Select required name='status' value={formData.status} onChange={updateField}>
                                        {status.map((stat)=>(
                                            <option value={stat[0]}>
                                                {stat[1]}
                                            </option>
                                        ))}
                                        
                                    </Form.Select>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                            <InputGroup>
                                <InputGroup.Text>Job Summary</InputGroup.Text>
                                <Form.Control as="textarea" aria-label="job summary" name='job_summary' value={formData.job_summary} onChange={ updateField }/>
                            </InputGroup>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Images</Form.Label>
                                    <Form.Control type="file" size="sm" aria-describedby="multi_image_help" multiple onChange={updateFile}/>
                                    <Form.Text id="multi_image_help" style={{fontSize:'0.75rem'}} muted>
                                        Optional: You may select multiple images at once by holding your "Ctrl" key and clicking on your desired file.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="d-grid gap-2" style={{ textAlign: 'center'}}>
                                {loading?
                                <Button variant="primary" disabled>
                                    <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />
                                    Adding...
                                </Button>
                                :<Button variant='success' type='submit'>
                                    Add{formData.job_name.length > 0 && formData.company_name.length > 0?`: ${formData.job_name} @ ${formData.company_name}`:''}
                                </Button>}
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => {closing_modal()}}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default JobTableAddJob