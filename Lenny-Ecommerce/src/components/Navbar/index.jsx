import React, { useEffect } from "react";
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
export const Navbar = () => {
  const [clickMenu, setClickedMenu] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [modalSignIn, setModalSignIn] = React.useState(false);

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
    toast.success('Signed out successfully');
    
  };

  React.useEffect(() => {
    async function getAllCategories() {
      const {
        data: { data },
      } = await getCategories();
      setCategories(data);

      console.log(userData());
    }

    getAllCategories();
  }, []);

  return (
    <>
      <nav>
        <Link to="/">
          <div className={styles.logoContainer}>
            <img src="/src/assets/images/Logo.svg" />
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
          <div className={styles.cartContainer}>
            <img src="/src/assets/images/cart.svg" alt="" />
          </div>
          <div className={styles.line}></div>

          <div className={styles.profileContainer}>
            <img src="/src/assets/images/profile.svg" alt="" />
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
                <Link onClick={handleSignOut} className={styles.userLink}>
                  Sign out
                </Link>
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
            <img src="/src/assets/images/Hamburger_icon.svg.png" alt="" />
          </div>
        </div>
      </nav>
      <SignUp show={modalShow} onHide={() => setModalShow(false)} />

      <SignIn show={modalSignIn} onHide={() => setModalSignIn(false)} />
    </>
  );
};
