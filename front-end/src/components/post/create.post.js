import React from 'react'
import Header from "../header/header"
import Footer from '../footer/footer'
export default function CreatePost() {
    


    return (
        <div>
            <Header />

            <div className="container page-title">
                <p className="text-center py-4">BLOG</p>
            </div>
            <div className="container bg-secondary">
                <div className="row justify-content-center"e>
                    <div className="col-md-8 col-md-offset-2">
                        <h1 className="text-center my-4">Create a new post</h1>
                        <form>
                            <div className="form-group mb-4">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" name="title" />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="description">Description</label>
                                <textarea rows={5} className="form-control" name="description" defaultValue={""} />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="formFile" className="form-label">Upload image</label>
                                <input className="form-control" type="file" id="formFile" />
                            </div>
                            <div className="form-group my-5 text-center">
                                <a href="#!" type="submit" className="btn btn-dark">
                                    Create post
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    )
}
