import React, { useEffect, useState } from "react";
import styles from "../Basket/basket.module.scss";
import { ButtonPrimary } from "../../components/Button/ButtonPrimary.jsx";
import { userData } from "../../components/Auth/auth";
import { instance, instance2 } from "../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { basketSize } from "../../store/cartSlicer";
import axios from "axios";
import { motion } from "framer-motion";
import { isBasketRefreshed } from "../../store/basketQuantitySlicer.js";
import { MyVerticallyCenteredModal as LoadingModal } from "./LoadingModal";
import { MyVerticallyCenteredModal as PaymentModal } from "./PaymentModal";
import { toast } from "react-toastify";
import { FaLastfmSquare } from "react-icons/fa";

export const Basket = () => {
  const [merchants, setMerchants] = useState([]);
  const [basketProd, setBasketProd] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalPayment, setModalPayment] = React.useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  const [promo, setPromo] = useState(false);
  const [clicked, setClicked] = useState(true);
  const [allMerchants, setAllMerchants] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = userData()?.userId;
    const getbasketProducts = async () => {
      const {
        data: { data: products },
      } = await instance.get(
        `/user-carts?populate[user][populate]=*&populate[products][populate]=*&filters[user]=${userId}`
      );

      setBasketProd(products);

      const {
        data: { data },
      } = await instance.get("/merchants?populate=*");

      setAllMerchants(data);

      products.forEach((prod) => {
        !merchants.includes(
          prod.attributes.products.data[0].attributes.merchant.data.attributes
            .name
        )
          ? merchants.push(
              prod.attributes.products.data[0].attributes.merchant.data
                .attributes.name
            )
          : // setMerchants(prod.attributes.products.data[0].attributes.merchant.data
            //   .attributes.name)
            "";
      });
      setBasketProd(products);
      localStorage.setItem("basket", JSON.stringify(products));

      setMerchants(merchants);
    };

    getbasketProducts();
  }, [modalShow]);

  useEffect(() => {
    const handleTotalPrice = () => {
      const prices = basketProd
        .map((basket) => {
          return (
            basket.attributes.products.data[0].attributes.price *
            basket.attributes.products.data[0].attributes.user_carts.data[0]
              .attributes.qty
          );
        })
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);

      const amountOfProducts = basketProd
        .map((prod) => {
          return prod.attributes.products.data[0].attributes.user_carts.data[0]
            .attributes.qty;
        })
        .reduce((arr, curr) => {
          return arr + curr;
        }, 0);

      setTotalPrice(prices);
      setTotalNumber(amountOfProducts);
    };

    dispatch(basketSize(totalNumber));

    handleTotalPrice();
  }, [basketProd]);

  const handlePayment = () => {
    setModalPayment(!modalPayment);
  };

  const handleIncrement = async (id) => {
    setClicked(!clicked);
    let {
      data: {
        data: {
          attributes: { qty },
        },
      },
    } = await instance.get(`/user-carts/${id}`);

    const res = await instance2.put(
      `/user-carts/${id}`,
      JSON.stringify({
        data: {
          qty: qty + 1,
        },
      })
    );

    dispatch(isBasketRefreshed());
    setModalShow(true);

    setInterval(() => {
      setModalShow(false);
    }, 2500);
    toast.success("Basket refreshed");
  };

  const handleDecrement = async (id) => {
    setClicked(!clicked);

    let {
      data: {
        data: {
          attributes: { qty },
        },
      },
    } = await instance.get(`/user-carts/${id}`);

    const res = await instance2.put(
      `/user-carts/${id}`,
      JSON.stringify({
        data: {
          qty: qty - 1,
        },
      })
    );
    dispatch(isBasketRefreshed());
    setModalShow(true);
    setInterval(() => {
      setModalShow(false);
    }, 2500);
    toast.success("Basket refreshed");
  };

  const handleRemove = async (id) => {
    setClicked(!clicked);

    const data = await instance2.delete(`/user-carts/${id}`);

    setModalShow(true);
    setInterval(() => {
      setModalShow(false);
    }, 2500);
    toast.success("Basket refreshed");
    setBasketProd([]);
  };

  if (userData()) {
    if (basketProd.length > 0) {
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
              {merchants.map((mer) => {
                return (
                  <>
                    <div key={Math.random()*10} className={styles.merchantContainer}>
                      {allMerchants.map((allMer) => {
                        if (mer == allMer.attributes.name) {
                          return (
                            <>
                              <div key={Math.random()*10} className={styles.logoSection}>
                                <div className={styles.logoContainer}>
                                  <img
                                    src={`${
                                      import.meta.env.VITE_API_UPLOAD_IMG
                                    }${
                                      allMer.attributes.logo.data[0].attributes
                                        .url
                                    }`}
                                    alt=""
                                  />
                                </div>
                                <div className={styles.brandInfo}>
                                  <h2>{allMer.attributes.name}</h2>
                                  <p>{allMer.attributes.location}</p>
                                </div>
                              </div>
                            </>
                          );
                        }
                      })}

                      {basketProd.map((basket) => {
                        if (
                          mer ==
                          basket.attributes.products.data[0].attributes.merchant
                            .data.attributes.name
                        ) {
                          return (
                            <>
                              <motion.div key={Math.random()*10}
                                whileHover={{
                                  boxShadow:
                                    "0 2px 10px 1px rgba(0, 0, 0, 0.05)",
                                  borderRadius: "8px",
                                  scale: 1.02,
                                }}
                                className={styles.singleProduct}
                              >
                                <div className={styles.productDetails}>
                                  <div
                                    onClick={() => {
                                      navigate(
                                        `/products/${basket.attributes.products.data[0].id}`
                                      );
                                    }}
                                    className={styles.productImg}
                                  >
                                    <img
                                      src={`${
                                        import.meta.env.VITE_API_UPLOAD_IMG
                                      }${
                                        basket.attributes.products.data[0]
                                          .attributes.images.data[0].attributes
                                          .url
                                      }`}
                                      alt=""
                                    />
                                  </div>

                                  <div
                                    onClick={() => {
                                      navigate(
                                        `/products/${basket.attributes.products.data[0].id}`
                                      );
                                    }}
                                    className={styles.productInfo}
                                  >
                                    <h1 className={styles.productName}>
                                      {
                                        basket.attributes.products.data[0]
                                          .attributes.name
                                      }
                                    </h1>
                                    <p className={styles.merchantName}>
                                      Logitech Indonesia
                                    </p>
                                    <h2 className={styles.price}>
                                      ${" "}
                                      {
                                        basket.attributes.products.data[0]
                                          .attributes.price
                                      }
                                    </h2>
                                  </div>
                                </div>
                                <div className={styles.buttons}>
                                  <div className={styles.quantity}>
                                    <span
                                      onClick={() => {
                                        handleDecrement(basket.id);
                                       
                                      }}
                                      style={{ fontSize: "15px" }}
                                      className="material-symbols-outlined"
                                    >
                                      remove
                                    </span>
                                    <p>{basket.attributes.qty}</p>
                                    <span
                                      onClick={() => {
                                        handleIncrement(basket.id);
                                       
                                      }}
                                      style={{
                                        color: "#1D9E34",
                                        fontSize: "15px",
                                      }}
                                      className="material-symbols-outlined"
                                    >
                                      add
                                    </span>
                                  </div>

                                  <div
                                    onClick={() => {
                                      handleRemove(basket.id)
                                      dispatch(isBasketRefreshed());

                                    }}
                                    className={styles.delete}
                                  >
                                    <span className="material-symbols-outlined">
                                      delete
                                    </span>
                                  </div>
                                </div>

                                <hr />
                              </motion.div>
                            </>
                          );
                        }
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
                <p className={styles.priceAmount}>${totalPrice.toFixed(2)} </p>
              </div>
              <div className={styles.deliveryContainer}>
                <p className={styles.deliveryPrice}>Shipping</p>
                <p className={styles.deliveryAmount}>${totalNumber * 4}</p>
              </div>
              <p className={styles.deliveryMessage}>
                A delivery fee is charged for each store you shop at.
              </p>
              <hr />
              <div className={styles.finalPriceContainer}>
                <p className={styles.finalPrice}>Total Price</p>
                <p className={styles.finalAmount}>
                  ${(totalNumber * 4 + totalPrice).toFixed(2)}
                </p>
              </div>
              {!promo && (
                <motion.div
                  whileHover={{
                    boxShadow: "0 2px 10px 1px rgba(0, 0, 0, 0.05)",
                    borderRadius: "8px",
                    scale: 1.02,
                  }}
                  onClick={() => {
                    setPromo(!promo);
                  }}
                  className={styles.promoCode}
                >
                  <div className={styles.promoImg}>
                    <img src="/public/assets/images/discount-shape.png" alt="" />
                  </div>
                  <div className={styles.promoText}>
                    <h1>Use Promo</h1>
                    <p>Enter code</p>
                  </div>

                  <div className={styles.nextIcon}>
                    <img src="/public/assets/images/arrow-right.png" />
                  </div>
                </motion.div>
              )}

              {promo && (
                <div className={styles.enterPromoCode}>
                  <input
                    style={{ border: "0", outline: "none" }}
                    type="text"
                    placeholder="Promo code"
                  />
                  <div
                    onClick={() => {
                      toast.error("No such code exists");
                    }}
                    className={styles.btnContainer}
                  >
                    <ButtonPrimary
                      text={"Apply the code"}
                      sinif={styles.promoBtn}
                    />
                  </div>
                </div>
              )}

              <div onClick={handlePayment}>
                {" "}
                <ButtonPrimary text={"Checkout"} sinif={styles.checkoutBtn} />
              </div>
            </div>

            <LoadingModal show={modalShow} onHide={() => setModalShow(false)} />
            <PaymentModal
              totalprice={totalPrice}
              show={modalPayment}
              onHide={() => setModalPayment(false)}
            />
          </div>
        </>
      );
    } else {
      return <h2 className={styles.basket}>No products in your basket :( </h2>;
    }
  } else {
    return (
      <>
        <h2 style={{ textAlign: "center", margin: "150px" }}>
          Log in or Sign up to see your basket
        </h2>
      </>
    );
  }
};
