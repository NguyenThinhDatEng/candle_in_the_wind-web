import React from 'react'
import { Link } from 'react-router-dom'

export default function ContentBlog(props) {
    return (
        <div className="col">
            <div className="post-element mx-5">
                <img className="mt-3" src={"https://admin-workspace.azurewebsites.net/" + props.image} alt="photo" />
                <h5 className="text-start mt-3"><i className="fas fa-user-circle" /> {props.authorname} </h5>
                <h4 className> {props.title} </h4>
                <p > {props.content} </p>
                <a className="btn btn-dark my-3" href={"/post/" + props.title + "." + props.id } >Read More</a>
            </div>
        </div>
    )
}
