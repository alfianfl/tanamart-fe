import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { registerAPI } from "../API/authAPI";
import UseRegister from "../hook/UseRegister";
import "../assets/css/modals.css";
import React from "react";
import swal from "sweetalert";

const Register = (props) => {
  const [
    usernameReg,
    passwordReg,
    confirmPass,
    usernameHandler,
    passwordHandler,
    confirmPassHandler,
  ] = UseRegister();

  // Post Register

  const register = () => {
    if (confirmPass !== passwordReg) {
      swal("password tidak sesuai");
    } else {
      const payload = {
        email: usernameReg,
        password: passwordReg,
      };
      registerAPI
        .post("/signup", payload)
        .then((response) => {
          console.log(response);
          console.log(usernameReg);
          if (response.status === 200) {
            swal({
              title: "Email Yang Kamu Masukan Sudah Terdaftar:)",
              icon: "warning",
              dangerMode: true,
            });
          } else {
            swal({
              title:
                "Akun Kamu Sudah Terdaftar, Silahkan Login Terlebih Dahulu",
              icon: "success",
              button: "Aww yiss!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const enterSumbit = (e) => {
    if (e.keyCode === 13) {
      console.log("enter");
      register();
      props.toggle();
    }
  };

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className="modal-login">
        <ModalHeader
          toggle={props.toggle}
          className="modal-login-header"
          cssModule={{ "modal-title": "w-100 text-center" }}
        >
          <h3>Daftar Sekarang</h3>
        </ModalHeader>
        <ModalBody className="modal-login-body">
          <form className="form">
            <div className="form-group">
              <h5>Email</h5>
              <input
                className="login-input"
                value={usernameReg}
                onChange={usernameHandler}
                type="email"
              />
            </div>

            <div className="form-group">
              <h5>Password</h5>
              <input
                className="login-input"
                value={passwordReg}
                onChange={passwordHandler}
                type="password"
              />
            </div>

            <div className="form-group">
              <h5>Confirm Password</h5>
              <input
                className="login-input"
                value={confirmPass}
                onChange={confirmPassHandler}
                type="password"
                onKeyDown={(e) => enterSumbit(e)}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="modal-login-footer">
          <Button
            type="submit"
            className="login-button"
            onClick={() => {
              register();
              props.toggle();
            }}
          >
            Daftar Sekarang
          </Button>{" "}
          {/* <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Register;
