import React from "react";
import styles from "../HomepageArticles/styles.module.scss"
import { Article } from "../Article";

export const HomepageArticles = ()=>{
    return (
        <>
            <div className={styles.articles}>
                <Article src={'/src/assets/images/articleimg.png'} date={'Lenny article'} length={'6 mins read'} heading={'What are the fashion trend in 2023?'} descriptionText={'Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet cras'}/>
                <Article src={'/src/assets/images/articleimg.png'} date={'Lenny article'} length={'6 mins read'} heading={'What are the fashion trend in 2023?'} descriptionText={'Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet cras'}/>
                <Article src={'/src/assets/images/articleimg.png'} date={'Lenny article'} length={'6 mins read'} heading={'What are the fashion trend in 2023?'} descriptionText={'Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam scelerisque pharetra id. Maecenas diam eu amet cras'}/>

            </div>
        </>
    )
}