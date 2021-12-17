import React from 'react'
import Footer from '../footer/footer'
import Header from '../header/header'
import ContentPost from './content.post'
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Post(props) {

    const [data, setData] = useState([]);

    useEffect(async () => {
        const result = await axios(
            'https://admin-workspace.azurewebsites.net/posts/' 
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
                data.map((value, key) => {
                    if (value.id == id) {
                        return (
                            <ContentPost id={value.id}
                                title={value.title}
                                publish_at={value.published_at}
                                authorname={value?.customer?.username}
                                content={value.content}
                                image={value?.image?.url}
                            />
                        )
                    }
                })
            }
            <Footer />
        </div>
    )

}

