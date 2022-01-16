import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createPostAPI } from "../../services/postService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor-build-with-simple-upload-provider-strapi";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
require("dotenv").config();


export default function CreatePost() {
	const [state, setState] = useState({
		title: "",
		content: "",
		overview: ""
	});
	const [formErrors, setFormErrors] = useState("");

	const customer_id = JSON.parse(localStorage.getItem("user-info"))?.id;

	const updateTitle = (e) => {
		setState((previousState) => {
			return { ...previousState, title: e.target.value };
		});
	};

	const updateContent = (e, editor) => {
		// console.log(editor)
		// console.log(e.target.files[0])
		setState((previousState) => {
			return { ...previousState, content: editor.getData().replace("/uploads", "http://localhost:2021/uploads") };
		});

		console.log(state.content);
	};

	const updateOveriew = (e) => {
		setState((previousState) => {
			return { ...previousState, overview: e.target.value };
		});
	};

	const createPost = async () => {
		// console.log(state.title, state.content, state.image)
		if (!state.title) {
			setFormErrors("Title cannot be empty ");
			console.log(formErrors);
		} else if (!state.content) {
			setFormErrors("Content cannot be empty");
			console.log(formErrors);
		} else {
			setFormErrors("");
			let data = {
				title: state.title,
				content: state.content,
				overview: state.overview,
				customer_id: customer_id,
			};

			console.log(data);
			await createPostAPI(data).then((response) => {
				console.log(response);
			});
		}
	};

	return (
		<div>
			<Header />
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8 col-md-offset-2">
						<h1 className="text-center my-4">Create a new post</h1>
						<form>
							<div className="form-group mb-4">
								<label htmlFor="title">Title</label>
								<input
									type="text"
									className="form-control"
									name="title"
									onChange={updateTitle}
								/>
							</div>

							<div>
								<article>Content</article>
								<CKEditor
									editor={ClassicEditor}
									config={{
										simpleUpload: {
											uploadUrl: process.env.REACT_APP_SERVER_URL + "/upload",
										},
									}}
									onChange={updateContent}
								/>
						
								{/* {ReactHtmlParser(state.content)} */}
							</div>
							<div className="form-group mb-4">
								<label htmlFor="description">Overview</label>
								<textarea
									rows={5}
									className="form-control"
									defaultValue={""}
									onChange={updateOveriew}
								/>
							</div>
							<div className="form-group my-5 text-center">
								<p className="text-danger justify-content-center">
									{" "}
									{formErrors}{" "}
								</p>
								<Link
									to="/blog"
									type="submit"
									className="btn btn-dark"
									onClick={() => createPost()}
								>
									Create post
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
