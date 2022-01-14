import React from "react";
import { getStrapiMedia } from "../../utils";
require("dotenv").config();

export default function ContentBlog(props) {
  return (
    <div className="col">
      <div className="post-element mx-5">
        <img className="mt-3" src={getStrapiMedia(props?.image)} alt="img" />

        <h4> {props?.title} </h4>
        <p className="title-max-length" dangerouslySetInnerHTML={{ __html: props?.overview }}></p>
        <a className="btn btn-dark my-3" href={"/post/" + props?.id}>
          Read More
        </a>
      </div>
    </div>
  );
}
