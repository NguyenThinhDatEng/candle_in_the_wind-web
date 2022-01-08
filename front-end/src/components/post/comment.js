import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import "./comment.css";
require("dotenv").config();

export default function Comment(props) {
    const [customer, setCustomer] = useState([]);
    const [comment, setComment] = useState([]);

    const user_id = JSON.parse(localStorage.getItem("user-info"))?.id

    useEffect(async () => {
        const result = await axios(
            process.env.REACT_APP_SERVER_URL + "/customers/" + props.customer_id
        );
        setCustomer(result.data);

        const result2 = await axios(
            process.env.REACT_APP_SERVER_URL + "/comments/" + props.comment_id
        );
        setComment(result2.data);
    });

    return (
        <div>
            <div class="bg-white p-2">
                <div class="d-flex flex-row user-info"><img class="rounded-circle" src={process.env.REACT_APP_SERVER_URL + customer?.avatar?.url} width="40" />
                    <div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name"> {customer?.username} </span><span class="date text-black-50">Shared publicly - {props.createdAt} </span></div>
                </div>
                <div class="mt-2">
                    <p class="comment-text"> {props.content} </p>
                </div>
                {
                    (user_id === comment?.customer?.id) ?
                        <>
                            <div className="comment-actions">
                                <div className="comment-action">Edit</div>
                                <div className="comment-action" onClick={props.handleDelete}>Delete</div>
                            </div>
                        </>
                        : null
                }

            </div>
        </div>
    )
}
