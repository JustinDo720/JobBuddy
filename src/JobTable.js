import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowUpRightFromSquare, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import JobTableDetails from './JobTableDetails';
import JobTableAddJob from './JobTableAddJob'
import JobTableEditJob from './JobTableEditJob';
import JobTableDeleteJob from './JobTableDeleteJob';
import axios from './api/axiosConfig'
import { useSelector } from 'react-redux'
import Toast from 'react-bootstrap/Toast'; 
import { formatSalary } from './utils/formatSalary';
import Spinner from 'react-bootstrap/Spinner';


export default function JobTable(){

    const [jobs, setJobs] = useState([])
    const backendApiUrl = useSelector((state)=>state.api_url.backendApiUrl)
    const {user_id, access_token, acc_activated} = useSelector((state)=>state.activate)
    const [loading, setLoading] = useState(false)
    const [toast, showToast] = useState(false)
    const [etoast, showToastE] = useState(false)
    const [dtoast, showToastD] = useState(false)

    const fetchJobs = async()=>{
        if(acc_activated){
            setLoading(true)
            const rep = await axios.get(`${backendApiUrl}/users/details/${user_id}/jobs/`,{headers:{Authorization:`Bearer ${access_token}`}})
            setJobs(rep.data.user_jobs)   // this is an array of objects
            setLoading(false)
        }
    }


    useEffect(()=>{
        fetchJobs()
    },[])
    

    // Search filters
    const [job_name, searchJobName] = useState('')
    const [company_name, searchCompanyName] = useState('')
    

    const searchJob = (e) =>{
        searchJobName(e.target.value)
    }

    const searchCompany = (e) =>{
        searchCompanyName(e.target.value)
    }

    const clearFields = (e) => {
        searchJobName('')
        searchCompanyName('')
    }

    // Details Modal Control
    const [show, setShow] = useState(false);
    const [chosen_job, setChosenJob] = useState({})

    const handleShow = (job_info) => {
        setChosenJob(job_info)
        setShow(true)
    };
    const handleClose = (e) => {
        if(e) e.preventDefault()
        setShow(false)
        window.history.pushState({}, document.title, '/')
    };

    // Edit Control
    const [isEditMode, setIsEditMode] = useState(false);

    // Handle toggle change
    const handleSwitchChange = () => setIsEditMode(!isEditMode);

    // Editing Modal
    const [showEditing, setShowEditing] = useState(false)
    const [chosenEditingJob, setChosenEditingJob] = useState({})

    const changeShowEditing = (job_object)=>{
        setChosenEditingJob(job_object)
        setShowEditing(!showEditing)
    }
    const closeShowEditing = ()=>setShowEditing(false)

    // Removing Modal
    const [showDeleting, setShowDeleting] = useState(false)
    const [chosenDeletingJob, setChosenDeletingJob] = useState({})

    const showDeletingModal = (job_object)=>{
        setChosenDeletingJob(job_object)
        setShowDeleting(!showDeleting)
    }

    const closeShowDeleting = () => setShowDeleting(false)

    // Status Filter
    const [showStat, setShowStat] = useState(false);
    const target = useRef(null);

    const [checkedFilter, setCheckedFilter] =  useState({
        applied:'',
        interview: '',
        rejected: '',
        offer: '',
    })
    
    // We cannot use checkedFilter because it's not an array we could loop over with .map() function and so fourth 
    const checkedFilterArray = Object.keys(checkedFilter).filter(key=>checkedFilter[key]) // Checking if the Key has a value. Which allows us to filter based on this array

    // Toast
    const toggleToast = ()=>{
        showToast(true)
    }
    const toggleToastEdit = ()=>{
        showToastE(true)
    }
    const toggleToastDel = ()=>{
      showToastD(true)  
    }


    const checkedStatus = (e) => {
        const {name, value, checked} = e.target

        // User checks a box
        if (checked){
            setCheckedFilter({
                ...checkedFilter,
                [name]: value
            })
        } else {
            // User unchecks a box (not checked)
            setCheckedFilter({
                ...checkedFilter,
                [name]: ''
            })
        }
    
    }

    // Add Job Modal Control
    const [showAddJob, setShowAddJob] = useState(false);

    const showAddJobModal = () => {
        setShowAddJob(!showAddJob)
    }
    const closeAddJobModal = () => {
        setShowAddJob(false)
    };

    return(
        <>
        <div className='container' style={{ padding: '20px', marginTop: '20px', borderRadius: '6px', backgroundColor: 'white'}}>
            {/* Search Functionality */}
            <InputGroup size="lg" style= {{ width: '85%', margin: '0 auto'}} >
                <InputGroup.Text id="inputGroup-sizing-lg" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }} >
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> 
                </InputGroup.Text>
                <Form.Control
                aria-label="Job Name"
                aria-describedby="inputGroup-sizing-sm"
                style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
                placeholder='Search Job Name...'
                onChange= { searchJob }
                value= { job_name }
                />
                <Form.Control
                aria-label="Company Name"
                aria-describedby="inputGroup-sizing-sm"
                style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
                placeholder='Search Company Name...'
                onChange= { searchCompany }
                value= { company_name }
                />
                <Button variant="outline-danger" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }} onClick={ clearFields }>
                    Clear
                </Button>
            </InputGroup>
            {/* Controls */}
            <Container style={{padding: '20px'}}>
                <Row className='justify-content-md-center'>
                    <Col xs lg='3' style={{textAlign: 'center'}}>
                        {/* Bootstrap Switch */}
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Edit Mode"
                            checked={isEditMode}
                            onChange={handleSwitchChange}
                            style={{ fontSize: '20px', marginRight: '20px'}}
                        />
                    </Col>
                    <Col xs lg='3' style={{textAlign: 'center'}} className="d-grid gap-2">
                        {/* Adding Job*/}
                        <Button variant='outline-success' onClick={showAddJobModal}>
                            <FontAwesomeIcon icon={faPlus} /> Add Job 
                        </Button>
                    </Col>                  
                </Row>
            </Container>

            {/* Job Display Table */}
            <div className='table-responsive'>
            <Table striped bordered hover>
                <thead>
                    <tr style={{textAlign : 'center'}}>
                        <th>
                            Job Name
                        </th>
                        <th>
                            Company Name
                        </th>
                        <th>
                            Salary
                        </th>
                        <th style={{ verticalAlignment: 'middle'}}>
                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <span style={{ marginTop:'12px'}}>
                                    Status
                                </span>
                                
                                <Button 
                                    variant="secondary" 
                                    style={{ marginLeft: '10px', verticalAlign: 'middle', padding:'2px', marginTop:'10px' }} 
                                    size='sm' 
                                    ref={target} 
                                    onClick={() => setShowStat(!showStat)}
                                >
                                    Filter
                                </Button>
                            </div>
                            <Overlay target={target.current} show={showStat} placement="bottom">
                            {(props) => (
                                <Tooltip id="filter-checkbox" {...props}>
                                    <Form>
                                        <Form.Check
                                            inline
                                            label="Applied"
                                            name="applied"
                                            value='applied'
                                            onChange={checkedStatus}
                                            type='checkbox'
                                            id='inline-1'
                                            checked={checkedFilter.applied === 'applied'}
                                        />
                                        <Form.Check
                                            inline
                                            label="Interview"
                                            name="interview"
                                            value='interview'
                                            onChange={checkedStatus}
                                            type='checkbox'
                                            id='inline-2'
                                            checked={checkedFilter.interview === 'interview'}
                                        />
                                        <Form.Check
                                            inline
                                            label="Rejected"
                                            name='rejected'
                                            value='rejected'
                                            onChange={checkedStatus}
                                            type='checkbox'
                                            id='inline-3'
                                            checked={checkedFilter.rejected === 'rejected'}
                                        />
                                        <Form.Check
                                            inline
                                            label="Offer"
                                            name='offer'
                                            value='offer'
                                            onChange={checkedStatus}
                                            type='checkbox'
                                            id='inline-4'
                                            checked={checkedFilter.offer === 'offer'}
                                        />
                                    </Form>
                                </Tooltip>
                            )}
                            </Overlay>

                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { jobs.filter( filteredJob => filteredJob.job_name.toLowerCase().includes(job_name.toLowerCase()) 
                    &&  filteredJob.company_name.toLowerCase().includes(company_name.toLowerCase())).length > 0 ? (
                        jobs.filter( filteredJob => filteredJob.job_name.toLowerCase().includes(job_name.toLowerCase()) 
                            &&  filteredJob.company_name.toLowerCase().includes(company_name.toLowerCase())).filter(job=>
                                checkedFilterArray.length > 0 ? 
                                checkedFilterArray.some(stat => job.status.toLowerCase() === stat.toLowerCase())
                                : true // We set true to include all jobs if the array is unchecked 
                            ).map((job, index)=>(
                        <tr key={index}>
                            <td>
                            <a href= { `#${job.job_name.replace(/\s+/g, '-').toLowerCase()}/#${job.company_name.replace(/\s+/g, '-').toLowerCase()}` } 
                            onClick={() => handleShow(job)}>
                                {job.job_name}
                            </a>
                            </td>
                            <td>{job.company_name}</td>
                            <td>{(job.salary > 0)?formatSalary(job.salary): 'N/A'}</td>
                            <td>{job.status}</td>
                            <td style={{ textAlign: 'center'}}>
                                {job.link?
                                <a href={job.link} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                                    <Button size="sm" variant="outline-primary">
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> 
                                    </Button>
                                </a>:<></>}
                                {isEditMode? (
                                    <>
                                        {/* If we have multiple elements we need to palce them inside a single parent element*/}
                                        <Button size="sm" variant="outline-warning" onClick={()=>changeShowEditing(job)} style={{marginLeft: '10px'}}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button size="sm" variant="outline-danger" onClick={()=>showDeletingModal(job)} style={{marginLeft: '10px'}}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </>
                                ) : <></>}
                            </td>
                        </tr>
                    ))) :<>
                        {loading
                        ?<tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                /> Loading...
                            </td>
                        </tr>                        
                        :<tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>Sorry, no items were found...</td>
                        </tr>}
                    
                    </>}
                </tbody>
            </Table>
            </div>

            {/* Job Details Modal */}
            <JobTableDetails show={ show } handleClose={ handleClose } job_details={ chosen_job }></JobTableDetails>
            {/* Add Job Modal */}
            <JobTableAddJob show={ showAddJob} handleClose= { closeAddJobModal } refreshJobs={fetchJobs} toasting={ toggleToast }></JobTableAddJob>
            {/* Edit Job Modal */}
            <JobTableEditJob show={ showEditing } handleClose= { closeShowEditing } job_object={ chosenEditingJob } refreshJobs={fetchJobs} toasting={ toggleToastEdit }></JobTableEditJob>
            {/* Delete Job Modal */}
            <JobTableDeleteJob show= { showDeleting } handleClose={closeShowDeleting} job_object={ chosenDeletingJob } refreshJobs={fetchJobs} toasting={ toggleToastDel }></JobTableDeleteJob>

            {/* Toast */}
            <Toast bg='success' 
                className="d-inline-block m-1" 
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}
                onClose={() => showToast(false)} 
                show={toast}
                autohide
                >
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Job Added</strong>
                </Toast.Header>
                <Toast.Body>
                    A Job has been successfully added to your list.
                </Toast.Body>
            </Toast>
            <Toast bg='warning' 
                className="d-inline-block m-1" 
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}
                onClose={() => showToastE(false)} 
                show={etoast}
                autohide
                >
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Job Edited</strong>
                </Toast.Header>
                <Toast.Body>
                    A Job has been successfully edited.
                </Toast.Body>
            </Toast>
            <Toast bg='danger' 
                className="d-inline-block m-1" 
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}
                onClose={() => showToastD(false)} 
                show={dtoast}
                autohide
                >
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Job Removed</strong>
                </Toast.Header>
                <Toast.Body>
                    A Job has been successfully deleted.
                </Toast.Body>
            </Toast>
        </div>
        </>
    )
}