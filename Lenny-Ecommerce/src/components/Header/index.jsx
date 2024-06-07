import React from "react";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import { ButtonSecondary } from "../Button/ButtonSecondary";
import styles from "../Header/styles.module.scss";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <>
      <header>
        <div className={styles.container}>
          <section className={styles.buyNow}>
            <motion.h1
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 2, delay:0.2}}
            >
              Upgrade Your Wardrobe <br />
              With Our Collections
            </motion.h1>

            <motion.p
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 2, delay:0.2 }}
              className={styles.description}
            >
              Eget neque aenean viverra aliquam tortor diam nunc. Dis
              pellentesque lectus quis velit fusce aenean nunc dui consectetur.
              Eu lorem est ullamcorper nisl amet non mollis.
            </motion.p>

            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 2, delay:0.2 }}
              className={styles.buttons}
            >
              <ButtonPrimary sinif={styles.btnMain} text="Buy now" />
              <ButtonSecondary sinif={styles.btnSecond} text="View detail" />
            </motion.div>
          </section>

          <section className={styles.productContainer}>
            <div className={styles.productImg}></div>
          </section>
        </div>
      </header>
    </>
  );
};
