import React from "react";
import styles from "../Article/styles.module.scss";
import { motion } from "framer-motion";

export const Article = ({ src, date, length, heading, descriptionText }) => {
  return (
    <>
      <motion.div whileHover={{boxShadow:"0 2px 10px 1px rgba(0, 0, 0, 0.05)", borderRadius:"8px", scale:1.02}} className={styles.cardsContainer}>
        <div className={styles.singleCard}>
          <div className={styles.imgSection}>
            <img src={src} />
          </div>
          <div className={styles.description}>
            <div className={styles.date}>
              <p className={styles.articleDate}>{date}</p>
              <p className={styles.articleLength}>{length}</p>
            </div>
            <h2 className={styles.heading}>{heading}</h2>

            <div className={styles.descriptionText}>
              <p>{descriptionText}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
