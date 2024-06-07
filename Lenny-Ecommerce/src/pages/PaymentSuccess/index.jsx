import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../components";
import styles from "../PaymentSuccess/payment.module.scss";
import React from "react";

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src="/assets/images/success.jpg" alt="" />
        </div>
        <h2 className={styles.heading}>Your payment is successful</h2>
        <p className={styles.paymentInfo}>
          Your payment will be proceeded in 30 mins. If you have any problem,
          please contact the customer service. Detail information will be
          include below.
        </p>

        <div
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          <ButtonPrimary text={"Back to home"} sinif={styles.homeBtn} />
        </div>
      </div>
    </>
  );
};
