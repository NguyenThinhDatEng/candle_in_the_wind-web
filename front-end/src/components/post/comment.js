import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import "./comment.css"


export default function Comment(props) {
    const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const result = await axios(
				process.env.REACT_APP_SERVER_URL + "/customers/" + props.id
			);
			setData(result.data);
		}
		fetchData();
	});

    // console.log(data)
    return (
        <div>
            <div className="bg-white p-2">
                <div className="d-flex flex-row user-info"><img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width={40} />
                    <div className="d-flex flex-column justify-content-start ml-2"> {data.username} <span className="d-block font-weight-bold name"> </span><span className="date text-black-50">Shared publicly - {props.createdAt}</span></div>
                </div>
                <div className="mt-2">
                    <p className="comment-text"> {props.content} </p>
                </div>
            </div>

        </div>
    )
}
