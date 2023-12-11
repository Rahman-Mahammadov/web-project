import React from "react";
import styles from "../DiscountProduct/styles.module.scss"

import {ButtonPrimary} from "../Button/ButtonPrimary.jsx" 
import {ButtonSecondary} from "../Button/ButtonSecondary.jsx"

export const DiscountProduct = ()=>{
    return (
        <>
            <div className={styles.container}>
        
            <div className={styles.firstPhoto}>
                        <img className={styles.img}  src='' alt=""/>
            </div>

                  
                
                <div className={styles.description}>
                    <div className={styles.descriptionContainer}>
                    <h2 className={styles.heading}>
                        Ipad Air Gen 5
                        </h2>
                        <p className={styles.descriptionText}>
                        Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in sapien quam risus sed diam.
                        </p>
                        
                        <div className={styles.buttons}>
                            <ButtonPrimary text={'Buy $900'} sinif={styles.btn}/>
                            <ButtonSecondary text={'View Detail'} sinif={styles.btn}/>
                            
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}