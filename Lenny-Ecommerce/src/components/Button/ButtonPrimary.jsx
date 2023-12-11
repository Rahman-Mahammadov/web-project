import React from "react";
import styles from "../Button/styles.module.scss"

export const ButtonPrimary = ({text,sinif}) => {

    return (
        <>
            <button className={`${styles.btnPrimary} ${sinif}`}>
                {text}
            </button>
        </>
    )
}