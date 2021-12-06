import React from 'react'

export default function StoreCandle(props) {
    const data = props.data

    return (
        data.map(value => {
            console.log(value)
            if (value.catalog.name == "candle") {
                return (
                    <div className="col">
                        <div className="item text-center">
                            <div className="item-img">
                                <img alt="" src={"https://admin-workspace.azurewebsites.net" + value.image[0].url} />
                            </div>
                            <div>
                                <p className="mt-3"> {value.name} </p>
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
