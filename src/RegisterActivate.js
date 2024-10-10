import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';


export default function RegActivate(props){
    // Trying using Redux for this, You just need to do activate, If activate then display a checkmark and close the modal or a banner

    return(
        <>
            <div
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal
                    show={props.show}
                    centered
                    size='lg'
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