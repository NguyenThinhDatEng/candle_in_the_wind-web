import React from 'react'


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
                <img className="mb-5" src={"https://admin-workspace.azurewebsites.net/" + props.image} alt="" style={{ width: '50%' }} />
            </div>
        </div>
    )
}
