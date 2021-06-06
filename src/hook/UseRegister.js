import { useState } from "react";

function UseRegister() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [cfrmpasswordReg, setCfrmpasswordReg] = useState("");

  const usernameHandler = (e) => {
    setUsernameReg(e.target.value);
  };
  const passwordHandler = (e) => {
    setPasswordReg(e.target.value);
  };
  const confirmPassword = (e) => {
    setCfrmpasswordReg(e.target.value);
  };
  return [
    usernameReg,
    passwordReg,
    cfrmpasswordReg,
    usernameHandler,
    passwordHandler,
    confirmPassword,
  ];
}

export default UseRegister;
