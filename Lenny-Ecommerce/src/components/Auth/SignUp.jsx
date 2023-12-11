import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.scss";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import { instance, instance2 } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userStored } from "./auth";


const initialUser = { username: "", email: "", password: "" };
export function MyVerticallyCenteredModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      if (user.username && user.email && user.password) {
        const res = await instance2.post(
          "/auth/local/register",
          JSON.stringify(user)
        );
        if (res) {
          toast.success("Signed up Successfully");
          console.log(res);
          setUser(initialUser);
          setTimeout(() => {
            location.reload();
          }, 2000);
          userStored(res)
          
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={handleSignUp} className={styles.form}>
        <h1>Sign Up</h1>
        <label htmlFor="">Name</label>
        <input
          name="username"
          onChange={handleChange}
          type="text"
          value={user.username}
          placeholder="Enter your name"
        />
        <label htmlFor="">Email</label>
        <input
          name="email"
          onChange={handleChange}
          type="email"
          value={user.email}
          placeholder="Enter your email"
        />
        <label htmlFor="">Password</label>
        <input
          name="password"
          onChange={handleChange}
          type="password"
          value={user.password}
          placeholder="Enter your password"
        />

        <ButtonPrimary text={"Sign Up"} sinif={styles.btn} />
      </form>
    </Modal>
  );
}

export function ModalForm() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
