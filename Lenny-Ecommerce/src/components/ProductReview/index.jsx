import React, { useEffect, useState } from "react";
import styles from "../ProductReview/styles.module.scss";
import { FaStar } from "react-icons/fa";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import { userData } from "../../components/Auth/auth";
import { instance, instance2 } from "../../api";
import { toast } from "react-toastify";

export const ProductReview = ({ id, setReviews, reviews }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const userId = userData()?.userId;
  const [desc, setDesc] = useState(null);
  const [reviewUsersId, setReviewUsersId] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const getProdReviews = async () => {
      const {
        data: { data },
      } = await instance.get(
        `/reviews?filters[products]=${id}&populate=*`
      );

      setReviews(data)
      data.map((comment) => {
        setReviewUsersId((prev) => [...prev, comment.attributes.user.data.id]);
      });
    };
    getProdReviews();
  }, [clicked]);

  const handleReview = () => {
    if (rating && desc) {
      if (!reviewUsersId.includes(userId)) {
        setClicked(!clicked);
        const postReviews = async () => {
          await instance2.post(
            "/reviews",
            JSON.stringify({
              data: {
                rating: rating,
                description: desc,
                user: userId,
                products: id,
              },
            })
          );
        };
        postReviews();
      } else {
        toast.error("You cannot review a product more than once!");
      }

      setDesc("");
      setRating(null);
    } else {
      toast.error("Rating or description missing!");
    }
  };

  
  return (
    <>
      <div className={styles.rating}>
        <p style={{ fontSize: "20px" }}>Leave a review</p>
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={Math.random()*10}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
              />
              <FaStar
                className={styles.star}
                size={20}
                color={
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                }
              />
            </label>
          );
        })}

        <div className={styles.textArea}>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div onClick={handleReview} className={styles.btn}>
        <ButtonPrimary text={"Submit"} sinif={styles.submitBtn} />
      </div>
    </>
  );
};
