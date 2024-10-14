import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setActivation } from './redux/Activation/activation_action';
import { useNavigate } from 'react-router-dom';

export default function RegActivate(props){
    // Trying using Redux for this, You just need to do activate, If activate then display a checkmark and close the modal or a banner
    const isActivated = useSelector((state) => state.activate.acc_activated);
    const baseUrl = useSelector((state)=>state.api_url.backendApiUrl)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
       // If this modal is open, that means we're waiting for the confirmation 
       // We know it's confirmed IF localStorage has "acc_activated" key 
        if (props.show){
            let intervalId = null

            const checkAccountActivation = async () => {
                const accActivated = localStorage.getItem('acc_activated');
    
                if (accActivated === 'true') {
                    // if the accActivated then let's close the modal 
                    console.log('We are good')
                    clearInterval(intervalId);
                    // Now we login our users after the acc is activated 
                    const fd = {
                        email: props.email,
                        password: props.password
                    }
                    // Make this async so that when we navigate it will recognize your store 
                    const rep = await axios.post(`${baseUrl}/users/api/token/`, fd)
                    
                    dispatch(setActivation({
                        acc_activated: true,
                        access_token:rep.data.access,
                        refresh_token:rep.data.refresh,
                        username:rep.data.username,
                        user_id:rep.data.user_id,
                    }))
                    props.handleClose()
                    // Once we close the activate we're just going to redirect to home page 
                    navigate('/')
                } else {
                    console.log('We are running which is still good')
                }
            };
    
            // Check activation status on component mount
            checkAccountActivation();
    
            intervalId = setInterval(checkAccountActivation, 5000); // Check every 5 seconds
        }
    },[props.show])
    
    // Anther state that watches changes to our intial state
    

    return(
        <>
            <div
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal
                    show={props.show}
                    centered
                    size='lg'
                    backdrop="static"
                    onHide={props.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Activate Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>
                            Check Your Email
                        </h4>
                        <p>
                            An email has been sent to <b>{props.email}</b> with the activation link. Click on that link for us to verify your account.
                        </p>
                        <div style={{padding:'15px', textAlign:'center'}}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                    
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}