

import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
require("dotenv").config();

export default function Infor() {
    const isAuth = () => {

        if (localStorage.getItem("user-info")) {
            return JSON.parse(localStorage.getItem("user-info"));
        } else {
            return false;
        }
    }
    const id = isAuth() ? isAuth().id : '';


    return (
        <div className="col-md-3 col-sm-6 col-xs-12 change-form">
            <h3 className="my-4 text-center"> Personal information</h3>
            <div className="form-group row my-4">
                <div class="row">
                    <div class="col-sm-4">
                        <h6 class="mb-0">Username</h6>
                    </div>
                    <div class="col-sm-8">
                        {isAuth().username}
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="form-group row my-4">
                <div class="row">
                    <div class="col-sm-4">
                        <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-8">
                        {isAuth().email}
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="form-group row my-4">
                <div class="row">
                    <div class="col-sm-4">
                        <h6 class="mb-0">Gender</h6>
                    </div>
                    <div class="col-sm-8">
                        {isAuth().gender}
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="form-group row my-4">
                <div class="row">
                    <div class="col-sm-4">
                        <h6 class="mb-0">Date Of Birth</h6>
                    </div>
                    <div class="col-sm-8">
                        {isAuth().dateOfBirth}
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="form-group row my-4">
                <div class="row">
                    <div class="col-sm-4">
                        <h6 class="mb-0">Phone Number</h6>
                    </div>
                    <div class="col-sm-8">
                        {isAuth().phoneNumber}
                    </div>
                </div>
            </div>
            <hr></hr>
            {/* <div className="form-group row text-center">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary ">Done</button>
                    </div>
                </div> */}
        </div>

    )
}

