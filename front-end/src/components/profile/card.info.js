import React from 'react'

export default function CardInfo(props) {

    return (
        <div className="col-md-3 col-sm-6 col-xs-12 card-info">
            <div>
                <img className="card-avatar rounded-circle mb-4" src="./assets/images/avatar.jpg" alt="Card_image" style={{ width: '100%' }} />
                <h4 className="text-center">Harry</h4>
            </div>
            <div className="card-body">
                <div className="row list-change">
                    <li><i className="fas fa-user-edit" /> <a href="#!" onClick={() => props.changeInfo()}> Change information </a> </li>
                    <li><i className="fas fa-lock"> </i> <a href="#!" onClick={() => props.changePass()}> Change password </a> </li>
                    <li><i className="fas fa-file-alt" /> <a href="#!" onClick={() => props.showOrder()}> My orders </a> </li>
                </div>
            </div>
        </div>
    );
}
