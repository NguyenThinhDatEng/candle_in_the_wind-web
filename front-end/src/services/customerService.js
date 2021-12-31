import axios from "axios";
const baseUrl = "http://localhost:2021";

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

  return await axios(config);
};

export { handleSignInAPI, handleSignUpAPI };
