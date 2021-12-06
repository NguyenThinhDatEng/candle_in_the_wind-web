import React from 'react'

export default function MyOrder() {
    return (
        <div className="col-md-3 col-sm-6 col-xs-12 change-form">
            <h3 className="text-center my-4">My Orders</h3>
            <div className="table-responsive order-scrollbar">
                <table className="table bg-light table-striped ">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Order information</th>
                            <th scope="col">Price</th>
                            <th scope="col">Order status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">111</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                            <td>Thornton</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
