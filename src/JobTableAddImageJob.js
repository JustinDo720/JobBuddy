import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './styles/modalStyle.css'
import { useState } from 'react';
import axios from './api/axiosConfig'
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';

export function JobTableAddImage (props){

   
    const [imgs, setImgs] = useState([])
    const [loading, setLoading] = useState(false)
    const access_token = useSelector(state=>state.activate.access_token)
    const baseURL = useSelector((state)=>state.api_url.backendApiUrl)

    const closing_modal = ()=>{
        setImgs([])
        props.refresh_jobs()
        props.handleClose()
        setLoading(false)
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

    const uploadImage = (img, job_id, final_img=false)=>{
        // Making a new FormData because this is dealing with files 
        const img_fd = new FormData();
        // This is going to making our img_fd = {job:id, job_img:img_obj}
        img_fd.append('job', job_id)
        img_fd.append('job_img', img)

        axios.post(`${baseURL}/jobs/images/`,img_fd, {headers:{Authorization:`Bearer ${access_token}`,'Content-Type': 'multipart/form-data'}}).then(()=>{
            if(final_img){
                closing_modal()
            }
        })
    }

    const addImg = (e)=>{
        e.preventDefault()
        setLoading(true)
        let counter = 0 
        imgs.forEach(img=>{
            counter += 1
            uploadImage(img, props.job_id, counter===imgs.length)
        })
    }
    

    return(
        <>                    
            <Modal show={props.show} onHide={props.handleClose} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Adding Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='mb-3'>
                        <Col>
                            <Form onSubmit={(e)=>{addImg(e)}}>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Images</Form.Label>
                                    <Form.Control type="file" size="sm" required aria-describedby="multi_image_help" multiple onChange={updateFile}/>
                                    <Form.Text id="multi_image_help" style={{fontSize:'0.75rem'}} muted>
                                        Optional: You may select multiple images at once by holding your "Ctrl" key and clicking on your desired file.
                                    </Form.Text>
                                </Form.Group>
                                <div className='d-flex justify-content-center'>
                                    {loading?
                                        <Button variant="info" disabled>
                                            <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            />
                                            Uploading Images...
                                        </Button>
                                    :<Button type='submit' variant='success'>
                                        Upload Image
                                    </Button>}
                                </div>    
                            </Form>          
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{closing_modal()}}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}