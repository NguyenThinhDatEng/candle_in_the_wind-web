import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const createCommentAPI = async (content, customerId, postId) => {
	let data = JSON.stringify({
		"content": content,
		"customer": {
			"_id": customerId
		},
		"post": {
			"_id": postId
		}
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
	console.log(data)

	return (await axios(config)).data;
};

const updateCommentAPI = async (content, id) => {
	let data = JSON.stringify({
		"content": content,
	});

	let config = {
		method: "put",
		url: baseUrl + "/comments/" + id,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		data: data,
	};
	console.log(data, id);
	return await axios(config);
}

const deleteCommentAPI = async (id) => {
	console.log(id)
	let config = {
		method: "delete",
		url: baseUrl + "/comments/" + id,
	};

	return await axios(config);
}

export {
    createCommentAPI,
	updateCommentAPI,
	deleteCommentAPI
};