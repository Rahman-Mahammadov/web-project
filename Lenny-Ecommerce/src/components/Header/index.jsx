import React from "react";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import {ButtonSecondary} from "../Button/ButtonSecondary"

import { Product } from "../Product";
import styles from "../Header/styles.module.scss"


export const Header = ()=>{


    return (
        <>
            <header>
               <div className={styles.container}>
               <section className={styles.buyNow}>
                    <h1>Upgrade Your Wardrobe <br />
With Our Collection</h1>

                    <p className={styles.description}>
                    Eget neque aenean viverra aliquam tortor diam nunc. Dis pellentesque lectus quis velit fusce aenean nunc dui consectetur. Eu lorem est ullamcorper nisl amet non mollis.
                    </p>

                    <div className={styles.buttons}>
                       <ButtonPrimary sinif={styles.btnMain} text='Buy now'/>
                        <ButtonSecondary sinif={styles.btnSecond} text="View detail" />
                       
                        
                    </div>
                </section>

                <section className={styles.productContainer}>
                    <div className={styles.productImg}>
                        <img src="/src/assets/images/image 4.png" />

                    </div>
                    
                </section>
               </div>
            </header>
        
        </>
    )
}