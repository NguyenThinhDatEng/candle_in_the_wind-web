import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import ContentBlog from "./content.blog";
import Pagination from "../pagination/pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

require("dotenv").config();

export default function Blog() {
  const [posts, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);

  // var posts = [];

  useEffect(async () => {
    // setLoading(true)
    const result = await axios(process.env.REACT_APP_SERVER_URL + "/posts/");
    setLoading(false);
    setPost(result.data.reverse());
    // posts = result.data.reverse();
  }, []);

  const customer_id = JSON.parse(localStorage.getItem("user-info"))?.id;

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // console.log(loading)
  // console.log(posts)
  return (
    <div
      style={{
        backgroundImage:
          'url("http://images2.fanpop.com/images/photos/4000000/Candle-wallpaper-candles-4091313-1280-1024.jpg")',
      }}
    >
      <Header />
      <div className="container">
        {customer_id ? (
          <Link
            to="/create-post"
            type="button"
            className="btn btn-dark fs-4 mt-5 create-post"
          >
            Create a new post
          </Link>
        ) : null}
        {loading ? (
          <>
            <div className="clearfix" />
            <div className="d-flex justify-content-center">
              <ReactLoading
                type="spinningBubbles"
                color="white"
                height={200}
                width={100}
              />
            </div>
          </>
        ) : (
          <>
            <div className="clearfix" />
            <div className="row row-cols-1">
              {currentPosts.map((value, key) => {
                return (
                  <ContentBlog
                    id={value?._id}
                    title={value?.title}
                    overview={value?.overview}
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
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
