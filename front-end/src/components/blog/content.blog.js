// import React from "react";
// require("dotenv").config();

// export default function ContentBlog({ posts }) {
// 	return (
// 		<div className="col">
// 			<div className="post-element mx-5">
// 				{
// 					posts.map((post) => {
// 						return (
// 							<>
// 								<img className="mt-3" src={process.env.REACT_APP_SERVER_URL + post?.avatar?.url} alt="photo" />
// 								<h4 className> {post?.title} </h4>
// 								<p> {post?.content} </p>
// 								<a className="btn btn-dark my-3" href={"/post/" + post?.title + "." + post?._id}> Read More </a>
// 							</>

// 						);
// 					})
// 				}
// 				{/* <img className="mt-3" src={process.env.REACT_APP_SERVER_URL + props.image} alt="photo" />
// 				<h4 className> {props.title} </h4>
// 				<p> {props.content} </p>
// 				<a className="btn btn-dark my-3" href={"/post/" + props.title + "." + props.id}> Read More </a> */}
// 			</div>
// 		</div>
// 	);
// }

import React from "react";
require("dotenv").config();

export default function ContentBlog(props) {
	return (
		<div className="col">
			<div className="post-element mx-5">
				<img className="mt-3" src={process.env.REACT_APP_SERVER_URL + props.image} alt="img" />

				<h4 className> {props.title} </h4>
				<p> {props.content} </p>
				<a className="btn btn-dark my-3" href={"/post/" + props.title + "." + props.id} >
					Read More
				</a>
			</div>
		</div>
	);
}

