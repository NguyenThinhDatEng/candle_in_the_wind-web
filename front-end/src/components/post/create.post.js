import React from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { handleCreatePost } from "../../services/customerService";
import axios from 'axios';
require("dotenv").config();


export default function CreatePost() {
    const [state, setState] = useState({
        title: "",
        content: "",
        image: null
    })
    const [formErrors, setFormErrors] = useState("");

    const customer_id = JSON.parse(localStorage.getItem("user-info")).id

    const updateTitle = (e) => {
        setState(previousState => {
            return { ...previousState, title: e.target.value }
        });
    }

    const updateContent = (e) => {
        setState(previousState => {
            return { ...previousState, content: e.target.value }
        });
    }

    const updateImage = (e) => {
        setState(previousState => {
            return { ...previousState, image: e.target.files[0] }
        });
    }

    const handleCreate = async () => {
        // console.log(state.title, state.content, state.image)
        if (!state.title) {
            setFormErrors("Title cannot be empty ")
            console.log(formErrors)
        }
        else if (!state.content) {
            setFormErrors("Content cannot be empty")
            console.log(formErrors)
        }
        else {
            setFormErrors("")
            const formData = new FormData();
            // Update the formData object
            formData.append(
                "files",
                state.image
            );

            // Details of the uploaded file
            let res;
            await axios.post(process.env.REACT_APP_SERVER_URL + "/upload", formData)
                .then((response) => {
                    console.log(response);
                    res = response
                })
            
            console.log(res?.data[0]?._id)
            let data = {
                title: state.title,
                content: state.content,
                image : res?.data[0]?.url,
                customer_id: customer_id
            }

            // console.log(data)
            // await handleCreatePost(data).then((response) => {
            //     console.log(response);
            // })
        }

    }

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
                                <input type="text" className="form-control" name="title" onChange={updateTitle} />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="description">Description</label>
                                <textarea rows={5} className="form-control" name="description" defaultValue={""} onChange={updateContent} />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="formFile" className="form-label">Upload image</label>
                                <input className="form-control" type="file" id="formFile" onChange={updateImage} />
                            </div>
                            <div className="form-group my-5 text-center">
                                <p className='text-danger justify-content-center' > {formErrors} </p>
                                <Link to="#!" type="submit" className="btn btn-dark" onClick={() => handleCreate()} >
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
