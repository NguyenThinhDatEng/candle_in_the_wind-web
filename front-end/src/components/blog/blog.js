import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Header from "../header/header"
import Footer from '../footer/footer'
import ContentBlog from './content.blog';
import axios from 'axios';
import { useEffect, useState } from 'react';
require("dotenv").config();

export default function Blog() {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const result = await axios(
            process.env.REACT_APP_DB_URL + '/posts/' ,
        );
        setData(result.data);
    });

    console.log(process.env.BASE_URL)

    return (

        <div>
            <Header />

            <div className="container page-title">
                <p className="text-center py-4">BLOG</p>
            </div>

            <div className="container bg-secondary">
                <Link to="/create-post" type="button" className="btn btn-dark fs-4 mt-5 create-post">
                    Create a new post
                </Link  >

                <div className="clearfix" />
                <div className="row row-cols-1 row-cols-lg-2">
                    {
                        data.map((value, key) => {
                            return (
                                <ContentBlog id={value.id}
                                    authorname={value?.customer?.username}
                                    title={value.title}
                                    image={value?.image?.url}
                                    content={value.content.substring(0, 200) + "..."}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )

}