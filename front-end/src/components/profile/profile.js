import React, { Component } from 'react'
import CardInfo from "./card.info"
import ChangeInfo from './change.info'
import ChangePassword from './change.password'
import MyOrder from './my.order'
import Header from "../header/header"
import Footer from '../footer/footer'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trangThai: 0
        }
    }

    renderChangeInfo() {
        return (
            <ChangeInfo />
        );
    }

    renderChangePassword() {
        return (
            <ChangePassword />
        );
    }

    renderMyOrder() {
        return (
            <MyOrder />
        );
    }

    displayCheck() {
        if (this.state.trangThai === 0) {
            return this.renderChangeInfo();
        }
        else if (this.state.trangThai === 1) {
            return this.renderChangePassword();
        }
        else {
            return this.renderMyOrder();
        }
    }

    changeInfo() {
        this.setState({ trangThai: 0 })
    }

    changePass() {
        this.setState({ trangThai: 1 })
    }

    showOrder() {
        this.setState({ trangThai: 2 })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="profile">
                    <div className="row justify-content-center">
                        <CardInfo
                            changeInfo={() => this.changeInfo()}
                            changePass={() => this.changePass()}
                            showOrder={() => this.showOrder()}
                        />
                        <div className="col-1 vertical-line"></div>

                        {this.displayCheck()}

                    </div>
                </div>

                <Footer />
            </div>

        )
    }
}
