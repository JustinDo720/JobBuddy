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
import { faMagnifyingGlass, faArrowUpRightFromSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import JobTableDetails from './JobTableDetails';
import JobTableAddJob from './JobTableAddJob'


export default function JobTable(){

    const [jobs, setJobs] = useState([
        { 
            job_name: 'Software Engineer', 
            company_name: 'Google', 
            salary: '', 
            status: 'Applied', 
            link: 'https://google.com/careers/software-engineer', 
            location: 'Mountain View, CA', 
            job_summary: 'Develop and maintain software applications.' 
        },
        { 
            job_name: 'Data Analyst', 
            company_name: 'Facebook', 
            salary: '$90,000', 
            status: 'Interview', 
            link: 'https://facebook.com/careers/data-analyst', 
            location: 'Menlo Park, CA', 
            job_summary: '' 
        },
        { 
            job_name: 'Frontend Developer', 
            company_name: 'Amazon', 
            salary: '$110,000', 
            status: 'Rejected', 
            link: 'https://amazon.com/careers/frontend-developer', 
            location: 'Seattle, WA', 
            job_summary: 'Build user interfaces for web applications.' 
        },
        { 
            job_name: 'Backend Developer', 
            company_name: 'Netflix', 
            salary: '$125,000', 
            status: 'Offer', 
            link: 'https://netflix.com/careers/backend-developer', 
            location: '', 
            job_summary: 'Develop server-side logic and databases.' 
        },
        { 
            job_name: 'DevOps Engineer', 
            company_name: 'Microsoft', 
            salary: '$115,000', 
            status: 'Applied', 
            link: 'https://microsoft.com/careers/devops-engineer', 
            location: 'Redmond, WA', 
            job_summary: 'Manage and improve deployment pipelines.' 
        },
        { 
            job_name: 'Project Manager', 
            company_name: 'Apple', 
            salary: '$130,000', 
            status: 'Interview', 
            link: 'https://apple.com/careers/project-manager', 
            location: 'Cupertino, CA', 
            job_summary: '' 
        },
        { 
            job_name: 'QA Engineer', 
            company_name: 'Uber', 
            salary: '$100,000', 
            status: 'Rejected', 
            link: 'https://uber.com/careers/qa-engineer', 
            location: 'San Francisco, CA', 
            job_summary: 'Ensure the quality of software through testing.' 
        },
        { 
            job_name: 'Mobile Developer', 
            company_name: 'Airbnb', 
            salary: '$105,000', 
            status: 'Offer', 
            link: 'https://airbnb.com/careers/mobile-developer', 
            location: 'San Francisco, CA', 
            job_summary: 'Develop mobile applications for iOS and Android.' 
        },
        { 
            job_name: 'Product Manager', 
            company_name: 'Tesla', 
            salary: '$140,000', 
            status: 'Applied', 
            link: 'https://tesla.com/careers/product-manager', 
            location: 'Palo Alto, CA', 
            job_summary: 'Define product vision and strategy.' 
        },
        { 
            job_name: 'System Architect', 
            company_name: 'IBM', 
            salary: '$150,000', 
            status: 'Interview', 
            link: 'https://ibm.com/careers/system-architect', 
            location: '', 
            job_summary: 'Design complex IT systems for business solutions.' 
        },
        { 
            job_name: 'UX Designer', 
            company_name: 'Spotify', 
            salary: '$95,000', 
            status: 'Offer', 
            link: 'https://spotify.com/careers/ux-designer', 
            location: 'New York, NY', 
            job_summary: 'Create engaging and user-friendly designs.' 
        },
        { 
            job_name: 'Security Analyst', 
            company_name: 'Twitter', 
            salary: '$110,000', 
            status: 'Rejected', 
            link: 'https://twitter.com/careers/security-analyst', 
            location: 'San Francisco, CA', 
            job_summary: 'Protect systems and data from security threats.' 
        },
        { 
            job_name: 'Cloud Engineer', 
            company_name: 'Oracle', 
            salary: '', 
            status: 'Applied', 
            link: 'https://oracle.com/careers/cloud-engineer', 
            location: 'Austin, TX', 
            job_summary: '' 
        },
        { 
            job_name: 'Game Developer', 
            company_name: 'Sony', 
            salary: '$110,000', 
            status: 'Interview', 
            link: 'https://sony.com/careers/game-developer', 
            location: 'San Mateo, CA', 
            job_summary: 'Design and develop video games.' 
        },
        { 
            job_name: 'AI Engineer', 
            company_name: 'OpenAI', 
            salary: '$150,000', 
            status: 'Offer', 
            link: 'https://openai.com/careers/ai-engineer', 
            location: 'San Francisco, CA', 
            job_summary: 'Create AI models and solutions.' 
        },
        { 
            job_name: 'Data Scientist', 
            company_name: 'Google', 
            salary: '$125,000', 
            status: 'Interview', 
            link: 'https://google.com/careers/data-scientist', 
            location: 'Mountain View, CA', 
            job_summary: 'Extract insights from data using statistical methods.' 
        },
        { 
            job_name: 'Product Analyst', 
            company_name: 'Facebook', 
            salary: '$95,000', 
            status: 'Applied', 
            link: 'https://facebook.com/careers/product-analyst', 
            location: 'Menlo Park, CA', 
            job_summary: 'Analyze product performance and market trends.' 
        },
        { 
            job_name: 'Full Stack Developer', 
            company_name: 'Amazon', 
            salary: '$115,000', 
            status: 'Offer', 
            link: 'https://amazon.com/careers/full-stack-developer', 
            location: 'Seattle, WA', 
            job_summary: 'Develop both client-side and server-side applications.' 
        },
        { 
            job_name: 'Software Development Manager', 
            company_name: 'Netflix', 
            salary: '$135,000', 
            status: 'Interview', 
            link: 'https://netflix.com/careers/software-development-manager', 
            location: 'Los Gatos, CA', 
            job_summary: 'Manage software development teams and projects.' 
        },
        { 
            job_name: 'Cloud Architect', 
            company_name: 'Microsoft', 
            salary: '$130,000', 
            status: 'Applied', 
            link: 'https://microsoft.com/careers/cloud-architect', 
            location: 'Redmond, WA', 
            job_summary: 'Design cloud-based solutions and architectures.' 
        },
        { 
            job_name: 'Scrum Master', 
            company_name: 'Apple', 
            salary: '$140,000', 
            status: 'Rejected', 
            link: 'https://apple.com/careers/scrum-master', 
            location: 'Cupertino, CA', 
            job_summary: 'Facilitate Scrum processes and practices.' 
        },
        { 
            job_name: 'Automation Tester', 
            company_name: 'Uber', 
            salary: '$105,000', 
            status: 'Offer', 
            link: 'https://uber.com/careers/automation-tester', 
            location: 'San Francisco, CA', 
            job_summary: 'Automate testing for software applications.' 
        },
        { 
            job_name: 'UI Developer', 
            company_name: 'Airbnb', 
            salary: '$100,000', 
            status: 'Applied', 
            link: 'https://airbnb.com/careers/ui-developer', 
            location: 'San Francisco, CA', 
            job_summary: 'Develop user interfaces for web and mobile applications.' 
        },
        { 
            job_name: 'Marketing Manager', 
            company_name: 'Tesla', 
            salary: '$150,000', 
            status: 'Interview', 
            link: '', 
            location: 'Palo Alto, CA', 
            job_summary: 'Manage marketing campaigns and strategies.' 
        },
        { 
            job_name: 'Network Engineer', 
            company_name: 'IBM', 
            salary: '$120,000', 
            status: 'Offer', 
            link: 'https://ibm.com/careers/network-engineer', 
            location: 'Armonk, NY', 
            job_summary: 'Design and implement network solutions.' 
        },
        { 
            job_name: 'Data Engineer', 
            company_name: 'Spotify', 
            salary: '$110,000', 
            status: 'Applied', 
            link: 'https://spotify.com/careers/data-engineer', 
            location: 'New York, NY', 
            job_summary: 'Build data pipelines and architecture.' 
        },
        { 
            job_name: 'Incident Response Specialist', 
            company_name: 'Twitter', 
            salary: '$115,000', 
            status: 'Rejected', 
            link: '', 
            location: 'San Francisco, CA', 
            job_summary: 'Respond to security incidents and mitigate risks.' 
        },
        { 
            job_name: 'DevSecOps Engineer', 
            company_name: 'Oracle', 
            salary: '$140,000', 
            status: 'Interview', 
            link: 'https://oracle.com/careers/devsecops-engineer', 
            location: 'Austin, TX', 
            job_summary: 'Integrate security practices into DevOps processes.' 
        },
        { 
            job_name: '2D Artist', 
            company_name: 'Sony', 
            salary: '$105,000', 
            status: 'Offer', 
            link: 'https://sony.com/careers/2d-artist', 
            location: 'San Mateo, CA', 
            job_summary: 'Create 2D graphics and artwork for games.' 
        },
        { 
            job_name: 'Machine Learning Engineer', 
            company_name: 'OpenAI', 
            salary: '$155,000', 
            status: 'Applied', 
            link: 'https://openai.com/careers/machine-learning-engineer', 
            location: 'San Francisco, CA', 
            job_summary: 'Develop and implement machine learning algorithms.' 
        }
    ]);
    

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

    // Status Filter
    const [showStat, setShowStat] = useState(false);
    const target = useRef(null);

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
                                            name="group1"
                                            type='checkbox'
                                            id='inline-1'
                                        />
                                        <Form.Check
                                            inline
                                            label="Interview"
                                            name="group1"
                                            type='checkbox'
                                            id='inline-2'
                                        />
                                        <Form.Check
                                            inline
                                            label="Rejected"
                                            type='checkbox'
                                            id='inline-3'
                                        />
                                        <Form.Check
                                            inline
                                            label="Offered"
                                            type='checkbox'
                                            id='inline-4'
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
                            &&  filteredJob.company_name.toLowerCase().includes(company_name.toLowerCase())).map((job, index)=>(
                        <tr key={index}>
                            <td>
                            <a href= { `#${job.job_name.replace(/\s+/g, '-').toLowerCase()}/#${job.company_name.replace(/\s+/g, '-').toLowerCase()}` } 
                            onClick={() => handleShow(job)}>
                                {job.job_name}
                            </a>
                            </td>
                            <td>{job.company_name}</td>
                            <td>{job.salary}</td>
                            <td>{job.status}</td>
                            <td style={{ textAlign: 'center'}}>
                                {job.link?
                                <a href={job.link} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                                    <Button size="sm" variant="outline-primary">
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> 
                                    </Button>
                                </a>:<></>}
                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>Sorry, search not found...</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </div>

            {/* Job Details Modal */}
            <JobTableDetails show={ show } handleClose={ handleClose } job_details={ chosen_job }></JobTableDetails>
            {/* Add Job Modal */}
            <JobTableAddJob show={ showAddJob} handleClose= { closeAddJobModal }></JobTableAddJob>
        </div>
        </>
    )
}