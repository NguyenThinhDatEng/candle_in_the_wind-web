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
  // .then((response) => {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};

export { handleSignInAPI };
