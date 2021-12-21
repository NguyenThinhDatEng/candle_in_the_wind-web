import React, { Component } from 'react'
import CardInfo from "./card.info"
import ChangeInfo from './change.info'
import ChangePassword from './change.password'
import MyOrder from './my.order'
import { useEffect, useState } from 'react';
import Header from "../header/header"
import Footer from '../footer/footer'

export default function Profile(props) {
    const [status, setStatus] = useState(0);

    const displayCheck = () => {
        if (status == 0) {
            return (
                <ChangeInfo />
            );
        }
        else if (status == 1) {
            return (
                <ChangePassword />
            );
        }
        else {
            return (
                <MyOrder />
            );
        }
    }

    return (
        <div>
            <Header />
            <div className="profile">
                <div className="row justify-content-center">
                    <div className="col-md-3 col-sm-6 col-xs-12 card-info">
                        <div>
                            <img className="card-avatar rounded-circle mb-4" src="./assets/images/avatar.jpg" alt="Card_image" style={{ width: '100%' }} />
                            <h4 className="text-center">Harry</h4>
                        </div>
                        <div className="card-body">
                            <div className="row list-change">
                                <li><i className="fas fa-user-edit" /> <a href="#!" onClick={() => setStatus(0)}> Change information </a> </li>
                                <li><i className="fas fa-lock"> </i> <a href="#!" onClick={() => setStatus(1)}> Change password </a> </li>
                                <li><i className="fas fa-file-alt" /> <a href="#!" onClick={() => setStatus(2)}> My orders </a> </li>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 vertical-line"></div>

                    {displayCheck()}

                </div>
            </div>

            <Footer />
        </div>

    )

}
