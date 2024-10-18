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
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar'

function JobTableAddJob(props){

    const baseURL = useSelector((state)=>state.api_url.backendApiUrl)
    const {user_id, access_token} = useSelector((state)=>state.activate)
    const [imgs, setImgs] = useState([])
    const [states, setStates] = useState([])
    const [status, setStatus] = useState([])
    // Stirng at first then we'll change to digit afterwards
    const [imgPercent, setImgPercent] = useState('')
    const [imgContrib, setImgContrib] = useState(0)

    useEffect(()=>{
        axios.get(`${baseURL}/choices/`).then((rep)=>{
            setStatus(rep.data.status_choices)
            setStates(rep.data.state_choices.slice(1))
        })
    },[props.show])
    

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
    
    const closing_modal = ()=>{
        props.refreshJobs()
        props.toasting()
        props.handleClose()
    }

    const uploadImage = (img, job_id)=>{
        // Making a new FormData because this is dealing with files 
        const img_fd = new FormData();
        // This is going to making our img_fd = {job:id, job_img:img_obj}
        img_fd.append('job', job_id)
        img_fd.append('job_img', img)

        axios.post(`${baseURL}/jobs/images/`,img_fd, {headers:{Authorization:`Bearer ${access_token}`,'Content-Type': 'multipart/form-data'}}).then((rep)=>{
            setImgPercent((prevImgPercent) => {
                const currentImgPercent = Number(prevImgPercent) || 0; // Converts to number, defaults to 0 if NaN
                const new_pert = currentImgPercent + imgContrib
                console.log(new_pert)

                // Here we're going to check if our new percent is >= 100 
                if(new_pert => 100){
                    closing_modal()
                }
                return new_pert;
            });

            
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
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
            "status": formData.status
        }

        axios.post(`${baseURL}/jobs/`, api_fd,{headers:{Authorization:`Bearer ${access_token}`}}).then((rep)=>{
            // We need to check if our user is submitting an image.
            // Once we post we should have the new jobs ID so we could use that to post our image 
            if(imgs){
                setImgContrib(Number((100 / imgs.length).toFixed(2)))
                imgs.forEach(img=>{
                    uploadImage(img, rep.data.id)
                })
            } else {
                closing_modal()
            }

        }).catch((e)=>{
            console.log(e)
        })
        
    }

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
                                {typeof imgPercent === 'number'?<ProgressBar min={0} max={100} now={imgPercent} label={`${imgPercent}%`} />:<></>}
                            </Col>
                        </Row>
                        <Row >
                            <Col className="d-grid gap-2" style={{ textAlign: 'center'}}>
                                <Button variant='success' type='submit'>
                                    Add{formData.job_name.length > 0 && formData.company_name.length > 0?`: ${formData.job_name} @ ${formData.company_name}`:''}
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

export default JobTableAddJob