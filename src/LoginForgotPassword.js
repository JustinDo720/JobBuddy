import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function ForgotPassword(props){
    return(
        <>
            <div
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal
                    show={props.show}
                    onHide={props.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Forgot Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label htmlFor="inputEmail">Email</Form.Label>
                        <Form.Control
                            type="email"
                            id="inputEmail"
                            aria-describedby="emailHelpBlock"
                        />
                        <Form.Text id="emailHelpBlock" muted>
                            A link will be sent if an account exists with that email.
                        </Form.Text>
                        <br/>
                        <div style={{textAlign:'center', padding:'15px'}}>
                            <Button variant='danger' style={{color:'white'}}>
                                Reset Password
                            </Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}