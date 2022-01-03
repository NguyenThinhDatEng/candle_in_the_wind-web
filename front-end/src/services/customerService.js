import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const handleSignInAPI = async (email, password) => {
  let data = JSON.stringify({
    email,
    password,
  });

  let config = {
    method: "post",
    url: baseUrl + "/customers/login",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: data,
  };

  return await axios(config);
};

const handleSignUpAPI = async (newData) => {
  let gender = newData.gender ? "Male" : "Female";
  let data = JSON.stringify({
    username: newData.username,
    email: newData.email,
    password: newData.password,
    gender: gender,
    dateOfBirth: newData.dateOfBirth,
    phoneNumber: newData.phoneNumber,
  });

  let config = {
    method: "post",
    url: baseUrl + "/customers/signup",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: data,
  };
  console.log(baseUrl);
  return await axios(config);
};

const handleCheckEmail = async (email) => {
  let config = {
    method: "post",
    url: baseUrl + "/customers",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: { email },
  };

  return await axios(config);
};

const handleCheckOTP = async (email, OTP) => {
  let config = {
    method: "post",
    url: baseUrl + "/customers/resetPassword",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: { email, OTP },
  };

  return await axios(config);
};
const handleChangePasswordAPI = async (email, password, newPassword) => {
  let config = {
    method: "post",
    url: baseUrl + "/customers/changePassword",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: { email, password, newPassword },
  };

  return await axios(config);
};
export { handleSignInAPI, handleSignUpAPI, handleCheckEmail, handleCheckOTP, handleChangePasswordAPI };
