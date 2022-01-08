import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";

import Comments from "../comments/Comments";
import axios from "axios";
import { useEffect, useState } from "react";
import { createCommentAPI } from "../../services/commentService"
import { getUserInfo } from "../../services/customerService"
require("dotenv").config();

export default function Post(props) {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [comment_input, setCommentInput] = useState("");
  const [formErrors, setFormErrors] = useState("");

  const customer_id = JSON.parse(localStorage.getItem("user-info"))?.id;

  useEffect(async () => {
    const result = await axios(
      process.env.REACT_APP_SERVER_URL + "/posts/" + props.match.params.id
    );
    setPost(result.data);
    setComment(result.data?.comments);
		setCustomer(await getUserInfo(customer_id))
	});

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
						Post on {new Date(post?.published_at).toLocaleDateString()}_{post?.customer?.username}
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
						{/* {
							post.lockComment === false ? (comment.map((value) => {
								return (
									<Comment
										comment_id = {value?._id}
										customer_id={value?.customer}
										content={value?.content}
										createdAt={value?.createdAt?.substring(0, 10)}
										handleDelete={() => handleDelete(value?._id)}
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
						} */}
						{
							post.lockComment === false ?
								<Comments
									commentData={comment}
									currentUserId={customer_id}
									postId = {post?._id}
								/>
								: null
						}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
