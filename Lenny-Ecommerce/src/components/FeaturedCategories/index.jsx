import React from "react";
import styles from "../FeaturedCategories/styles.module.scss"

 export const FeaturedCategories = ()=>{
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>Feature Categories</h1>

                <div className={styles.categories}>
                   <div className={styles.catContainer}>
                   <div className={styles.singleCategory}>
                        <div className={styles.catImg}>
                            <img src="/src/assets/images/catElectronics1.png" alt="" />
                        </div>
                        <h2 className={styles.categoryName}>Electronics</h2>
                        <p className={styles.amountProducts}>8.9k products</p>
                    </div>
                   </div>
                   <div className={styles.catContainer}>
                   <div className={styles.singleCategory}>
                        <div className={styles.catImg}>
                            <img src="/src/assets/images/catFashion.png" alt="" />
                        </div>
                        <h2 className={styles.categoryName}>Fashion</h2>
                        <p className={styles.amountProducts}>8.2k products</p>
                    </div>
                   </div>
                   <div className={styles.catContainer}>
                   <div className={styles.singleCategory}>
                        <div className={styles.catImg}>
                            <img src="/src/assets/images/cataction.png" alt="" />
                        </div>
                        <h2 className={styles.categoryName}>Action</h2>
                        <p className={styles.amountProducts}>1.9k products</p>
                    </div>
                   </div>
                   <div className={styles.catContainer}>
                   <div className={styles.singleCategory}>
                        <div className={styles.catImg}>
                            <img src="/src/assets/images/catElectronics2.png" alt="" />
                        </div>
                        <h2 className={styles.categoryName}>Electronics</h2>
                        <p className={styles.amountProducts}>3.1k products</p>
                    </div>
                   </div>
                    <div className={styles.catContainer}>
                    <div className={styles.singleCategory}>
                        <div className={styles.catImg}>
                            <img src="/src/assets/images/catBooks.png" alt="" />
                        </div>
                        <h2 className={styles.categoryName}>Books</h2>
                        <p className={styles.amountProducts}>2.1k products</p>
                    </div>
                    </div>
                   <div className={styles.catContainer}>
                   <div className={styles.singleCategory}>
                        <div className={styles.catImg}>
                            <img src="/src/assets/images/catGaming.png" alt="" />
                        </div>
                        <h2 className={styles.categoryName}>Gaming</h2>
                        <p className={styles.amountProducts}>8.9k products</p>
                    </div>
                   </div>
                </div>
                
            </div>
        </>
    )
}