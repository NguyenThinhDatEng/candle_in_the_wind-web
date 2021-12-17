import axios from 'axios';

const id = "619bae0a51bc1b390cf3d537"
const { data } = await axios.get(
    `https://admin-workspace.azurewebsites.net/products/${id}`
);
var obj = {
    display: data.display,
    name: data.name,
    id: data.id,
    imageUrl: `https://admin-workspace.azurewebsites.net${data.image[0].url}`
}

console.log(data);