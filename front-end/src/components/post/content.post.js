import React from "react";
import Comment from "./comment"
import { useEffect, useState } from "react";
import axios from 'axios';
require("dotenv").config();


export default function ContentPost(props) {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const result = await axios(
				process.env.REACT_APP_SERVER_URL + "/posts/" + props.id
			);
			setData(result.data.comments);
		}
		fetchData();
	});

	// console.log(data)

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
			<div className="d-flex justify-content-center row">
				<div className="col-md-8">
					<div className="d-flex flex-column comment-section">
						<div className="bg-light p-2">
							{data.map((value) => {
								return (
									<Comment id={value?.customer}
										content={value?.content}
										createdAt={value?.createdAt.substring(0, 10)}
									/>
								);
							})}
							<div className="d-flex flex-row align-items-start">
								<img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width={40} alt="avatar" />
								<textarea className="form-control ml-1 shadow-none textarea" defaultValue={""} />
							</div>
							<div className="mt-2 text-right">
								<button className="btn btn-primary btn-sm shadow-none" type="button">Post comment</button>
								<button className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</div>


		</div>
	);
}
