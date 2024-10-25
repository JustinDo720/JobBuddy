import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles/modalStyle.css'
import { useSelector } from 'react-redux';
import axios from './api/axiosConfig'
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

export function JobTableEditImg (props){
    const [img_obj,setImgObj] = useState({})
    const [new_img, setNewImg] = useState('')
    const [loading, setLoading] = useState(false)
    const [askConf, setAskConf] = useState(false)
    const access_token = useSelector(state=>state.activate.access_token)

    useEffect(()=>{
        if(props.show){
            setImgObj(props.img_obj)
        }
    }, [props.show])

    const closing_modal = (completed=false)=>{
        if(completed){
            props.refresh_jobs()
            props.toggle_alert()
        }
        setAskConf(false)
        setNewImg('')
        props.handleClose()
        setLoading(false)
    }

    const add_new_img = (e)=>{
        // We need to get the files... 
        // e.target.value will just give you the path to the new img 
        setNewImg(e.target.files[0])
    }
    
    const conf_update_img = (e)=>{
        e.preventDefault()
        setAskConf(true)
        console.log(new_img, new_img.name,askConf)
       
    }

    const update_img = (e)=>{
        e.preventDefault()
        setLoading(true)

        // Making a new FormData because this is dealing with files 
        const img_fd = new FormData();
        // This is going to making our img_fd = {job:id, job_img:img_obj}
        img_fd.append('job', props.job_id)
        img_fd.append('job_img', new_img)
        img_fd.append('id', img_obj.id)

        axios.put(img_obj.job_img_api_link, img_fd, {headers:{Authorization: `Bearer ${access_token}`}}).then((rep)=>{
            closing_modal(true)
        })
    }
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Editing Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='justify-content-center'>
                        <Col xs={12} md={12} className='d-flex justify-content-center'>
                            <Figure>
                                <Figure.Image
                                    width={400}
                                    height={400}
                                    alt="mod-img"
                                    src={img_obj.job_img_resized}
                                />
                                <Figure.Caption style={{textAlign:'centered'}}>
                                    Current Image
                                </Figure.Caption>
                            </Figure>
                        </Col>
                    </Row>
                    <Row>
                        <Form onSubmit={(e)=>{conf_update_img(e)}}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Row className='mb-2'>
                                    <Form.Label>New Image</Form.Label>
                                    <Form.Control type="file" required onChange={add_new_img}/>
                                </Row>
                               <Row style={{width:'50%', margin:'auto'}}>
                                    {askConf?
                                        <>
                                            {loading?
                                                <Button variant="warning" disabled>
                                                    <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    />
                                                    Updating...
                                                </Button>
                                            :<Button variant='success' onClick={(e)=>update_img(e)}>Confirm Update</Button>}
                                        </>
                                    
                                    :<>  
                                        <Button type='submit' variant="warning">
                                            Update Image
                                        </Button>
                                    </>}
                                    
                               </Row>
                               
                            </Form.Group>
                        </Form>
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