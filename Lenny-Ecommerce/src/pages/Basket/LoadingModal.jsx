import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import styles from '../Basket/basket.module.scss'

export function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body className={styles.centered} >
        <Spinner  animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Processing...</p>
      </Modal.Body>
      <Modal.Footer>
        
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
}


