import React from 'react'
import { Link, NavLink } from 'react-router-dom'
require('dotenv').config();

export default function StoreScentedWax(props) {
    const data = props.data

    return (
        data.map(value => {
            console.log(value)
            if (value?.catalog?.name == "scented wax") {
                return (
                    <div className="col">
                        <div className="item text-center">
                            <Link to={`/products/${value._id}`}>
                                <div className="item-img">
                                    <img alt="" src={process.env.REACT_APP_DB_URL + value?.related_images[0]?.url} />
                                </div>
                            </Link>


                            <div>
                                <Link to={`/products/${value._id}`}>
                                    <p className="mt-3"> {value.name} </p>
                                </Link>
                                <p className="text-danger"> {value.price}  VNĐ</p>
                                <button className="btn btn-dark mb-3">Add to cart</button>
                            </div>

                        </div>
                    </div>
                )
            }

        })
    )
}
