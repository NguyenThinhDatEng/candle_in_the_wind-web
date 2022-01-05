import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import Comment from "./comment"
import axios from "axios";
import { useEffect, useState } from "react";
import { handleCommentAPI } from "../../services/customerService";
require("dotenv").config();

export default function Post(props) {
	const [post, setPost] = useState([]);
	const [comment, setComment] = useState([]);
	const [customer, setCustomer] = useState([]);
	const [comment_input, setCommentInput] = useState("");
	const [formErrors, setFormErrors] = useState("");

	const customer_id = JSON.parse(localStorage.getItem("user-info"))?.id

	useEffect(async () => {
		const result = await axios(
			process.env.REACT_APP_SERVER_URL + "/posts/" + props.match.params.id
		);
		setPost(result.data);
		setComment(result.data?.comments)

		const result2 = await axios(
			process.env.REACT_APP_SERVER_URL + "/customers/" + customer_id
		);
		setCustomer(result2.data)
	});
	
	const handleComment = async () => {
		console.log(comment_input)
		if (comment_input === "") {
			setFormErrors("Comment cannot be empty")
			console.log(formErrors)
		}
		else {
			try {
				
				let dataComment = {
					content: comment_input,
					customer_id: customer_id,
					post_id: props.match.params.id
				}

				// console.log(dataComent)
				await handleCommentAPI(dataComment).then((response) => {
					console.log(response);
				})

				setFormErrors(null)
				setCommentInput("")

			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<div>
			<Header />
			<div className="container page-title">
				<p className="text-center py-4">BLOG</p>
			</div>

			<div className="container text-center">
				<div className="post-title ">
					<h1> {post?.title} </h1>
					<p>
						Post on {post?.published_at?.substring(0, 10)}_{post?.customer?.username}
					</p>
				</div>
				<p className="post-content mx-auto">{post?.content}</p>
				<img
					className="mb-5"
					src={process.env.REACT_APP_SERVER_URL + post?.avatar?.url}
					alt=""
					style={{ width: "50%" }}
				/>
			</div>
			<div class="d-flex justify-content-center row">
				<div class="col-md-8">
					<div class="d-flex flex-column comment-section">
						{
							post.lockComment === false ? (comment.map((value) => {
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
						{
							customer_id ?  (
								<div class="bg-light p-2">
									<div class="d-flex flex-row align-items-start">
										<img class="rounded-circle" src={process.env.REACT_APP_SERVER_URL + customer?.avatar?.url} width="40" />
										<textarea class="form-control ml-1 shadow-none textarea" type="input" value={comment_input} onChange={(e) => setCommentInput(e.target.value)} />
									</div>
									<div class="mt-2 text-right">
										<p style={{color:"red"}}> {formErrors} </p>
										<button class="btn btn-primary btn-sm shadow-none" type="button" onClick={() => handleComment()}>Post comment</button>
										<button class="btn btn-outline-primary btn-sm ml-1 shadow-none"  type="button" onClick={() => {setCommentInput("")}} >Cancel</button>
				
									</div>
								</div>
							) : null
						}

					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
