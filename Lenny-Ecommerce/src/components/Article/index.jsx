import React from "react";
import styles from "../Article/styles.module.scss"

export const Article = ({src, date, length, heading, descriptionText})=>{
    return (
        <>
                <div className={styles.cardsContainer}>
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
                    </div>
    
            
        </>
    )
}