import React from "react";
import styles from "../Button/styles.module.scss"

export const ButtonSecondary = ({text,sinif}) => {

    return (
        <>
            <button className={`${styles.btnSecondary} ${sinif}`}>
                {text}
            </button>
        </>
    )
}