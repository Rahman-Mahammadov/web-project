import styles from "../FeaturedCategories/styles.module.scss";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const FeaturedCategories = () => {
  const navigate = useNavigate();
  return (
    <>
      <motion.div className={styles.container}>
        <h1 className={styles.heading}>Feature Categories</h1>

        <div className={styles.categories}>
          <motion.div whileHover={{rotateY:360}} transition={{duration:0.5}} onClick={() => {
            navigate('/productslist/Electronics')
          }} className={styles.catContainer}>
            <div className={styles.singleCategory}>
              <div className={styles.catImg}>
                <img src="/assets/images/catElectronics1.png" alt="" />
              </div>
              <h2 className={styles.categoryName}>Electronics</h2>
              <p className={styles.amountProducts}>8.9k products</p>
            </div>
          </motion.div>
          <motion.div  whileHover={{rotateY:360}} transition={{duration:0.5}}  onClick={() => {
            navigate('/productslist/Fashion')
          }} className={styles.catContainer}>
            <div className={styles.singleCategory}>
              <div className={styles.catImg}>
                <img src="/assets/images/catFashion.png" alt="" />
              </div>
              <h2 className={styles.categoryName}>Fashion</h2>
              <p className={styles.amountProducts}>8.2k products</p>
            </div>
          </motion.div>
          <motion.div  whileHover={{rotateY:360}} transition={{duration:0.5}}  onClick={() => {
            navigate('/productslist/Action')
          }} className={styles.catContainer}>
            <div className={styles.singleCategory}>
              <div className={styles.catImg}>
                <img src="/assets/images/cataction.png" alt="" />
              </div>
              <h2 className={styles.categoryName}>Action</h2>
              <p className={styles.amountProducts}>1.9k products</p>
            </div>
          </motion.div>
          <motion.div  whileHover={{rotateY:360}} transition={{duration:0.5}} onClick={() => {
            navigate('/productslist/Electronics')
          }} className={styles.catContainer}>
            <div className={styles.singleCategory}>
              <div className={styles.catImg}>
                <img src="/assets/images/catElectronics2.png" alt="" />
              </div>
              <h2 className={styles.categoryName}>Electronics</h2>
              <p className={styles.amountProducts}>3.1k products</p>
            </div>
          </motion.div>
          <motion.div  whileHover={{rotateY:360}} transition={{duration:0.5}} onClick={() => {
            navigate('/productslist/Books')
          }} className={styles.catContainer}>
            <div className={styles.singleCategory}>
              <div className={styles.catImg}>
                <img src="/assets/images/catBooks.png" alt="" />
              </div>
              <h2 className={styles.categoryName}>Books</h2>
              <p className={styles.amountProducts}>2.1k products</p>
            </div>
          </motion.div>
          <motion.div  whileHover={{rotateY:360}} transition={{duration:0.5}}  onClick={() => {
            navigate('/productslist/Gaming')
          }} className={styles.catContainer}>
            <div className={styles.singleCategory}>
              <div className={styles.catImg}>
                <img src="/assets/images/catGaming.png" alt="" />
              </div>
              <h2 className={styles.categoryName}>Gaming</h2>
              <p className={styles.amountProducts}>8.9k products</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
