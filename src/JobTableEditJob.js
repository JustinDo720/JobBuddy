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


function JobTableEditJob(props){

    const [states, setStates] = useState([])
    const [status, setStatus] = useState([])
    const baseURL = useSelector((state)=>state.api_url.backendApiUrl)
    const {user_id, access_token} = useSelector((state)=>state.activate)
    
    // const states = [
    //     { abbr: "AL", name: "Alabama" },
    //     { abbr: "AK", name: "Alaska" },
    //     { abbr: "AZ", name: "Arizona" },
    //     { abbr: "AR", name: "Arkansas" },
    //     { abbr: "CA", name: "California" },
    //     { abbr: "CO", name: "Colorado" },
    //     { abbr: "CT", name: "Connecticut" },
    //     { abbr: "DE", name: "Delaware" },
    //     { abbr: "FL", name: "Florida" },
    //     { abbr: "GA", name: "Georgia" },
    //     { abbr: "HI", name: "Hawaii" },
    //     { abbr: "ID", name: "Idaho" },
    //     { abbr: "IL", name: "Illinois" },
    //     { abbr: "IN", name: "Indiana" },
    //     { abbr: "IA", name: "Iowa" },
    //     { abbr: "KS", name: "Kansas" },
    //     { abbr: "KY", name: "Kentucky" },
    //     { abbr: "LA", name: "Louisiana" },
    //     { abbr: "ME", name: "Maine" },
    //     { abbr: "MD", name: "Maryland" },
    //     { abbr: "MA", name: "Massachusetts" },
    //     { abbr: "MI", name: "Michigan" },
    //     { abbr: "MN", name: "Minnesota" },
    //     { abbr: "MS", name: "Mississippi" },
    //     { abbr: "MO", name: "Missouri" },
    //     { abbr: "MT", name: "Montana" },
    //     { abbr: "NE", name: "Nebraska" },
    //     { abbr: "NV", name: "Nevada" },
    //     { abbr: "NH", name: "New Hampshire" },
    //     { abbr: "NJ", name: "New Jersey" },
    //     { abbr: "NM", name: "New Mexico" },
    //     { abbr: "NY", name: "New York" },
    //     { abbr: "NC", name: "North Carolina" },
    //     { abbr: "ND", name: "North Dakota" },
    //     { abbr: "OH", name: "Ohio" },
    //     { abbr: "OK", name: "Oklahoma" },
    //     { abbr: "OR", name: "Oregon" },
    //     { abbr: "PA", name: "Pennsylvania" },
    //     { abbr: "RI", name: "Rhode Island" },
    //     { abbr: "SC", name: "South Carolina" },
    //     { abbr: "SD", name: "South Dakota" },
    //     { abbr: "TN", name: "Tennessee" },
    //     { abbr: "TX", name: "Texas" },
    //     { abbr: "UT", name: "Utah" },
    //     { abbr: "VT", name: "Vermont" },
    //     { abbr: "VA", name: "Virginia" },
    //     { abbr: "WA", name: "Washington" },
    //     { abbr: "WV", name: "West Virginia" },
    //     { abbr: "WI", name: "Wisconsin" },
    //     { abbr: "WY", name: "Wyoming" },
    //   ];

    // const status = [
    //     'Applied',
    //     'Interview',
    //     'Offer',
    //     'Rejected'
    // ]

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

    // Updating formData state whenever our job_object prop is updated
    useEffect(()=>{
        axios.get(`${baseURL}/choices/`).then((rep)=>{
            console.log(rep.data)
            setStatus(rep.data.status_choices)
            setStates(rep.data.state_choices.slice(1))

            // Find all the keys within formData 
            let form_keys = Object.keys(formData)
            // For each key we're going to use the spread operator and continuously update more key:value pairs
            form_keys.forEach(key=>{
                setFormData(prevState=>({
                    ...prevState,
                    // Making sure salary is an integer before submission 
                    [key]: key === 'salary'?
                        Number(props.job_object[key] || 0)
                        : props.job_object[key] || ''
                }))

            // Handling  City (job_city), State (job_state)
            if(props.job_object['location']){
                let location = props.job_object['location'].split(',')
                setFormData(prevState=>({
                    ...prevState,
                    job_city: location[0],
                    job_state: location[1].replace(/\s/g,'')    // Whitespace
                }))
            }
        })
    })
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

    const submitForm = (e) => {
        e.preventDefault()
        
        console.log(formData)
        axios.put(`${baseURL}/jobs/edit/${formData.id}/`, formData, {headers:{Authorization: `Bearer ${access_token}`}}).then(()=>{
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
               backdrop="static"
               aria-labelledby="contained-modal-title-vcenter"
               centered
               >
            <Modal.Header>
                <Modal.Title style={{fontSize: '30px'}}>
                    Editing {formData.job_name} @ {formData.company_name}
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
                                        <Form.Control type="url" name='job_link' value={formData.job_link} onChange={updateField} placeholder="#" />
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
                        <Row >
                            <Col className="d-grid gap-2" style={{ textAlign: 'center'}}>
                                <Button variant='warning' type='submit'>
                                    Edit{formData.job_name.length > 0 && formData.company_name.length > 0?`: ${formData.job_name} @ ${formData.company_name}`:''}
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

export default JobTableEditJob