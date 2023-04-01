import { useState } from 'react';
import {
    redirect,
    Form
} from "react-router-dom";

import { createUser } from "../../common/users";
import { UserDto } from '../../models/user-models';

export async function action(props: { request: any }) {
    const formData = await props.request.formData();
    const userDto = Object.fromEntries(formData) as UserDto;
    await createUser(userDto);
    return redirect('/auth/login');
}

export default function SignUp() {
    const [credentials, setCredentials] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    const handleIdChange = (e: any) => {
        setCredentials({
            ...credentials,
            userId: e.target.value
        })
    }

    const handlePasswordChange = (e: any) => {
        setCredentials({
            ...credentials,
            password: e.target.value
        })
    }

    const handleConfirmPasswordChange = (e: any) => {
        setCredentials({
            ...credentials,
            confirmPassword: e.target.value
        })
    }

    const handleEmailChange = (e: any) => {
        setCredentials({
            ...credentials,
            email: e.target.value
        })
    }

    return (
        <div className="d-flex min-vh-100 justify-content-center align-items-center">
            <div className="card custom-card-width">
                <div className="card-header">Sign Up
                </div>
                <Form method="post" action="/auth/signup">
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title"></h5>
                        <p className="card-text">Please enter the following information.</p>
                        <div className="input-group d-flex justify-content-center mb-2">
                            <span className="input-group-text fixed-label-width text-right">Id</span>
                            <input
                                className="form-control custom-input-width"
                                value={credentials.userId}
                                name="userId"
                                onChange={handleIdChange}
                            />
                        </div>
                        <div className="d-flex input-group justify-content-center mb-2">
                            <span className="input-group-text fixed-label-width text-right">Password</span>
                            <input
                                type="password"
                                className="form-control custom-input-width"
                                name="password"
                                value={credentials.password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="d-flex input-group justify-content-center mb-2">
                            <span className="input-group-text fixed-label-width">Confirm Password</span>
                            <input
                                type="password"
                                className="form-control custom-input-width"
                                value={credentials.confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>
                        <div className="input-group d-flex justify-content-center mb-2">
                            <span className="input-group-text fixed-label-width text-right">Email</span>
                            <input
                                className="form-control custom-input-width"
                                name="email"
                                value={credentials.email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary custom-button-width" type="submit">Sign Up</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
