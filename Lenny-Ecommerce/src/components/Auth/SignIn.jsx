import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.scss";
import { ButtonPrimary } from "../Button/ButtonPrimary";
import { instance, instance2 } from "../../api";
import { toast } from "react-toastify";
import { userStored } from "./auth";

const initialUser = { identifier: "", password: "" };
export function MyVerticallyCenteredModal(props) {
  const [user, setUser] = React.useState(initialUser);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (user.identifier && user.password) {
        const res = await instance2.post("/auth/local", JSON.stringify(user));
        console.log(res);
        if (res.data.jwt) {
          setUser(res.data);
          toast.success("Logged in successfully", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          userStored(res);
          setTimeout(() => {
            location.reload();
          }, 2000);
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
      <form onSubmit={handleLogin} className={styles.form}>
        <h1>Sign In</h1>

        <label htmlFor="">Email</label>
        <input
          type="email"
          name="identifier"
          placeholder="Enter your mail"
          value={user.identifier}
          onChange={handleChange}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={handleChange}
        />

        <ButtonPrimary text={"Sign In"} sinif={styles.btn} />
      </form>
    </Modal>
  );
}

export function ModalForm() {
  const [modalSignIn, setModalSignIn] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalSignIn(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalSignIn}
        onHide={() => setModalSignIn(false)}
      />
    </>
  );
}
