import React from 'react'
require('dotenv').config();

export default function ContentPost(props) {
    return (
        <div>
            <div className="container text-center">
                <div className="post-title ">
                    <h1> {props.title} </h1>
                    <p>Post on {props.publish_at}_{props.authorname} </p>
                </div>
                <p className="post-content mx-auto">
                    {props.content}
                </p>
                <img className="mb-5" src={process.env.REACT_APP_DB_URL + props.image} alt="" style={{ width: '50%' }} />
            </div>
        </div>
    )
}
