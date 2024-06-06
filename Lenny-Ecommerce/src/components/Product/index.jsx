import { useEffect, useState } from "react";
import styles from "../Product/styles.module.scss";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { userData } from "../../components/Auth/auth";
import { instance2, instance } from "../../api";

export const Product = ({
  img,
  heading,
  price,
  marka,
  rating,
  sales,
  sinif,
  id,
}) => {
  const userId = userData()?.userId;
  localStorage.setItem("userID", userId);

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (userId) {
      const getWishList = async () => {
        const {
          data: { data },
        } = await instance.get(
          `/wish-lists?populate[user][populate]=*&populate[products][populate]=*&filters[user]=${userId}`
        );

        const ids = data.map((item) => item.attributes.products.data[0].id);

        setWishlist(ids);
      };
      getWishList();
    } else {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(wishlist);
    }
  }, []);

  const handleWishList = async (e) => {
    e.preventDefault();

    if (userId) {
      if (!wishlist.includes(id)) {
        const data = await instance2.post(
          "/wish-lists",
          JSON.stringify({
            data: {
              user: userId,
              products: id,
            },
          })
        );

        setWishlist((prev) => [...prev, id]);
      } else {
        const {
          data: { data },
        } = await instance.get(
          `/wish-lists?filters[user]=${userId}&filters[products]=${id}`
        );

        const wishlistId = data[0]?.id;

        await instance2.delete(`/wish-lists/${wishlistId}`);

        setWishlist((prev) => prev.filter((prodId) => prodId !== id));
      }
    } else {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      if (!wishlist.includes(id)) {
        const updatedWishList = [...storedWishlist, id];
        setWishlist(updatedWishList);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishList));
      } else {
        const updatedWishList = storedWishlist.filter((prod) => prod != id);
        setWishlist(updatedWishList);

        localStorage.setItem("wishlist", JSON.stringify(updatedWishList));
      }
    }
  };

  return (
    <>
      <div className={`${styles.productContainer} ${sinif}`}>
        <Link to={`/products/${id}`} className={styles.imageSection}>
          <div className={styles.imgContainer}>
            <img src={img} alt="" />
          </div>
          <div className={styles.favorite}>
            <span onClick={handleWishList} style={{ color: "#000" }}>
              {!wishlist?.includes(id) ? (
                <FaRegHeart style={{ fontSize: "20px" }} />
              ) : (
                <FaHeart style={{ fontSize: "20px", color: "red" }} />
              )}
            </span>
          </div>
        </Link>
        <div className={styles.detailsSection}>
          <div className={styles.headingPrice}>
            <h1 className={styles.heading}>{heading}</h1>
            <h3 className={styles.price}>${price}</h3>
          </div>
          <p className={styles.brand}>{marka}</p>
          <div className={styles.star}>
            <div className={styles.ratingSection}>
              <img src="/public/images/star.png" alt="" />
              <p className={styles.rating}>{rating}</p>
            </div>

            <p className={styles.sales}>{sales} sold</p>
          </div>
        </div>
      </div>
    </>
  );
};
