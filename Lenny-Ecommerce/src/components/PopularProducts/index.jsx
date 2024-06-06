import React from "react";
import styles from "../PopularProducts/styles.module.scss"
import { Product } from "../Product/index.jsx";
import { ButtonSecondary } from "../index"
import { getHomepageProducts } from "../../api/products";

export const PopularProducts = ()=>{
    const [loadClicked, setLoadClicked] = React.useState(false);
    const [homeProducts1, setHomeProducts1] = React.useState([]);
    const [homeProducts2, setHomeProducts2] = React.useState([]);

    const loadMoreHandler = ()=>{
        setLoadClicked(!loadClicked)
    }


    React.useEffect(()=>{
        async function getAllHomeProducts(){
            const {data:{data}} = await getHomepageProducts(1);
            setHomeProducts1(data)
        }

        async function getAllHomeProducts2 (){ 
            const {data:{data}} = await getHomepageProducts(2);
            setHomeProducts2(data)
        }

        getAllHomeProducts();
        getAllHomeProducts2();
    }, [])

    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.heading}>Popular Product on Lenny</h2>
                <p className={styles.description}>Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in</p>

                <section className={styles.products}>
               
                {homeProducts1.map((product)=>{
                    let result

                    if(product.attributes.name.length>40){
                        result = product.attributes.name.slice(0,40)+"...";
                    } else{
                        result = product.attributes.name
                    }
                        return(
                            <Product key={product.id} id={product.id} img={`${import.meta.env.VITE_API_UPLOAD_IMG}${product.attributes.images.data[0].attributes.url}`} heading={result} price={`${product.attributes.price}`} marka={`${product.attributes.marka}`} rating={`${product.attributes.rating}`} sales={`${product.attributes.quantitySold}`}/>
                        )
                        
                        
                })}

                
                </section>

               {loadClicked ?  <section className={`${styles.products} ${styles.loadMore}`}>
               {homeProducts2.map((product)=>{
                    let result

                    if(product.attributes.name.length>40){
                        result = product.attributes.name.slice(0,40)+"...";
                    } else{
                        result = product.attributes.name
                    }
                        return(
                            <Product key={product.id} id={product.id} img={`${import.meta.env.VITE_API_UPLOAD_IMG}${product.attributes.images.data[0].attributes.url}`} heading={result} price={`${product.attributes.price}`} marka={`${product.attributes.marka}`} rating={`${product.attributes.rating}`} sales={`${product.attributes.quantitySold}`}/>
                        )
                        
                        
                })}

                </section>: null}
                {!loadClicked ? <div onClick={loadMoreHandler} className={styles.btnContainer}>
                <ButtonSecondary sinif={styles.loadMoreBtn} text={'Load more'}/>
                </div> : null}
            </div>
        </>
    )
}