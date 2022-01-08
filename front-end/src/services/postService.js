import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const handleCreatePost = async (newData) => {
  let data = JSON.stringify({
    title: newData.title,
    content: newData.content,
    avatar: {
      _id: newData.image_id,
    },
    customer: {
      _id: newData.customer_id,
    },
  });

  let config = {
    method: "post",
    url: baseUrl + "/posts",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: data,
  };
  // console.log(data);
  return await axios(config);
};

const handleCommentAPI = async (newData) => {
  let data = JSON.stringify({
    content: newData.content,
    customer: {
      _id: newData.customer_id,
    },
    post: {
      _id: newData.post_id,
    },
  });

  let config = {
    method: "post",
    url: baseUrl + "/comments",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: data,
  };
  console.log(data);
  return await axios(config);
};

export { handleCommentAPI, handleCreatePost };
