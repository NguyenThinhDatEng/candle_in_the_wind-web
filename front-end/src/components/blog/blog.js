import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ContentBlog from "./content.blog";
import Pagination from "./pagination";
import axios from "axios";
import { useEffect, useState } from "react";
require("dotenv").config();

export default function Blog() {
	const [posts, setPost] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(4);


	useEffect(async () => {
		const result = await axios(process.env.REACT_APP_SERVER_URL + "/posts/");
		setPost(result.data);
	});

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	// console.log(indexOfFirstPost, indexOfLastPost)

	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber);

	return (
		<div>
			<Header />

			<div className="container page-title">
				<p className="text-center py-4">BLOG</p>
			</div>

			<div className="container bg-secondary">
				<Link
					to="/create-post"
					type="button"
					className="btn btn-dark fs-4 mt-5 create-post"
				>
					Create a new post
				</Link>

				<div className="clearfix" />
				<div className="row row-cols-1 row-cols-lg-2">
					{currentPosts.map((value, key) => {
						return (
							<ContentBlog
								id={value?._id}
								authorname={value?.created_by?.username}
								title={value?.title}
								image={value?.avatar?.url}
								content={value.content.substring(0, 200) + "..."}
							/>
						);
					})}

				</div>
				<div className="mt-5">
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={posts.length}
						paginate={paginate}
						currentPage={currentPage}
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
}
