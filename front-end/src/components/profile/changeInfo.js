

import React from 'react'

export default function ChangePassword() {
    return (
        <div className="col-md-3 col-sm-6 col-xs-12 change-form">
            <h3 className="my-4 text-center"> Personal information</h3>
            <form>
                <div className="form-group row my-4">
                    <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="username" />
                    </div>
                </div>
                <div className="form-group row my-4">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" />
                    </div>
                </div>
                <fieldset className="form-group row my-4">
                    <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                    <div className="col-sm-10 ">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gridRadios" id="male" defaultValue="option1" defaultChecked />
                            <label className="form-check-label" htmlFor="male">
                                Male
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gridRadios" id="female" defaultValue="option2" />
                            <label className="form-check-label" htmlFor="female">
                                Female
                            </label>
                        </div>
                    </div>
                </fieldset>
                <div className="form-group row my-4">
                    <label htmlFor="date-of-birth" className="col-sm-2 col-form-label">Date of Birth</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control text-center" id="date-of-birth" />
                    </div>
                </div>
                <div className="form-group row my-4">
                    <label htmlFor="phone-number" className="col-sm-2 col-form-label">Phone number</label>
                    <div className="col-sm-10">
                        <input type="tel" className="form-control" id="phone-number" />
                    </div>
                </div>
                <div className="form-group row my-4 text-center">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary ">Done</button>
                    </div>
                </div>
            </form>
        </div>

    )
}

