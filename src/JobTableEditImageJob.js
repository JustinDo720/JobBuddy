import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './styles/modalStyle.css'

export  function JobTableEditImg (props){
    return(
        <>
            <Modal show={props.show} onHide={props.handleClose} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Editing Image</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}