import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'


export default function JobTable(){

    // Testing jobs table with default data 
    const [jobs, setJobs] = useState([
        { job_name: 'Software Engineer', company_name: 'Google', salary: '$120,000', status: 'Applied' },
        { job_name: 'Data Analyst', company_name: 'Facebook', salary: '$90,000', status: 'Interview' },
        { job_name: 'Frontend Developer', company_name: 'Amazon', salary: '$110,000', status: 'Rejected' },
        { job_name: 'Backend Developer', company_name: 'Netflix', salary: '$125,000', status: 'Offer' },
        { job_name: 'DevOps Engineer', company_name: 'Microsoft', salary: '$115,000', status: 'Applied' },
        { job_name: 'Project Manager', company_name: 'Apple', salary: '$130,000', status: 'Interview' },
        { job_name: 'QA Engineer', company_name: 'Uber', salary: '$100,000', status: 'Rejected' },
        { job_name: 'Mobile Developer', company_name: 'Airbnb', salary: '$105,000', status: 'Offer' },
        { job_name: 'Product Manager', company_name: 'Tesla', salary: '$140,000', status: 'Applied' },
        { job_name: 'System Architect', company_name: 'IBM', salary: '$150,000', status: 'Interview' },
        { job_name: 'UX Designer', company_name: 'Spotify', salary: '$95,000', status: 'Offer' },
        { job_name: 'Security Analyst', company_name: 'Twitter', salary: '$110,000', status: 'Rejected' },
        { job_name: 'Cloud Engineer', company_name: 'Oracle', salary: '$125,000', status: 'Applied' },
        { job_name: 'Game Developer', company_name: 'Sony', salary: '$110,000', status: 'Interview' },
        { job_name: 'AI Engineer', company_name: 'OpenAI', salary: '$150,000', status: 'Offer' },
        { job_name: 'Data Scientist', company_name: 'Google', salary: '$125,000', status: 'Interview' }, // New position
        { job_name: 'Product Analyst', company_name: 'Facebook', salary: '$95,000', status: 'Applied' }, // New position
        { job_name: 'Full Stack Developer', company_name: 'Amazon', salary: '$115,000', status: 'Offer' }, // New position
        { job_name: 'Software Development Manager', company_name: 'Netflix', salary: '$135,000', status: 'Interview' }, // New position
        { job_name: 'Cloud Architect', company_name: 'Microsoft', salary: '$130,000', status: 'Applied' }, // New position
        { job_name: 'Scrum Master', company_name: 'Apple', salary: '$140,000', status: 'Rejected' }, // New position
        { job_name: 'Automation Tester', company_name: 'Uber', salary: '$105,000', status: 'Offer' }, // New position
        { job_name: 'UI Developer', company_name: 'Airbnb', salary: '$100,000', status: 'Applied' }, // New position
        { job_name: 'Marketing Manager', company_name: 'Tesla', salary: '$150,000', status: 'Interview' }, // New position
        { job_name: 'Network Engineer', company_name: 'IBM', salary: '$120,000', status: 'Offer' }, // New position
        { job_name: 'Data Engineer', company_name: 'Spotify', salary: '$110,000', status: 'Applied' }, // New position
        { job_name: 'Incident Response Specialist', company_name: 'Twitter', salary: '$115,000', status: 'Rejected' }, // New position
        { job_name: 'DevSecOps Engineer', company_name: 'Oracle', salary: '$140,000', status: 'Interview' }, // New position
        { job_name: '2D Artist', company_name: 'Sony', salary: '$105,000', status: 'Offer' }, // New position
        { job_name: 'Machine Learning Engineer', company_name: 'OpenAI', salary: '$155,000', status: 'Applied' } // New position
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

    return(
        <>
        <div className='container' style={{ padding: '20px', marginTop: '20px', borderRadius: '6px', backgroundColor: 'white'}}>
            <InputGroup size="lg" style= {{ paddingBottom: '20px', width: '85%', margin: '0 auto'}} >
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            Job Name
                        </th>
                        <th>
                            Company Name
                        </th>
                        <th>
                            Salary
                        </th>
                        <th>
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { jobs.filter( filteredJob => filteredJob.job_name.toLowerCase().includes(job_name.toLowerCase()) 
                    &&  filteredJob.company_name.toLowerCase().includes(company_name.toLowerCase())).length > 0 ? (
                        jobs.filter( filteredJob => filteredJob.job_name.toLowerCase().includes(job_name.toLowerCase()) 
                            &&  filteredJob.company_name.toLowerCase().includes(company_name.toLowerCase())).map((job, index)=>(
                        <tr key={index}>
                            <td>{job.job_name}</td>
                            <td>{job.company_name}</td>
                            <td>{job.salary}</td>
                            <td>{job.status}</td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>Sorry, search not found...</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
        </>
    )
}