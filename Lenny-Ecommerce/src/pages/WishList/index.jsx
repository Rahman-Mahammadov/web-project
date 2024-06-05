import React from "react";
import { useState, useEffect } from "react";
import { userData } from "../../components/Auth/auth";
import { instance } from "../../api";
import { Product } from "../../components/Product/index";
import styles from "../WishList/styles.module.scss";
export const WishList = () => {
  const userId = userData()?.userId;

  const [wishlist, setWishlist] = useState([]);
  const [prods, setProds] = useState([]);

  useEffect(() => {
    if (!userId) {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(storedWishlist);
    } else {
      const getUserWishList = async () => {
        const {
          data: { data },
        } = await instance.get(
          `/wish-lists?populate[products][populate]=*&filters[user]=${userId}`
        );

      
        const ids = data.map((prod) => prod.attributes.products.data[0].id);
        
        setWishlist(ids);
      };

      getUserWishList();
    }


   
  }, []);

 
useEffect(()=>{
  if(wishlist.length>0){
    let url = "/products?"
    wishlist.forEach((item,index)=> url += `filters[id][$in][${index}]=${item}&`)

    
    
      const getProds = async () => {
        const {
          data: { data },
        } = await instance.get(`${url}populate=*`);

    
        setProds(data);
      };

      getProds();
    

    
   }
}, [wishlist])



  if(wishlist.length>0){
    return <><div className={styles.products}>
    {prods.map((product) => {
      let result;

      if (product?.attributes?.name.length > 40) {
        result = product?.attributes.name.slice(0, 40) + "...";
      } else {
        result = product?.attributes?.name;
      }
      return (
        <>
          <Product
            id={product?.id}
            sinif={styles.productWidth}
            img={`${import.meta.env.VITE_API_UPLOAD_IMG}${
              product?.attributes.images.data[0].attributes.url
            }`}
            heading={result}
            price={`${product?.attributes.price}`}
            marka={`${product?.attributes.marka}`}
            rating={`${product?.attributes.rating}`}
            sales={`${product?.attributes.quantitySold}`}
          />
          ;
        </>
      );
    })}
  </div></>
  } else{
    return <h2 className={styles.wishlist} style={{ textAlign: "center", margin: "150px" }} >No wishlisted products</h2>
  }
};
