import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import UseLogin from "../hook/UseLogin";
import "../assets/css/modals.css";
import { loginAPI } from "../API/authAPI";
import { useState, useEffect } from "react";

function Login(props) {
  const [username, password, usernameHandler, passwordHandler] = UseLogin();
  const [userId, setUserId] = useState(() => {
    const localData = localStorage.getItem("id");
    return localData ? JSON.parse(localData) : null;
  });

  // post login
  const login = () => {
    const payload = {
      email: username,
      password: password,
    };
    loginAPI
      .post("/login", payload)
      .then((response) => {
        const passErr = response.data.passwordErrors;
        if (response.data.user) {
          if (passErr) {
            console.log(passErr);
            alert(passErr);
          } else {
            alert("Selamat anda berhasil login!!!");
            console.log(response);
            setUserId(response.data.user);
          }
        } else {
          console.log(response.data.emailErrors);
          alert(response.data.emailErrors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    props.getId(userId);
    localStorage.setItem("id", JSON.stringify(userId));
  }, [userId, props]);

  return (
    <Modal isOpen={props.modal} toggle={props.toggle} className="modal-login">
      <ModalHeader
        toggle={props.toggle}
        className="modal-login-header"
        cssModule={{ "modal-title": "w-100 text-center" }}
      >
        <h3>Login</h3>
      </ModalHeader>
      <ModalBody className="modal-login-body">
        <form>
          <div className="form-group">
            <h5>Email</h5>
            <input
              className="login-input"
              value={username}
              onChange={usernameHandler}
              type="email"
            />
          </div>
          <div className="form-group">
            <h5>Password</h5>
            <input
              className="login-input"
              value={password}
              onChange={passwordHandler}
              type="password"
            />
          </div>
          {userId}
        </form>
      </ModalBody>
      <ModalFooter className="modal-login-footer">
        <Button
          className="login-button"
          onClick={() => {
            login();
            props.toggle();
          }}
        >
          Login
        </Button>{" "}
        {/* <Button color="secondary" onClick={props.toggle}>Cancel</Button> */}
      </ModalFooter>
    </Modal>
  );
}

export default Login;
