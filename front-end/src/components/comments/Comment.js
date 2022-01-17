import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import Modal from 'react-modal';

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

export default function Comment({
	comment,
	updateComment,
	deleteComment,
	currentUserId,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const createdAt = new Date(comment?.createdAt).toLocaleDateString("en-GB");
	const [confirm, setConfirm] = useState(false);

	const isAuth = JSON.parse(localStorage.getItem("user-info"));

	// console.log(comment)
	return (
		<div>
			<div class="bg-white p-2">
				<div class="d-flex flex-row ">
					<img class="rounded-circle"
						src={comment?.url ?
							process.env.REACT_APP_SERVER_URL + comment?.url :
							isAuth.gender == "Male" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZWD0TQ9XGBl9RL_wGTfib6U7S4pAz6I98MyySh59epBK7xv_h0yBscGKzk4OD9_sUaJc&usqp=CAU" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz4K_mIw-8wEuEdqQ88J9qfamhXsHovW_qZkB8TzlRmNxp1O6H6J9W84LU-gr1nImZiOc&usqp=CAU"} width="40" />
					<div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name"> {comment?.username} </span><span class="date text-black-50">Shared publicly - {createdAt} </span></div>
				</div>
				{!isEditing && <div className="comment-text">{comment?.content}</div>}
				{
					isEditing && (
						<CommentForm
							submitLabel="Update"
							initialText={comment.content}
							handleSubmit={(text) => {
								updateComment(text, comment?.id);
								setIsEditing(false)
							}}
							handleCancel={() => {
								setIsEditing(false)
							}}
						/>
					)
				}
				<div className="comment-actions">
					{isAuth.username === comment?.username && (
						<>
							<div
								className="comment-action"
								onClick={() => setIsEditing(true)}
							>
								Edit
							</div>

							<div
								className="comment-action"
								onClick={() => setConfirm(true)}
							>
								Delete
							</div>
						</>

					)}
				</div>

				<Modal
					isOpen={confirm}
					style={customStyles}
				>

					<p>Are you sure you want to remove comment?</p>
					<div className="text-center">
						<button
							type="button"
							className="btn btn-primary btn-sm shadow-none"
							onClick={() =>{
								deleteComment(comment?.id);
								setConfirm(false)
							} }
						>
							Yes
						</button>
						<button
							type="button"
							className="btn btn-danger btn-sm ml-1 shadow-none"
							onClick={() => setConfirm(false)}
						>
							No
						</button>
					</div>


				</Modal>

			</div>
		</div>



	);
};

