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
	const [customer, setCustomer] = useState([])

	useEffect(async () => {
		setCustomer(await getUserInfo(comment?.customer))
	})
	// console.log(customer)
	return (
		<div>
			<div class="bg-white p-2">
				<div class="d-flex flex-row user-info"><img class="rounded-circle" src={process.env.REACT_APP_SERVER_URL + customer?.avatar?.url} width="40" />
					<div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name"> {customer?.username} </span><span class="date text-black-50">Shared publicly - {createdAt} </span></div>
				</div>
				{!isEditing && <div className="comment-text">{comment?.content}</div>}
				{
					isEditing && (
						<CommentForm
							submitLabel="Update"
							initialText={comment.content}
							handleSubmit={(text) => {updateComment(text, comment?._id);
													setIsEditing(false)}}
							handleCancel={() => {
								setIsEditing(false)
							}}
						/>
					)
				}
				<div className="comment-actions">
					{currentUserId === comment?.customer && (
						<>
							<div
								className="comment-action"
								onClick={() => setIsEditing(true)}
							>
								Edit
							</div>

							<div
								className="comment-action"
								onClick={() => deleteComment(comment._id)}
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

