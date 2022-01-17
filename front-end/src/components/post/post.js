import React from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Modal from "react-modal";
import { lockCommentAPI, deletePostAPI } from "../../services/postService";
import axios from "axios";
require("dotenv").config();

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

export default function Post(props) {
	const [post, setPost] = useState([]);
	const [comment, setComment] = useState([]);
	const [lock, setLock] = useState(null);
	const [loading, setLoading] = useState(true);
	const [confirm, setConfirm] = useState(false);

	const customer_id = JSON.parse(localStorage.getItem("user-info"))?.id;
	const customer_name = JSON.parse(localStorage.getItem("user-info"))?.username;

	useEffect(async () => {
		const result = await axios(
			process.env.REACT_APP_SERVER_URL + "/posts/" + props.match.params.id
		);
		// console.log(result)
		setPost(result.data);
		setComment(result.data?.comments);
		setLock(post?.lockComment);
		setLoading(false);
	}, [post]);

	const lockComment = async () => {
		setLoading(true);
		const check = lock;
		await lockCommentAPI(!check, props.match.params.id).then((response) => {
			console.log(response);
		});
	};

	const deletePost = async () => {
		await deletePostAPI(props.match.params.id).then((response) => {
			console.log(response);
		});

		// await axios.delete(process.env.REACT_APP_SERVER_URL + "upload")
	};

	// console.log(lock ===false)
	// console.log(post?.username , customer_name)
	// console.log((customer_name === post?.username) && (customer_name != undefined))

	return (
		<div style={{overflow:"hidden"}}>
			<Header />

			{loading ? (
				<>
					<div className="clearfix" />
					<div className="d-flex justify-content-center">
						<ReactLoading
							type="spinningBubbles"
							color="black"
							height={300}
							width={100}
						/>
					</div>
				</>
			) : (
				<>
					<div className="container ">
						<div className="post-title text-center mx-5">
							<h1>
								{" "}
								{post?.title}
								{customer_name === post?.username &&
									customer_name != undefined ? (
									<>
										<div className="btn-group float-end">
											<button
												type="button"
												className="btn dropdown-toggle btn-primary"
												data-bs-toggle="dropdown"
											></button>
											<div class="dropdown-menu ">
 												<button
													type="button"
													className="dropdown-item"
													onClick={() => lockComment()}
												>
													{" "}
													{lock ? "Unlock" : "Lock"}{" "}
												</button>
												
												<button
													type="button"
													className="dropdown-item"
													onClick={() => setConfirm(true)}
												>
													{" "}
													Delete{" "}
												</button>
											</div>
										</div>
									</>
								) : null}
							</h1>

							<p>
								Post on {new Date(post?.published_at).toLocaleDateString("en-GB")}_
								{post?.username}
							</p>
						</div>
						<p
							className="post-content mx-auto"
							dangerouslySetInnerHTML={{ __html: post?.content }}
						/>
					</div>
					<div class="d-flex justify-content-center row">
						<div class="col-md-8">
							<div class="d-flex flex-column comment-section">
								{
									<Comments
										commentData={comment}
										currentUserId={customer_id}
										postId={props.match.params.id}
										lock={lock}
									/>
								}
							</div>
						</div>
					</div>
				</>
			)}

			<Modal isOpen={confirm} style={customStyles}>
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
