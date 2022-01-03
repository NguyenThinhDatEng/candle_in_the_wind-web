import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
require("dotenv").config();

export default function Comment(props) {
    const [data, setData] = useState([]);

	useEffect(async () => {
		const result = await axios(
			process.env.REACT_APP_SERVER_URL + "/customers/" + props.id
		);
		setData(result.data);
	});

    // console.log(data)
    return (
        <div>
            <div class="bg-white p-2">
                <div class="d-flex flex-row user-info"><img class="rounded-circle" src={process.env.REACT_APP_SERVER_URL + data?.avatar?.url} width="40" />
                    <div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name"> {data?.username} </span><span class="date text-black-50">Shared publicly - {props.createdAt} </span></div>
                </div>
                <div class="mt-2">
                    <p class="comment-text"> {props.content} </p>
                </div>
            </div>
        </div>
    )
}
