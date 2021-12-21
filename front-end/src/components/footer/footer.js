import React from 'react'

export default function Footer() {
    return (
        <div className="footerContainer">
            <div className="openingTime">
                <h3>Opening time</h3>
                <h5>Morning: 8:00 a.m to 11:30 a.m</h5>
                <h5>Affternoon: 1:30 p.m to 7:00 p.m</h5>
            </div>
            <div className="whiteLogo">
                <img src="/assets/images/Logo_White.png" />
            </div>
            <div className="support">
                <h3>Support</h3>
                <h5>Phone number: 0987654321</h5>
                <h5>Address: Số 46 ngõ 61 Định Công, Hoàng Mai, Hà Nội</h5>
                <h5>Facebook: https:www.facebook.com/CandleInTheWind/</h5>
            </div>
        </div>

    )
}
