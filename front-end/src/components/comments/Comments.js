import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
	createCommentAPI,
	updateCommentAPI,
	deleteCommentAPI
}
	from "../../services/commentService";

import "./comment.css"



export default function Comments(props) {
	const [backendComments, setBackendComments] = useState([]);

	useEffect(() => {
		setBackendComments(props.commentData)
	})

	// console.log(props.postId)

	const addComment = async (content) => {
		await createCommentAPI(content, props.currentUserId, props.postId).then((response) => {
			console.log(response)
		});
	};

	const updateComment = async (content, commentId) => {
		await updateCommentAPI(content, commentId).then((response) => {
			console.log(response)
		});
	}; 
	const deleteComment = async (commentId) => {
		console.log("is deleting!!")
		await deleteCommentAPI(commentId).then((response) => {
			console.log(response)
		});
	};

	// console.log(props.isChange)
	return (
		<div className="comments">
			<div className="comments-container">
				{backendComments.map((value) => (
					<Comment
						comment={value}
						deleteComment={deleteComment}
						updateComment={updateComment}
						currentUserId={props.currentUserId}
					/>
				))}
			</div>
			{
				!props.lock && <CommentForm submitLabel="Write" handleSubmit={addComment} />
			}
			
		</div>
	);
};


