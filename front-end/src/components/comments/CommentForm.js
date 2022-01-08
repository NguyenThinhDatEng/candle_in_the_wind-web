import { useState } from "react";


export default function CommentForm({
	handleSubmit,
	submitLabel,
	handleCancel,
	initialText = "",
}) {
	const [text, setText] = useState(initialText);
	const isTextareaDisabled = text.length === 0;
	const onSubmit = (event) => {
		event.preventDefault();
		handleSubmit(text);
		setText("");
	};
	return (
		<form onSubmit={onSubmit}>
			<textarea
				className="comment-form-textarea"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button className="btn btn-primary btn-sm shadow-none" disabled={isTextareaDisabled}>
				{submitLabel}
			</button>
			<button
				type="button"
				className="btn btn-outline-primary btn-sm ml-1 shadow-none"
				onClick={handleCancel}
			>
				Cancel
			</button>

		</form>
	);
};

