import React, { useEffect, useState } from "react";
import styles from "../Basket/basket.module.scss";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary.jsx";
import { userData } from "../../components/Auth/auth";
import { instance } from "../../api";

export const Basket = () => {
  const [merchants, setMerchants] = useState([]);
  const [basketProd, setBasketProd] = useState([]);
  const [allMerchants, setAllMerchants] = useState([]);

  useEffect(() => {
    const userId = userData()?.userId;
    const getbasketProducts = async () => {
      const {
        data: { data: products },
      } = await instance.get(
        `/user-carts?populate[user][populate]=*&populate[products][populate]=*&filters[user]=${userId}`
      );

      const {
        data: { data }
      } = await instance.get("/merchants");
      

      setAllMerchants(data)

      products.forEach((prod) => {
        !merchants.includes(
          prod.attributes.products.data[0].attributes.merchant.data.attributes
            .name
        )
          ? setMerchants(
              merchants.push(
                prod.attributes.products.data[0].attributes.merchant.data
                  .attributes.name
              )
            )
          : "";
      });
      setBasketProd(products);
      setMerchants(merchants);
    };

    getbasketProducts();
  }, []);

  console.log(basketProd);
  console.log(allMerchants)

  if (userData()) {
    return (
      <>
        <div className={styles.heading}>
          <div className={styles.intro}>
            <p className={styles.cart}>Shopping Cart</p>
            <p className={styles.results}>
              Showing the products of your choice
            </p>
          </div>
        </div>
        <div className={styles.productsSection}>
          <div className={styles.allProductsContainer}>
            <div className={styles.merchantContainer}>
              <div className={styles.logoSection}>
                <div className={styles.logoContainer}>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/eb85/6f7b/f2dbae2827a339bbb0aa7801d5d6aaf7?Expires=1702252800&Signature=lMDksDmcrz2CY36FTqF8KXIlOfOQdHjVTFUSvdShgzA8EHHtgPLEJiv3hHeYIlbEGy8jKVW~RW9l9ot2sd~MYRaLvTKkLljD~igMMesHd4~IpvYYY1fNJZ1ENe22jIJhRoVqxJcU5LOKl2shjp49fXISpwp40TbwldfH5roUB4TzXMSRRvvZZyOgC~YgSM2R6cKD7WDoXaDq5QaS5oBZM-WtJrREyMbMg2GMf-PofbGXkuIAZm2d7j21bOKTzDX~o6aBTJVgPzvzKi1lUN652a7HWtYFev3vmT9J37JN-NS--it9Kl90nxZgKGiRn8AVZq-wRxWTw8PgRGVozVc0fA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    alt=""
                  />
                </div>
                <div className={styles.brandInfo}>
                  <h2>Logitech Indonesia</h2>
                  <p>Central Jakarta</p>
                </div>
              </div>
              <div className={styles.singleProduct}>
                <div className={styles.productDetails}>
                  <input type="checkbox" />
                  <div className={styles.productImg}>
                    <img src="/src/assets/images/productImg.jpg" alt="" />
                  </div>

                  <div className={styles.productInfo}>
                    <h1 className={styles.productName}>
                      Logitech G435 Gaming Headset
                    </h1>
                    <p className={styles.merchantName}>Logitech Indonesia</p>
                    <h2 className={styles.price}>$280</h2>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <div className={styles.quantity}>
                    <span
                      style={{ fontSize: "15px" }}
                      className="material-symbols-outlined"
                    >
                      remove
                    </span>
                    <p>1</p>
                    <span
                      style={{ color: "#1D9E34", fontSize: "15px" }}
                      className="material-symbols-outlined"
                    >
                      add
                    </span>
                  </div>

                  <div className={styles.delete}>
                    <span className="material-symbols-outlined">delete</span>
                  </div>
                </div>

                <hr />
              </div>
            </div>

            {merchants.map((mer) => {
              return (
                <>
                  <div className={styles.merchantContainer}>
                    <div className={styles.logoSection}>
                      <div className={styles.logoContainer}>
                        <img
                          src="https://s3-alpha-sig.figma.com/img/eb85/6f7b/f2dbae2827a339bbb0aa7801d5d6aaf7?Expires=1702252800&Signature=lMDksDmcrz2CY36FTqF8KXIlOfOQdHjVTFUSvdShgzA8EHHtgPLEJiv3hHeYIlbEGy8jKVW~RW9l9ot2sd~MYRaLvTKkLljD~igMMesHd4~IpvYYY1fNJZ1ENe22jIJhRoVqxJcU5LOKl2shjp49fXISpwp40TbwldfH5roUB4TzXMSRRvvZZyOgC~YgSM2R6cKD7WDoXaDq5QaS5oBZM-WtJrREyMbMg2GMf-PofbGXkuIAZm2d7j21bOKTzDX~o6aBTJVgPzvzKi1lUN652a7HWtYFev3vmT9J37JN-NS--it9Kl90nxZgKGiRn8AVZq-wRxWTw8PgRGVozVc0fA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                          alt=""
                        />
                      </div>
                      <div className={styles.brandInfo}>
                        <h2>Logitech Indonesia</h2>
                        <p>Central Jakarta</p>
                      </div>
                    </div>

                    {basketProd.map(() => {
                      return (
                        <>
                          <div className={styles.singleProduct}>
                            <div className={styles.productDetails}>
                              <input type="checkbox" />
                              <div className={styles.productImg}>
                                <img
                                  src="/src/assets/images/productImg.jpg"
                                  alt=""
                                />
                              </div>

                              <div className={styles.productInfo}>
                                <h1 className={styles.productName}>
                                  Logitech G435 Gaming Headset
                                </h1>
                                <p className={styles.merchantName}>
                                  Logitech Indonesia
                                </p>
                                <h2 className={styles.price}>$280</h2>
                              </div>
                            </div>
                            <div className={styles.buttons}>
                              <div className={styles.quantity}>
                                <span
                                  style={{ fontSize: "15px" }}
                                  className="material-symbols-outlined"
                                >
                                  remove
                                </span>
                                <p>1</p>
                                <span
                                  style={{ color: "#1D9E34", fontSize: "15px" }}
                                  className="material-symbols-outlined"
                                >
                                  add
                                </span>
                              </div>

                              <div className={styles.delete}>
                                <span className="material-symbols-outlined">
                                  delete
                                </span>
                              </div>
                            </div>

                            <hr />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
          <div className={styles.productsSummaryContainer}>
            <p className={styles.productSummary}>Product Summary</p>
            <div className={styles.totalPriceContainer}>
              <p className={styles.totalPrice}>Total Price</p>
              <p className={styles.priceAmount}>$0</p>
            </div>
            <div className={styles.deliveryContainer}>
              <p className={styles.deliveryPrice}>Shipping</p>
              <p className={styles.deliveryAmount}>$0</p>
            </div>
            <p className={styles.deliveryMessage}>
              A delivery fee is charged for each store you shop at.
            </p>
            <hr />
            <div className={styles.finalPriceContainer}>
              <p className={styles.finalPrice}>Total Price</p>
              <p className={styles.finalAmount}>$0</p>
            </div>
            <div className={styles.promoCode}>
              <div className={styles.promoImg}>
                <img src="/src/assets/images/discount-shape.png" alt="" />
              </div>
              <div className={styles.promoText}>
                <h1>Use Promo</h1>
                <p>Enter code</p>
              </div>

              <div className={styles.nextIcon}>
                <img src="/src/assets/images/arrow-right.png" />
              </div>
            </div>

            {/* <div className={styles.enterPromoCode}>
              <input type="text" placeholder="Promo code"/>
              <ButtonPrimary text={'Apply the code'} sinif={styles.promoBtn}/>
            </div> */}

            <ButtonPrimary text={"Checkout"} sinif={styles.checkoutBtn} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1 style={{ textAlign: "center", margin: "150px" }}>
          Log in or Sign up to see your basket
        </h1>
      </>
    );
  }
};
