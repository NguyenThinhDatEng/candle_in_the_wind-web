import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const createPostAPI = async (newData) => {
    let data = JSON.stringify({
        title: newData.title,
        content: newData.content,
        overview: newData.overview,
        customer: newData.customer_id,
        published_at:""
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
    console.log(data);
    return await axios(config);
};

const lockCommentAPI = async (lock, id) => {
    let data = JSON.stringify({
        "lockComment": lock,
    });

    let config = {
        method: "put",
        url: baseUrl + "/posts/" + id,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        data: data,
    };
    console.log(lock, id);
    return await axios(config);
}

const deletePostAPI = async (id) => {
    console.log(id)
    let config = {
        method: "delete",
        url: baseUrl + "/posts/" + id,
    };

    return await axios(config);

}

export {
    createPostAPI,
    lockCommentAPI,
    deletePostAPI
};
