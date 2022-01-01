import React from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { handleSignInAPI } from "../../services/customerService";
import axios from 'axios';
require("dotenv").config();


export default function CreatePost() {
    // const [state, setState] = useState({
    // 	title: "",
    //     content:""
    // });

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)

    // var customer_id
    // useEffect(() => {
    // 	if (localStorage.getItem("user-info")) {
    // 		customer_id = localStorage.getItem("user-info")
    // 	}
    // });

    console.log(image)

    const onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "image",
            image,
            image.name
        );
        axios.post(process.env.REACT_APP_SERVER_URL +  "/api/uploadfile", formData);
    };


    return (
        <div>
            <Header />
            <div className="container page-title">
                <p className="text-center py-4">BLOG</p>
            </div>
            <div className="container bg-secondary">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-md-offset-2">
                        <h1 className="text-center my-4">Create a new post</h1>
                        <form>
                            <div className="form-group mb-4">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" name="title" onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="description">Description</label>
                                <textarea rows={5} className="form-control" name="description" defaultValue={""} onChange={(e) => setContent(e.target.value)} />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="formFile" className="form-label">Upload image</label>
                                <input className="form-control" type="file" id="formFile" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className="form-group my-5 text-center">
                                <Link to="/blog" type="submit" className="btn btn-dark" onClick={() => onFileUpload()}>
                                    Create post
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
