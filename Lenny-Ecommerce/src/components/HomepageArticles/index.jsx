import styles from "../HomepageArticles/styles.module.scss";
import { Article } from "../Article";
import { motion } from "framer-motion";

export const HomepageArticles = () => {
  return (
    <>
      <motion.div initial={{y:300}} whileInView={{y:0}} transition={{duration:1, type:"spring", stiffness:100 }}  className={styles.articles}>
        <Article
          src={"/assets/images/articleimg.png"}
          date={"Lenny article"}
          length={"6 mins read"}
          heading={"What are the fashion trend in 2023?"}
          descriptionText={
            "Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet cras"
          }
        />
        <Article
          src={"/assets/images/articleimg.png"}
          date={"Lenny article"}
          length={"6 mins read"}
          heading={"What are the fashion trend in 2023?"}
          descriptionText={
            "Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet cras"
          }
        />
        <Article
          src={"/assets/images/articleimg.png"}
          date={"Lenny article"}
          length={"6 mins read"}
          heading={"What are the fashion trend in 2023?"}
          descriptionText={
            "Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet cras"
          }
        />
      </motion.div>
    </>
  );
};
