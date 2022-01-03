import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import ContentPost from "./content.post";
import axios from "axios";
import { useEffect, useState } from "react";
require("dotenv").config();

export default function Post(props) {
	const [data, setData] = useState([]);

	useEffect(async () => {
		const result = await axios(
			process.env.REACT_APP_SERVER_URL + "/posts/" + props.match.params.id
		);
		setData(result.data);
	});

	// console.log(data);
	return (
		<div>
			<Header />
			<div className="container page-title">
				<p className="text-center py-4">BLOG</p>
			</div>
			{
				<ContentPost
					id={data._id}
					title={data.title}
					publish_at={data?.published_at?.substring(0, 10)}
					authorname={data?.created_by?.firstname + " " + data?.created_by?.lastname}
					content={data.content}
					image={data?.avatar?.url}
					lockComment = {data?.lockComment}
				/>
			}
			<Footer />
		</div>
	);
}
