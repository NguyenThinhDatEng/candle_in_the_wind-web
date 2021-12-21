import axios from 'axios';

const id = "6198a1bf1f77dd39e0429988"
const {data}  = await axios.get(
    'https://admin-workspace.azurewebsites.net/posts/' 
);

console.log(data);