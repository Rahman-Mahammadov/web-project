import styles from "../Footer/styles.module.scss";

export const Footer = () => {
  return (
    <>
      <footer>
        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            <img src="/public/images/Logo.svg" alt="" />
          </div>
          <p>
            The biggest marketplace managed by Ideologist corp, which provides
            various kinds of daily needs and hobbies.
          </p>
        </div>

        <div className={styles.aboutSection}>
          <div className={styles.aboutLenny1}>
            <h2 className={styles.heading}>About Lenny</h2>
            <ul>
              <li>Information</li>
              <li>Store Lactor</li>
              <li>Bulk Purchases</li>
              <li>Alteration Services</li>
              <li>Gift Delivery Service</li>
            </ul>
          </div>

          <div className={styles.aboutLenny2}>
            <h2 className={styles.heading}>About Lenny</h2>
            <ul>
              <li>FAQ</li>
              <li>Return Policy</li>
              <li>Privacy Policy</li>
              <li>Accessibility</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <h2>Account</h2>

            <ul>
              <li>Mempership</li>
              <li>Adress</li>
              <li>Coupons</li>
            </ul>
          </div>

          <div className={styles.contactSection2}>
            <h2>Contact Us</h2>
            <ul>
              <li>Consumer Complaint Services</li>
              <li>(684) 555-0102 and curtis.weaver@example.com</li>
              <li>Customers Complaint Service</li>
              <li>Directorate Generate of the Republic of Indonesia</li>
              <li>(480) 555-0103</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
