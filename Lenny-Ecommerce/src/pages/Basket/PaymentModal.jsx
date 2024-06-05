import Modal from "react-bootstrap/Modal";
import styles from "../Basket/basket.module.scss";
import "../Basket/basket.module.scss";
import { MyVerticallyCenteredModal as LoadingModal } from "./LoadingModal";
import React from "react";
import { instance, instance2 } from "../../api";
import { userData } from "../../components/Auth/auth";
import { useNavigate } from "react-router-dom";

export function MyVerticallyCenteredModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const userId = userData()?.userId;
  const navigate = useNavigate();
  

  const handlePayment = async (e) => {
    e.preventDefault();
    setModalShow(!modalShow);
    setTimeout(() => {
      setModalShow(modalShow);
    }, 4000);

    setTimeout(() => {
      navigate('/success')
    }, 4000);
    

    const {
      data: { data: products },
    } = await instance.get(
      `/user-carts?populate[user][populate]=*&populate[products][populate]=*&filters[user]=${userId}`
    );

    products.forEach((prod) => {
      const addToOrders = async () => {
        await instance2.post(
          "/user-orders",
          JSON.stringify({
            data: {
              user: userId,
              products: prod.attributes.products.data[0].id,
            },
          })
        );
      };

      const removeOrders = async () => {
        
        await instance2.delete(`user-carts/${prod.id}`);
      };

      addToOrders();
      removeOrders();
    });

   
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className={styles.centered}>
          <div className={styles.container}>
            <div id={styles.Checkout} className={styles.inline}>
              <h1>Pay Invoice</h1>
              <div className={styles.cardRow}>
                <span className={styles.visa}></span>
                <span className={styles.mastercard}></span>
                <span className={styles.amex}></span>
                <span className={styles.discover}></span>
              </div>
              <form>
                <div className={styles.formGroup}>
                  <label htmlFor={styles.PaymentAmount}>Payment amount</label>
                  <div className={styles.amountPlaceholder}>
                    <span>$</span>
                    <span>{props.totalprice}</span>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label or="NameOnCard">Name on card</label>
                  <input
                    id={styles.NameOnCard}
                    className="form-control"
                    type="text"
                    maxLength="255"
                  ></input>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="CreditCardNumber">Card number</label>
                  <input
                    id={styles.CreditCardNumber}
                    className="null card-image form-control"
                    type="text"
                  ></input>
                </div>
                <div className={styles.expiryDateGroup}>
                  <label htmlFor="ExpiryDate">Expiry date</label>
                  <input
                    id="ExpiryDate"
                    className="form-control"
                    type="text"
                    placeholder="MM / YY"
                    maxLength="7"
                  ></input>
                </div>
                <div className={styles.securityCodeGroup}>
                  <label htmlFor="SecurityCode">Security code</label>
                  <div className="input-container">
                    <input
                      id={styles.SecurityCode}
                      className="form-control"
                      type="text"
                    ></input>
                    <i id={styles.cvc} className="fa fa-question-circle"></i>
                  </div>
                  <div className={styles.cvcPreviewContainer}>
                    <div className={styles.amexCvcPreview}></div>
                    <div className={styles.visaMcDisCvcPreview}></div>
                  </div>
                </div>
                <div className={styles.zipCodeGroup}>
                  <label htmlFor="ZIPCode">ZIP/Postal code</label>
                  <div className={styles.inputContainer}>
                    <input
                      id={styles.ZIPCode}
                      className="form-control"
                      type="text"
                      maxLength="10"
                    ></input>
                    <a
                      tabIndex="0"
                      role="button"
                      data-toggle="popover"
                      data-trigger="focus"
                      data-placement="left"
                      data-content="Enter the ZIP/Postal code for your credit card billing address."
                    >
                      <i className="fa fa-question-circle"></i>
                    </a>
                  </div>
                </div>
                <button
                  onClick={handlePayment}
                  id={styles.PayButton}
                  className="btn btn-block btn-success submit-button"
                  type="submit"
                >
                  <span className="submit-button-lock"></span>
                  <span className={styles.alignMiddle}>
                    Pay ${props.totalprice}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <LoadingModal show={modalShow} />;
    </>
  );
}

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   //   return (
//   //     <>
//   //       <Button variant="primary" onClick={() => setModalShow(true)}>
//   //         Launch vertically centered modal
//   //       </Button>

//   //       <MyVerticallyCenteredModal
//   //         show={modalShow}
//   //         onHide={() => setModalShow(false)}
//   //       />
//   //     </>
//   //   );
// }
