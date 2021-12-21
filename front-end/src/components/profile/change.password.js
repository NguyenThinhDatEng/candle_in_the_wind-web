import React from 'react'

export default function ChangeInfo() {
    return (
        <div className="col-md-3 col-sm-6 col-xs-12 change-form">
            <form>
                <h3 className=" my-5 text-center">Change Password</h3>
                <div className="form-group row my-4">
                    <label htmlFor="cur-password" className="col-sm-2 col-form-label">Your current password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="cur-password" />
                    </div>
                </div>
                <div className="form-group row my-4">
                    <label htmlFor="new-password" className="col-sm-2 col-form-label">Your new password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="new-password" />
                    </div>
                </div>
                <div className="form-group row my-4">
                    <label htmlFor="vertify-password" className="col-sm-2 col-form-label">Vertify new
                        password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="vertify-password" />
                    </div>
                </div>
                <div className="form-group row my-4 text-center">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary ">Save</button>
                    </div>
                </div>
            </form>
        </div>

    )
}