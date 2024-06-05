import React from "react";
import { userData } from "../../components/Auth/auth";
import { instance } from "../../api";
import {Product} from "../../components/Product"
import styles from "../UserOrder/styles.module.scss"

export const Orders = () => {
  const userId = userData()?.userId;
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const getOrderds = async () => {
      const {
        data: { data: products },
      } = await instance.get(
        `/user-orders?populate[user][populate]=*&populate[products][populate]=*&filters[user]=${userId}`
      );

      setOrders(products);
    };

    getOrderds();
  }, []);

  if (orders.length > 0) {
    return (
      <>
        <div className={styles.products}>
          {orders.map((product) => {
            let result;

            if (product?.attributes?.products?.data[0]?.attributes?.name.length > 40) {
              result = product?.attributes?.products?.data[0]?.attributes?.name.slice(0, 40) + "...";
            } else {
              result = product?.attributes?.products?.data[0]?.attributes?.name;
            }
            return (
              <>
                <Product
                  id={product?.attributes?.products?.data[0]?.id}
                  sinif={styles.productWidth}
                  img={`${import.meta.env.VITE_API_UPLOAD_IMG}${
                    product?.attributes?.products?.data[0]?.attributes?.images.data[0].attributes.url
                  }`}
                  heading={result}
                  price={`${product?.attributes?.products?.data[0]?.attributes?.price}`}
                  marka={`${product?.attributes?.products?.data[0]?.attributes?.marka}`}
                  rating={`${product?.attributes?.products?.data[0]?.attributes?.rating}`}
                  sales={`${product?.attributes?.products?.data[0]?.attributes?.quantitySold}`}
                />
                ;
              </>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <h2
        className={styles.wishlist}
        style={{ textAlign: "center", margin: "150px" }}
      >
        No purschased products
      </h2>
    );
  }
};
