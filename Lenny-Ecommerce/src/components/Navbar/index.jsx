import React, { useState } from "react";
import styles from "./styles.module.scss";
import { changeCategory } from "../../store/categorySlicer";
import { Link } from "react-router-dom";
import { getCategories } from "../../api/products";
import { useSelector, useDispatch } from "react-redux";
import { inputSearch } from "../../store/searchInputSlicer";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyVerticallyCenteredModal as SignUp } from "../Auth/SignUp.jsx";
import { MyVerticallyCenteredModal as SignIn } from "../Auth/SignIn.jsx";
import { userData } from "../Auth/auth";
import { toast } from "react-toastify";
import { IoReceiptOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

import { IoIosLogOut } from "react-icons/io";
import { instance } from "../../api/index.js";

export const Navbar = () => {
  const [clickMenu, setClickedMenu] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [modalSignIn, setModalSignIn] = React.useState(false);
  const [basketSize, setBasketSize] = useState(0);
  const basketSelector = useSelector((state)=>state.basketSize.value)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (e) => {
    dispatch(changeCategory(e.target.innerHTML));
    dispatch(inputSearch(""));
    navigate(`productslist/${e.target.innerHTML}`);
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input != "") {
      dispatch(changeCategory(""));
      dispatch(inputSearch(input));
      navigate(`/productslist/search/${input}`);
      window.location.reload();
    }
  };

  const handleSignOut = () => {
    localStorage.setItem("user", "");
    toast.success("Signed out successfully");
  };

  
  React.useEffect(() => {
    async function getAllCategories() {
      const {
        data: { data },
      } = await getCategories();
      setCategories(data);
    }

    getAllCategories();

   
  }, []);


  React.useEffect(()=>{
    const prods = async () => {
      const {data:{data}} = await instance.get(`/user-carts?populate=*`);
  
      if (data) {
        const arr = data.filter(
          (prod) => prod.attributes?.user?.data?.id == userData().userId
        );
       const totalQuantity = arr.reduce((acc, item)=>{
          return acc+=item.attributes.qty;
  
          
        }, 0)
  
        setBasketSize(totalQuantity)
        
      }
    };

    

    prods()
  },[basketSelector])


  return (
    <>
      <nav>
        <Link to="/">
          <div className={styles.logoContainer}>
            <img src="/assets/images/Logo.svg" />
          </div>
        </Link>

        <div className={styles.searchBar}>
          <div className={styles.dropdown}>
            <div className={styles.categorieContainer}>
              <button className={styles.dropbtn}>Categories</button>
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            </div>
            <div className={styles.content}>
              {categories.map((cat) => {
                return (
                  <Link onClick={handleCategoryClick} key={cat.id} href="#">
                    {cat.attributes.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Search on Lenny"
            />
            <button className={styles.searchProducts}>
              <span className="material-symbols-outlined">search</span>
            </button>
          </form>
        </div>
        <div
          className={
            !clickMenu
              ? styles.contentMobile + " " + `${styles.contentMobileHide}`
              : styles.contentMobile
          }
        >
          <ul>
            {categories.map((cat) => {
              return (
                <li key={cat.id}>
                  <Link
                    to={"/productslist"}
                    style={{ textDecoration: "none" }}
                    onClick={handleCategoryClick}
                    href="#"
                  >
                    {cat.attributes.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            onClick={() => {
              setClickedMenu(!clickMenu);
            }}
            className={styles.close}
          >
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>

        <div className={styles.icons}>
          <div
            className={styles.cartContainer}
            onClick={() => {
              navigate("/basket");
            }}
          >
            <img src="/assets/images/cart.svg" alt="" />
            <span>{basketSize}</span>
          </div>
          <div className={styles.line}></div>

          <div className={styles.profileContainer}>
            <img src="/assets/images/profile.svg" alt="" />
            <div className={styles.userProfile}>
              {/* <Link
                onClick={() => setModalSignIn(true)}
                className={styles.userLink}
              >
                Sign in
              </Link>
              <Link
                onClick={() => setModalShow(true)}
                className={styles.userLink}
              >
                Sign up
              </Link> */}
              {userData() ? (
                <div className={styles.userMenu}>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/orders");
                    }}
                    className={styles.myOrders}
                  >
                    <IoReceiptOutline
                      style={{
                        fontSize: "20px",
                        color: "black",
                        marginRight: "9px",
                      }}
                    />
                    <Link className={styles.userLink}>My orders</Link>
                  </div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/wishlist");
                    }}
                    className={styles.myOrders}
                  >
                    <FaRegHeart
                      style={{
                        fontSize: "20px",
                        color: "black",
                        marginRight: "9px",
                      }}
                    />
                    <Link className={styles.userLink}>Wishlist</Link>
                  </div>

                  <div className={styles.myOrders}>
                    <IoIosLogOut
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "9px",
                      }}
                    />
                    <Link onClick={handleSignOut} className={styles.userLink}>
                      Sign out
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    onClick={() => setModalSignIn(true)}
                    className={styles.userLink}
                  >
                    Sign in
                  </Link>
                  <Link
                    onClick={() => setModalShow(true)}
                    className={styles.userLink}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div
            onClick={() => {
              setClickedMenu(!clickMenu);
            }}
            className={styles.hamburgerContainer}
          >
            <img src="/assets/images/Hamburger_icon.svg.png" alt="" />
          </div>
        </div>
      </nav>
      <SignUp show={modalShow} onHide={() => setModalShow(false)} />

      <SignIn show={modalSignIn} onHide={() => setModalSignIn(false)} />
    </>
  );
};
