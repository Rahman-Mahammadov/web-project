import React, { useState } from "react";
import styles from "../ProductDetail/styles.module.scss";
import ReactImageMagnify from "react-image-magnify";
import { ButtonPrimary, ButtonSecondary, Product } from "../../components/";
import { useParams } from "react-router-dom";
import { getSingleProduct, getProductsByCategories } from "../../api/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlicer";
import { toast } from "react-toastify";
import { instance, instance2 } from "../../api";
import { userData } from "../../components/Auth/auth";

export const ProductDetail = () => {
  const [singleProduct, setSingleProduct] = React.useState({});
  const [mainImg, setMainImg] = React.useState({});
  const [modal, setModal] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [basket, setBasket] = React.useState([]);

  const dispatch = useDispatch();
  const { id } = useParams();
  const handleModal = () => {
    setModal(!modal);
  };

  const cartProduct = useSelector((state) => state.cart.value);
  const handleAccordion = (e) => {
    console.log(e);
    const {
      dataset: { name },
    } = e.target;

    setOpen((prev) => ({ ...prev, [name]: !prev[name] }));
    console.log(e.target.dataset.name);
  };

  const handleCartClick = async () => {
    const userId = userData()?.userId;

    if (userId) {
      const {
        data: { data },
      } = await instance2.get("/user-carts?populate=*");

      console.log(data);

      const inBasket = data.some((prod) => {
        return (
          prod.attributes.products.data[0].id == singleProduct.id &&
          prod.attributes.user.data.id == userId
        );
      });

      if(!inBasket){
      
          const res = await instance2.post(
            "/user-carts",
            JSON.stringify({
              data: {
                user: userId,
                products: singleProduct.id,
              },
            })
          );

          toast.success('Added to the basket')
         
      } else{
        toast.error('Product is already in the basket')
      }
    } else {
      toast.error("You need to log in");
    }
  };

  React.useEffect(() => {
    async function getProduct() {
      const {
        data: { data },
      } = await getSingleProduct(id);
      setSingleProduct(data);
      setMainImg(data.attributes.images.data[0].attributes.url);

      const res = await getProductsByCategories();
      console.log(res);
    }

    getProduct();
  }, []);

  return (
    <>
      <div className={styles.nav}>
        <p>Home</p>
        <span className="material-symbols-outlined">chevron_right</span>
        <p>Electronics</p>
        <span className="material-symbols-outlined">chevron_right</span>
        <h4>Gaming gear</h4>
      </div>

      <div className={styles.header}>
        <div className={styles.imagesContainer}>
          <div className={styles.thumbnail}>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: `${import.meta.env.VITE_API_UPLOAD_IMG}${mainImg}`,
                },
                largeImage: {
                  src: `${import.meta.env.VITE_API_UPLOAD_IMG}${mainImg}`,
                  width: 900,
                  height: 1200,
                },
              }}
            />
          </div>
          <div className={styles.otherImages}>
            {singleProduct?.attributes?.images?.data?.map((data, index) => {
              return (
                <div
                  key={data.id}
                  onClick={() => {
                    setMainImg(
                      singleProduct?.attributes?.images?.data[index].attributes
                        .url
                    );
                  }}
                  onMouseEnter={() => {
                    setMainImg(
                      singleProduct?.attributes?.images?.data[index].attributes
                        .url
                    );
                  }}
                >
                  <img
                    className={mainImg.id == data.id ? styles.checkehdImg : ""}
                    src={`${import.meta.env.VITE_API_UPLOAD_IMG}${
                      data.attributes.url
                    }`}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.productDetails}>
          <h1>{singleProduct.attributes?.name}</h1>

          <div className={styles.rating}>
            <div className={styles.star}>
              <img src="/src/assets/images/star.png" alt="" />
              <p>{singleProduct.attributes?.rating}</p>
            </div>

            <p className={styles.soldQuantity}>
              {singleProduct.attributes?.quantitySold} Sold
            </p>
          </div>

          <span className={styles.price}>
            ${singleProduct.attributes?.price}
          </span>

          <p className={styles.shortDescription}>
            {singleProduct.attributes?.description}
          </p>
          <div className={styles.variants}>
            {singleProduct.attributes?.variations.data.map((variant) => {
              return (
                <div>
                  <label style={{ display: "block" }}>
                    {variant.attributes.name}:
                  </label>
                  <select>
                    <option value="">--choose an option--</option>
                    {variant.attributes.options.map((options) => {
                      return (
                        <option value="">{options.children[0].text}</option>
                      );
                    })}
                  </select>
                </div>
              );
            })}
          </div>

          <div className={styles.buttons}>
            <ButtonPrimary sinif={styles.btn} text={"Buy now"} />
            <div onClick={handleCartClick}>
              <ButtonSecondary sinif={styles.btn} text={"Add to cart"} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailsNavigation}>
        <ul>
          <li
            onClick={() => {
              let div = document.getElementById(1);
              div.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Detail Product
          </li>
          <li
            onClick={() => {
              let div = document.getElementById(2);
              div.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Merchant
          </li>
          <li
            onClick={() => {
              let div = document.getElementById(3);
              div.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Reviews
          </li>
          <li
            onClick={() => {
              let div = document.getElementById(4);
              div.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Related Products
          </li>
        </ul>
      </div>

      <div className={styles.shortDesc}>
        <h1>G502 X Lightspeed WirelessGaming Mouse</h1>
        <p>
          G502 X LIGHTSPEED is the latest addition to legendary G502 lineage.
          Featuring our first-ever LIGHTFORCE hybrid optical-mechanical switches
          and updated LIGHTSPEED wireless protocol with 68% faster response
          rate.
        </p>
      </div>

      <div id="1" className={styles.specificationsContainer}>
        <div className={styles.specification1}>
          <h1>Specifications</h1>
          <ul>
            {singleProduct.attributes?.product_details?.map(
              (details, index) => {
                return (
                  <li key={index}>
                    <div>
                      <h3>{details?.children[0].text.split("-")[0]}</h3>
                    </div>
                    <div>
                      <p>{details?.children[0].text.split("-")[1]}</p>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </div>

        <div className={styles.specification2}>
          <h1>In the box</h1>
          <ul>
            <li>
              <div>
                <div className={styles.icon}>
                  <img src="/src/assets/images/tick-circle.jpg" alt="" />
                </div>
                <p>UG502 X LIGHTSPEED Wireless Gaming Mouse</p>
              </div>
            </li>
            {singleProduct?.attributes?.inBox?.map((details, index) => {
              return (
                <li key={index}>
                  <div>
                    <div className={styles.icon}>
                      <img src="/src/assets/images/tick-circle.jpg" alt="" />
                    </div>
                    <p>{details.children[0].text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <hr className={styles.hr} />

      <div id="2" className={styles.merchantContainer}>
        <h1>Merchant Information</h1>
        <div className={styles.container}>
          <div className={styles.logoSection}>
            <div className={styles.logoContainer}>
              <img
                src="https://s3-alpha-sig.figma.com/img/eb85/6f7b/f2dbae2827a339bbb0aa7801d5d6aaf7?Expires=1699228800&Signature=mvw9X65FVezk-oiRZ2zn2kDSeot48TJAMW7PGRGXOJQzk4~VN3QyFOfc~tMcbaop1uuJmgT47BZoHJ9wE9dwCdGerCB1seW9~Rh~8RNe0~RLMsd9Iwu~pLr6ZJ3lYNFJVWpu0uoSmb8ILYBby4YMA~L0q0XoNdK50DPkGG5pH9ujVvUZc4E0m8yAsQzIUT3WNKLhADgMpPM4ogGJ13q1lXI9~T59162i6RyiWPBqrx7f3qecgvJU3cfz9iLjuUNRNUw~pyJGTfzEUFGUI0RWY9aRnBJIH6VKXr9LPw4GnMh92Hv9~~x3QA8rX-jF9WSp7yGWrC7D21o7I2uwH7gutQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                alt=""
              />
            </div>
            <div className={styles.merchantInfo}>
              <h2>Logitech Indonesia</h2>
              <h3>Jakarta Pusat</h3>
              <div className={styles.merchantRating}>
                <div>
                  <p>Top Rated Merchant</p>
                </div>
                <div>
                  <p>Best Merchant</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.merchantButtons}>
            <div className={styles.chatMerchant}>
              <div className={styles.chatlogo}>
                <img src="/src/assets/images/message.png" alt="" />
              </div>
              <p>Chat</p>
            </div>
            <div className={styles.visitMerchant}>
              <div className={styles.visitlogo}>
                <img src="/src/assets/images/shop.png" alt="" />
              </div>
              <p>Visit Merchant</p>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.hr} />

      <div id="3" className={styles.reviewsContainer}>
        <div className={styles.filterSection}>
          <aside className={modal ? styles.showModal : ""}>
            <div className={styles.modalClose}>
              <h1 className={styles.mainFilter}>Filter reviews</h1>
              <span onClick={handleModal} className="material-symbols-outlined">
                close
              </span>
            </div>
            <hr />

            <div className={styles.bestFilters}>
              <div className={styles.filterHeading}>
                <h1>Best filters</h1>
                <span
                  onClick={(e) => handleAccordion(e)}
                  data-name="best"
                  className="material-symbols-outlined"
                >
                  expand_less
                </span>
              </div>

              <ul className={open.best ? styles.closeFilter : ""}>
                <li>
                  <input type="checkbox" />
                  <label htmlFor="">
                    <img src="/src/assets/images/star.png" alt="" /> 5
                  </label>
                </li>
                <li>
                  <input type="checkbox" />
                  <label htmlFor="">
                    <img src="/src/assets/images/star.png" alt="" /> 4
                  </label>
                </li>
                <li>
                  <input type="checkbox" />
                  <label htmlFor="">
                    <img src="/src/assets/images/star.png" alt="" /> 3
                  </label>
                </li>
                <li>
                  <input type="checkbox" />
                  <label htmlFor="">
                    <img src="/src/assets/images/star.png" alt="" /> 2
                  </label>
                </li>
                <li>
                  <input type="checkbox" />
                  <label htmlFor="">
                    <img src="/src/assets/images/star.png" alt="" /> 1
                  </label>
                </li>
              </ul>
            </div>
          </aside>
        </div>
        <div className={styles.reviewsSection}>
          <h1>Product Reviews</h1>

          <div className={styles.reviewsWrapper}>
            <div className={styles.singleReview}>
              <div className={styles.reviewRating}>
                <ul>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                </ul>
              </div>
              <h2 className={styles.reviewText}>
                This is amazing product I have.
              </h2>
              <p className={styles.reviewDate}>July 2, 2020 03:29 PM</p>

              <div className={styles.reviewUser}>
                <div className={styles.userPhoto}>
                  <img src="/src/assets/images/account_circle_FILL0_wght400_GRAD0_opsz24.png" />
                </div>
                <h2 className={styles.userName}>Darrell Steward</h2>
              </div>
              <hr className={`${styles.hr} ${styles.hr1}`} />
            </div>
            <div className={styles.singleReview}>
              <div className={styles.reviewRating}>
                <ul>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                </ul>
              </div>
              <h2 className={styles.reviewText}>
                This is amazing product I have.
              </h2>
              <p className={styles.reviewDate}>July 2, 2020 03:29 PM</p>

              <div className={styles.reviewUser}>
                <div className={styles.userPhoto}>
                  <img src="/src/assets/images/account_circle_FILL0_wght400_GRAD0_opsz24.png" />
                </div>
                <h2 className={styles.userName}>Darrell Steward</h2>
              </div>
              <hr className={`${styles.hr} ${styles.hr1}`} />
            </div>
            <div className={styles.singleReview}>
              <div className={styles.reviewRating}>
                <ul>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                </ul>
              </div>
              <h2 className={styles.reviewText}>
                This is amazing product I have.
              </h2>
              <p className={styles.reviewDate}>July 2, 2020 03:29 PM</p>

              <div className={styles.reviewUser}>
                <div className={styles.userPhoto}>
                  <img src="/src/assets/images/account_circle_FILL0_wght400_GRAD0_opsz24.png" />
                </div>
                <h2 className={styles.userName}>Darrell Steward</h2>
              </div>
              <hr className={`${styles.hr} ${styles.hr1}`} />
            </div>
            <div className={styles.singleReview}>
              <div className={styles.reviewRating}>
                <ul>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                </ul>
              </div>
              <h2 className={styles.reviewText}>
                This is amazing product I have.
              </h2>
              <p className={styles.reviewDate}>July 2, 2020 03:29 PM</p>

              <div className={styles.reviewUser}>
                <div className={styles.userPhoto}>
                  <img src="/src/assets/images/account_circle_FILL0_wght400_GRAD0_opsz24.png" />
                </div>
                <h2 className={styles.userName}>Darrell Steward</h2>
              </div>
              <hr className={`${styles.hr} ${styles.hr1}`} />
            </div>
            <div className={styles.singleReview}>
              <div className={styles.reviewRating}>
                <ul>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                  <li>
                    <img src="/src/assets/images/star.png" alt="" />
                  </li>
                </ul>
              </div>
              <h2 className={styles.reviewText}>
                This is amazing product I have.
              </h2>
              <p className={styles.reviewDate}>July 2, 2020 03:29 PM</p>

              <div className={styles.reviewUser}>
                <div className={styles.userPhoto}>
                  <img src="/src/assets/images/account_circle_FILL0_wght400_GRAD0_opsz24.png" />
                </div>
                <h2 className={styles.userName}>Darrell Steward</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.hr} />

      <div id="4" className={styles.containerProduct}>
        <h2 className={styles.heading}>Related Products</h2>

        <section className={styles.products}>
          <Product
            img={"src/assets/images/s 1.png"}
            heading={"Green Man Jacket"}
            price={"49"}
            marka={"North Purwokerto"}
            rating={"2.4"}
            sales={"37"}
          />
          <Product
            img={"src/assets/images/s 1.png"}
            heading={"Green Man Jacket"}
            price={"49"}
            marka={"North Purwokerto"}
            rating={"2.4"}
            sales={"37"}
          />
          <Product
            img={"src/assets/images/s 1.png"}
            heading={"Green Man Jacket"}
            price={"49"}
            marka={"North Purwokerto"}
            rating={"2.4"}
            sales={"37"}
          />
          <Product
            img={"src/assets/images/s 1.png"}
            heading={"Green Man Jacket"}
            price={"49"}
            marka={"North Purwokerto"}
            rating={"2.4"}
            sales={"37"}
          />
        </section>
      </div>
    </>
  );
};
