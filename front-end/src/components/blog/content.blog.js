import React from "react";
require("dotenv").config();

export default function ContentBlog(props) {
	return (
		<div className="col">
			<div className="post-element mx-5">
				<img className="mt-3" src={process.env.REACT_APP_SERVER_URL + props.image} alt="img" />

				<h4 > {props.title} </h4>
				<p> {props.content} </p>
				<a className="btn btn-dark my-3" href={"/post/" + props.title + "." + props.id} >
					Read More
				</a>
			</div>
		</div>
	);
}

