import axios from "axios";
const baseUrl = "http://localhost:2021";
const { data } = await axios.post(baseUrl + "/posts", {
  title: "my article",
  content: "my super article content",
});

console.log(data);
