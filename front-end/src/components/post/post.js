import React from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Modal from 'react-modal';
import {
	lockCommentAPI,
	deletePostAPI
} from "../../services/postService";
import axios from "axios";
require("dotenv").config();

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

export default function Post(props) {
	const [post, setPost] = useState([]);
	const [comment, setComment] = useState([]);
	const [lock, setLock] = useState(null);
	const [loading, setLoading] = useState(true);
	const [confirm, setConfirm] = useState(false);


	const customer_id = JSON.parse(localStorage.getItem("user-info"))?.id;

	useEffect(async () => {
		const result = await axios(
			process.env.REACT_APP_SERVER_URL + "/posts/" + props.match.params.id
		);
		setPost(result.data);
		setComment(result.data?.comments);
		setLock(post?.lockComment)
		setLoading(false)
	});

	const lockComment = async () => {
		setLoading(true)
		const check = lock;
		await lockCommentAPI(!check, props.match.params.id).then((response) => {
			console.log(response)
		})
	}

	const deletePost = async () => {
		await deletePostAPI(props.match.params.id).then((response) => {
			console.log(response)
		})
	}

	return (
		<div>
			<Header />
			<div className="container page-title">
				<p className="text-center py-4">BLOG</p>
			</div>

			{
				loading ?
					<>
						<div className="clearfix" />
						<div className="d-flex justify-content-center">
							<ReactLoading
								type="spinningBubbles"
								color="black"
								height={200}
								width={100}
							/>
						</div>
					</>
					:
				<>
					<div className="container text-center">
						<div className="post-title ">
							<h1> {post?.title}
								{
									customer_id === post?.customer?.id ?
										<>
											<div className="btn-group float-end">
												<button type="button" className="btn dropdown-toggle btn-primary" data-bs-toggle="dropdown"></button>
												<div class="dropdown-menu " >
													<div className="form-check form-switch dropdown-item " >
														<label className="form-check-label ">Lock Comment</label>
														<input className="form-check-input " type="checkbox" checked={lock} onClick={() => lockComment()} />
													</div>
													<button type="button" className="dropdown-item" onClick={() => setConfirm(true)}> Delete </button>
												</div>
											</div>
										</>
										: null
								}
							</h1>
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
								{
									lock === false ?
										<Comments
											commentData={comment}
											currentUserId={customer_id}
											postId={post?._id}
										/>
										: null
								}
							</div>
						</div>
					</div>
				</>
			}

			<Modal
				isOpen={confirm}
				style={customStyles}
			>

				<p>Are you sure you want to remove post?</p>
				<div className="text-center">
					<Link
						type="button"
						className="btn btn-primary btn-sm shadow-none"
						onClick={() => deletePost()}
						to="/blog"
					>
						Yes
					</Link>
					<button
						type="button"
						className="btn btn-danger btn-sm ml-1 shadow-none"
						onClick={() => setConfirm(false)}
					>
						No
					</button>
				</div>


			</Modal>


			<Footer />
		</div>
	);
}
