import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { getUserInfo } from "../../services/customerService";
// import "./comment.css"

export default function Comment({
	comment,
	updateComment,
	deleteComment,
	currentUserId,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const createdAt = new Date(comment?.createdAt).toLocaleDateString();

	const customer_name = JSON.parse(localStorage.getItem("user-info"))?.username;

	// console.log(comment)
	return (
		<div>
			<div class="bg-white p-2">
				<div class="d-flex flex-row "><img class="rounded-circle" src={process.env.REACT_APP_SERVER_URL + comment?.url} width="40" />
					<div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name"> {comment?.username} </span><span class="date text-black-50">Shared publicly - {createdAt} </span></div>
				</div>
				{!isEditing && <div className="comment-text">{comment?.content}</div>}
				{
					isEditing && (
						<CommentForm
							submitLabel="Update"
							initialText={comment.content}
							handleSubmit={(text) => {updateComment(text, comment?.id);
													setIsEditing(false)}}
							handleCancel={() => {
								setIsEditing(false)
							}}
						/>
					)
				}
				<div className="comment-actions">
					{customer_name === comment?.username && (
						<>
							<div
								className="comment-action"
								onClick={() => setIsEditing(true)}
							>
								Edit
							</div>

							<div
								className="comment-action"
								onClick={() => deleteComment(comment?.id)}
							>
								Delete
							</div>
						</>

					)}
				</div>

			</div>
		</div>



	);
};

