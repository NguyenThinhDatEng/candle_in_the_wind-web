import React from "react";
require("dotenv").config();

export default function ContentBlog(props) {
	return (
		<div className="col">
			<div className="post-element mx-5">
				<h4 className="pt-3" > {props.title} </h4>
				<p className="" dangerouslySetInnerHTML={{__html:props?.overview}}  /> 
				<a className="btn btn-dark my-3" href={"/post/" + props.id} >
					Read More
				</a>
			</div>
		</div>
	);
}

