import React from "react";
import styles from "../Product/styles.module.scss"
import  { Link } from "react-router-dom"

export const Product = ({img, heading, price, marka, rating, sales, sinif, id})=>{


    return (
        <>
            <div className={`${styles.productContainer} ${sinif}`}>
                <Link to={`/products/${id}`} className={styles.imageSection}>
                    <div className={styles.imgContainer}>
                        <img src={img} alt="" />
                    </div>
                    <div className={styles.favorite}>
                    <span style={{color:'#000'}} className="material-symbols-outlined">
favorite
</span>
                    </div>
                </Link>
                <div className={styles.detailsSection}>
                    <div className={styles.headingPrice}>
                        <h1 className={styles.heading}>{heading}</h1>
                        <h3 className={styles.price}>${price}</h3>
                    </div>
                    <p className={styles.brand}>{marka}</p>
                    <div className={styles.star}>
                        <div className={styles.ratingSection}>
                            <img  src="/src/assets/images/star.png" alt="" />
                            <p className={styles.rating}>{rating}</p>
                        </div>

                        <p className={styles.sales}>{sales} sold</p>
                    </div>
                </div>
            </div>
        </>
    )
}