import React from 'react'
import './footer.css';
export default function Footer() {
    return (
        <div className="footerContainer">
            <div className="openingTime">
                <h5>Opening time</h5>
                <h7>Morning: 8:00 a.m to 11:30 a.m</h7>
                <br></br>
                <h7>Affternoon: 1:30 p.m to 7:00 p.m</h7>
            </div>
            <div className="whiteLogo">
                <img src="/assets/images/Logo_White.png" />
            </div>
            <div className="support">
                <h5>Support</h5>
                <h7>Phone number: 0987654321</h7>
                <br></br>
                <h7>Address: Số 46, ngõ 61, Định Công, Hoàng Mai, Hà Nội</h7>
                <br></br>
                <h7>Facebook:https://www.facebook.com/CandleInTheWind/</h7>
            </div>
        </div>

    )
}
