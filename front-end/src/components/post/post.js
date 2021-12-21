import React from 'react'
import Footer from '../footer/footer'
import Header from '../header/header'
import ContentPost from './content.post'
import axios from 'axios';
import { useEffect, useState } from 'react';
require('dotenv').config();


export default function Post(props) {

    const [data, setData] = useState([]);

    useEffect(async () => {
        const result = await axios(
            process.env.REACT_APP_DB_URL + '/posts/' + props.match.params.id ,
        );
        setData(result.data);
    });

    console.log(props.match);
    const id = props.match.params.id
    return (
        <div>
            <Header />
            <div className="container page-title">
                <p className="text-center py-4">BLOG</p>
            </div>
            {
                <ContentPost id={data.id}
                    title={data.title}
                    publish_at={data.published_at}
                    authorname={data?.customer?.username}
                    content={data.content}
                    image={data?.image?.url}
                />
            }
            <Footer />
        </div>
    )

}

