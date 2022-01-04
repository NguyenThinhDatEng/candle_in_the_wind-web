import React from "react";
import axios from "axios";
import Comment from "./comment";
import { useEffect, useState } from "react";
import "./comment.css"
require("dotenv").config();

export default function ContentPost(props) {
	const [data, setData] = useState([]);

	useEffect(async () => {
		const result = await axios(
			process.env.REACT_APP_SERVER_URL + "/posts/" + props.id
		);
		setData(result.data.comments);
	});

	console.log(props.lockComment)
	return (
		<div>
			<div className="container text-center">
				<div className="post-title ">
					<h1> {props.title} </h1>
					<p>
						Post on {props.publish_at}_{props.authorname}{" "}
					</p>
				</div>
				<p className="post-content mx-auto">{props.content}</p>
				<img
					className="mb-5"
					src={process.env.REACT_APP_SERVER_URL + props.image}
					alt=""
					style={{ width: "50%" }}
				/>
			</div>
			<div class="d-flex justify-content-center row">
				<div class="col-md-8">
					<div class="d-flex flex-column comment-section">
						{
							props.lockComment === false ? (data.map((value) => {
									return (
										<Comment
											id={value?.customer}
											content={value?.content}
											createdAt={value?.createdAt?.substring(0, 10)}
										/>
									)
								})
							) : null
						}

						<div class="bg-light p-2">
							<div class="d-flex flex-row align-items-start"><img class="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40" /><textarea class="form-control ml-1 shadow-none textarea"></textarea></div>
							<div class="mt-2 text-right"><button class="btn btn-primary btn-sm shadow-none" type="button">Post comment</button><button class="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
