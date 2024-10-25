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
import './styles/loadingOverlay.css'
import axios from './api/axiosConfig'
import { useSelector } from 'react-redux';
import Placeholder from 'react-bootstrap/Placeholder';
import Figure from 'react-bootstrap/Figure';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { JobTableEditImg } from './JobTableEditImageJob';
import { JobTableDelImage } from './JobTableDelImageJob';
import { JobTableAddImage } from './JobTableAddImageJob';
import Alert from 'react-bootstrap/Alert';

function JobTableEditJob(props){

    const [states, setStates] = useState([])
    const [status, setStatus] = useState([])
    const [placeholders, setPlaceholders] = useState(false)
    // Selected Image should be the first image in your job image array
    // Will be default to None but we'll update this on useEffect
    const [selImg, setSelImg] = useState(null)
    // Once we have the id we could filter the job image array to find the object
    const [imgInfo, setImgInfo] = useState(null)
    // Image Modifying Modal 
    const [editImg, setEditImg] = useState(false)
    const [alertImg, setAlertImg] = useState(false)
    const [delImg, setDelImg] = useState(false)
    const [alertDel, setAlertDel] = useState(false)
    const[addImg, setAddImg] = useState(false)
    const [alertAddImg, setAlertAddImg] = useState(false)
    const baseURL = useSelector((state)=>state.api_url.backendApiUrl)
    const {user_id, access_token} = useSelector((state)=>state.activate)


    // Default dictionary keys of all <Form.Control name=''> attribute for us to use the spread operator
    const [formData, setFormData] = useState({
        id: '',
        job_name: '',
        company_name: '',
        job_link: '',
        salary: '',
        status: '',
        job_summary: '',
    });

    const refresh_job_details = async ()=>{
        setPlaceholders(true)
        const rep1 = await axios.get(`${baseURL}/choices/`)
        setStatus(rep1.data.status_choices)
        setStates(rep1.data.state_choices.slice(1))
    

        const response = await axios.get(`${baseURL}/jobs/edit/${props.job_object.id}/`)
        const rep = response.data

        // Find all the keys within formData 
        let form_keys = Object.keys(formData)
        // For each key we're going to use the spread operator and continuously update more key:value pairs
        form_keys.forEach(key=>{
            setFormData(prevState=>({
                ...prevState,
                [key]: key === 'salary'?
                    Number(rep[key] || 0)
                    : rep[key] || ''
            }))
        })

        // Handling  City (job_city), State (job_state)
        if(rep['location']){
            let location = rep['location'].split(',')
            setFormData(prevState=>({
                ...prevState,
                job_city: location[0],
                job_state: location[1].replace(/\s/g,'')    // Whitespace
            }))
        }
        // Handling images 
        if(Object.keys(rep).includes('job_images')){
            setFormData(prevState=>({
                ...prevState,
                job_images: rep.job_images
            }))
            setSelImg(rep.job_images[0].id)
            setImgInfo(rep.job_images[0])
        }
        setPlaceholders(false)
    }

    // Parent Refresh
    const { refreshJobs } = props;
    

    // Updating formData state whenever our job_object prop is updated
    useEffect(()=>{
        // What happens is that props.show will continuosly change because of our parent componenet
        // however, we only want to run this code IF "show" variable is actually true.
        // Therefore we will run this code if props.show is true but the useEffect may run multiple times.
        if(props.show){
            refresh_job_details()
        }
    }, [props.show])

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

    const updateSelImg = (e)=>{
        const selectedValue = e.target.value;
        // We use find instead of filter because fitler was returning an arry instead of one match 
        const sel_img_obj = formData.job_images.find(img=>img.id==selectedValue)
        setSelImg(selectedValue)
        // AFter setting the id we're going to use this id to find the image's object 
        setImgInfo(sel_img_obj)
    }

    const editSelImgModal = ()=>{
        setEditImg(!editImg)
    }

    const toggleEditImgAlert = ()=>{
        setAlertImg(!alertImg)
    }

    const removeSelImgModal = ()=>{
        setDelImg(!delImg)
    }

    const toggleDelImgAlert = ()=>{
        setAlertDel(!alertDel)
    }

    const addImgModal = ()=>{
        setAddImg(!addImg)
    }

    const toggleAddImgAlert = ()=>{
        setAlertAddImg(!alertAddImg)
    }

    const closing_modal = (completed=false)=>{
        props.refreshJobs()
        if(completed){
            props.toasting()
        }
        props.handleClose()
    }

    const submitForm = (e) => {
        e.preventDefault()
        
        console.log(formData)
        axios.put(`${baseURL}/jobs/edit/${formData.id}/`, formData, {headers:{Authorization: `Bearer ${access_token}`}}).then(()=>{
            // props.refreshJobs()
            // props.toasting()
            // props.handleClose()
            closing_modal(true)
        })
        
    }

    return (
        <>
        <Modal show={props.show} 
               size="lg"
               backdrop="static"
               aria-labelledby="contained-modal-title-vcenter"
               centered
               className={editImg || delImg?'modal-left':''}
               >
            <Modal.Header style={{display:'inline-block'}}>
                <Modal.Title style={{fontSize: '30px'}}>
                    {placeholders?
                    <>
                        <Placeholder as="p" animation="glow">
                        <span >
                            Editing&nbsp;<Placeholder xs={12} style={{ width: '100%' }}/>
                        </span>
                        </Placeholder>
                    </>
                    :<>
                        Editing {formData.job_name} @ {formData.company_name}
                    </>}
                    
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
                                {placeholders?
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} />
                                    </Placeholder>
                                :<FloatingLabel
                                    controlId="floatingJobTitle"
                                    label="* Job Title"
                                    style={{ fontSize: '17px'}}
                                >
                                    <Form.Control type="text" name='job_name' value={formData.job_name} onChange={updateField} required placeholder="Software Engineer" />
                                </FloatingLabel>}
                                
                            </Col>
                            <Col>
                                {placeholders?
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} />
                                    </Placeholder>
                                :<FloatingLabel controlId="floatingCtyName" label="* Company Name" style={{ fontSize: '17px'}}>
                                    <Form.Control type="text" name='company_name' value={formData.company_name} onChange={updateField} required placeholder="Google" />
                                </FloatingLabel>}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                {placeholders?
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} />
                                    </Placeholder>
                                :<FloatingLabel
                                        controlId="floatingLink"
                                        label="Link"
                                        style={{ fontSize: '17px'}}
                                    >
                                        <Form.Control type="url" name='job_link' value={formData.job_link} onChange={updateField} placeholder="#" />
                                </FloatingLabel>}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                                {placeholders?
                                    <Col>
                                        <Placeholder as="div" animation="glow">
                                            <Placeholder xs={12} style={{ width: '100%' }}/>
                                        </Placeholder>
                                    </Col>
                                :<>
                                    <Col>
                                        <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>Salary</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <Form.Control type='number' name='salary' value={formData.salary} onChange={updateField} id="inlineFormInputGroup" placeholder="Salary" />
                                        </InputGroup>
                                    </Col>
                                </>}
                                {placeholders?
                                    <Col>
                                        <Placeholder as="div" animation="glow">
                                            <Placeholder xs={12} style={{ width: '100%' }}/>
                                        </Placeholder>
                                    </Col>      
                                :<>
                                    <Col xs='auto'>
                                        <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                            Location
                                        </Form.Label>
                                        <InputGroup>
                                            <Form.Control type='text' name='job_city' value={formData.job_city} onChange={updateField} placeholder="* City" required/>
                                            <Form.Select required name='job_state' value={formData.job_state} onChange={updateField}>
                                                {states.map((state)=>(
                                                    <option value={state[0]}>
                                                        {state[1]}
                                                    </option>
                                                ))}
                                                
                                            </Form.Select>
                                        </InputGroup>
                                    </Col>
                                    
                                </>}
                                {placeholders?
                                        <Col>
                                            <Placeholder as="div" animation="glow">
                                                <Placeholder xs={12} style={{ width: '100%' }}/>
                                            </Placeholder>
                                        </Col>
                                    :<>
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
                                    </>}
                            {/* <Col>
                                {placeholders?
                                    <Placeholder as="div" animation="glow">
                                        <Placeholder xs={12} style={{ width: '100%' }}/>
                                    </Placeholder>
                                :<>
                                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>Salary</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control type='number' name='salary' value={formData.salary} onChange={updateField} id="inlineFormInputGroup" placeholder="Salary" />
                                </InputGroup>
                                </>}
                            </Col>
                            <Col xs='auto'>
                                {placeholders?
                                    <Placeholder as="div" animation="glow">
                                        <Placeholder xs={12} style={{ width: '100%' }}/>
                                    </Placeholder>
                                :<>
                                    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                        Location
                                    </Form.Label>
                                    <InputGroup>
                                        <Form.Control type='text' name='job_city' value={formData.job_city} onChange={updateField} placeholder="* City" required/>
                                        <Form.Select required name='job_state' value={formData.job_state} onChange={updateField}>
                                            {states.map((state)=>(
                                                <option value={state[0]}>
                                                    {state[1]}
                                                </option>
                                            ))}
                                            
                                        </Form.Select>
                                    </InputGroup>
                                </>}
                            </Col>
                            <Col xs='auto'>
                                {placeholders?
                                        <Placeholder as="div" animation="glow">
                                            <Placeholder xs={12} style={{ width: '100%' }}/>
                                        </Placeholder>
                                    :<>
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
                                    </>}
                            </Col> */}
                        </Row>
                        
                        {'job_images' in formData && imgInfo?
                            <Row className='mb-3 justify-content-center'>
                                <Col xs={12} md={6} style={{margin:'auto'}}>
                                    {placeholders?
                                            <Placeholder as="p" animation="glow">
                                                <Placeholder xs={12} />
                                            </Placeholder>
                                        :<>
                                            <InputGroup>
                                                <InputGroup.Text size="lg">Images:</InputGroup.Text>
                                                <Form.Select id="edit_image_field" name='image' size="lg" value={selImg} onChange={updateSelImg}>
                                                    {formData.job_images.map((img)=>(
                                                        <option value={img.id}>
                                                            {img.job_img.split('/').pop()}
                                                        </option>
                                                    ))}
                                                    
                                                </Form.Select>
                                            </InputGroup>
                                            <br></br>
                                            {alertDel?
                                                <Alert variant='danger' onClose={toggleDelImgAlert} dismissible>
                                                    An Image has been remove...
                                                </Alert>
                                            :<></>}
                                            {alertImg?
                                                <Alert variant='warning' onClose={toggleEditImgAlert} dismissible>
                                                    An Image has been edited...
                                                </Alert>
                                            :<></>}
                                            {alertAddImg?
                                                <Alert variant='warning' onClose={toggleAddImgAlert} dismissible>
                                                    An Image has been added...
                                                </Alert>
                                            :<></>}
                                        </>}
                                </Col>
                                <Col xs={12} md={6} className="d-flex justify-content-center">
                                    {placeholders?
                                            <Placeholder as="p" animation="glow">
                                                <Placeholder xs={12} />
                                            </Placeholder>
                                        :<>
                                        <Figure>
                                            <Figure.Image
                                                width={250}
                                                height={350}
                                                alt="job-img"
                                                src={imgInfo.job_img_resized}
                                            />
                                            <Figure.Caption>
                                            <ButtonGroup aria-label="Image Updaters" className="d-flex justify-content-center">
                                                <Button variant="outline-warning" onClick={editSelImgModal}>Edit</Button>
                                                <Button variant="outline-danger" onClick={removeSelImgModal}>Remove</Button>
                                            </ButtonGroup>
                                            </Figure.Caption>
                                        </Figure>
                                    </>}
                                </Col>
                            </Row>
                        :<></>} 
                        <Row className='mb-3'>
                            <Col>
                                {placeholders?
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    :<>
                                        <InputGroup>
                                            <InputGroup.Text>Job Summary</InputGroup.Text>
                                            <Form.Control as="textarea" aria-label="job summary" name='job_summary' value={formData.job_summary} onChange={ updateField }/>
                                        </InputGroup>
                                    </>}
                            </Col>
                        </Row>
                        <Row >
                            <Col className="d-grid gap-2" style={{ textAlign: 'center'}}>
                                {placeholders?
                                    <Placeholder.Button xs={12} aria-hidden="true" />
                                :<>
                                    <Button variant='warning' type='submit'>
                                        Edit{formData.job_name.length > 0 && formData.company_name.length > 0?`: ${formData.job_name} @ ${formData.company_name}`:''}
                                    </Button>
                                </>}
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={addImgModal}>
                Add Images
            </Button>
            <Button variant="secondary" onClick={()=>{closing_modal()}}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>

        {/* Modifying Job Images Modals */}
        <JobTableEditImg show={editImg} handleClose={editSelImgModal} img_obj={imgInfo} refresh_jobs_details={refresh_job_details} toggle_alert={toggleEditImgAlert}></JobTableEditImg>
        <JobTableDelImage show={delImg} handleClose={removeSelImgModal} img_obj={imgInfo} refresh_jobs_details={refresh_job_details} toggle_alert={toggleDelImgAlert}></JobTableDelImage>
        <JobTableAddImage show={addImg} handleClose={addImgModal} img_obj={imgInfo} job_id={formData.id} refresh_jobs={refresh_job_details} toggle_alert={toggleAddImgAlert}> </JobTableAddImage>
        </>
    )
}

export default JobTableEditJob