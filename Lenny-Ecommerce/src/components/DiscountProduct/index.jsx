import React from "react";
import styles from "../DiscountProduct/styles.module.scss";
import { motion } from "framer-motion";
import { ButtonPrimary } from "../Button/ButtonPrimary.jsx";
import { ButtonSecondary } from "../Button/ButtonSecondary.jsx";
import { useNavigate } from "react-router-dom";

export const DiscountProduct = () => {
  const navigate = useNavigate();

  const handleProductClick = (e) => {
      navigate("/products/10");
      e.preventDefault();
      window.scrollTo(0, 0);
  };
  return (
    <>
      <div className={styles.container}>
        <motion.div initial={{x:"-100%"}} whileInView={{x:"0vw"}} transition={{delay:0.1, duration:1.7}} className={styles.firstPhoto}>
          <img
            src="src\assets\images\tech-device-with-nature-background.jpg"
            alt=""
            className={styles.img}
          />
        </motion.div>

        <motion.div initial={{x:"-100%"}} whileInView={{x:"0vw"}} transition={{delay:0.1, duration:1.7}}  className={styles.description}>
          <div className={styles.descriptionContainer}>
            <h2 className={styles.heading}>Ipad Air Gen 5</h2>
            <p className={styles.descriptionText}>
              Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in
              sapien quam risus sed diam.
            </p>

            <div className={styles.buttons} onClick={handleProductClick}>
              <ButtonPrimary text={"Buy $900"} sinif={styles.btn} />
              <ButtonSecondary text={"View Detail"} sinif={styles.btn} />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
