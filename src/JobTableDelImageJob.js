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

export function JobTableDelImage (props){
    const [imgName, setImgName] = useState('')
    const [img, setImg] = useState('')
    const [img_api_url, setImgApiUrl] =  useState('')
    const [loading, setLoading] = useState(false)
    const access_token = useSelector(state=>state.activate.access_token)

    useEffect(()=>{
        if(props.show){
            setImgName(props.img_obj.job_img.split('/').pop())
            setImg(props.img_obj.job_img_resized)
            setImgApiUrl(props.img_obj.job_img_api_link)
        }
    }, [props.show])

    const closing_modal = (completed=false)=>{
        if(completed){
            props.refresh_job_details()
            props.toggle_alert()
        }
        props.handleClose()
        setLoading(false)
    }

    const rmv_img = ()=>{
        setLoading(true)
        axios.delete(img_api_url, {headers:{Authorization: `Bearer ${access_token}`}}).then((rep)=>{
            closing_modal(true)
        })
    }
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} size="lg" centered>
                <Modal.Header className='modal-modify-header' closeButton>
                <Modal.Title>Deleting Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='justify-content-center'>
                        <Col xs={12} md={12} className='d-flex justify-content-center'>
                            <Figure>
                                <Figure.Image
                                    width={400}
                                    height={400}
                                    alt="mod-img"
                                    src={img}
                                />
                                <Figure.Caption>
                                    Are you sure you want to delete <b>{imgName}</b>?
                                </Figure.Caption>
                            </Figure>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12} className='d-flex justify-content-center'>
                        {loading?
                        <Button variant="danger" disabled>
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            Removing...
                          </Button>
                        :<Button className='modal-modify-footer' variant="danger" onClick={rmv_img}>
                            Remove Image
                        </Button>}
                            
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