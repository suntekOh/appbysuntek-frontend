import "../../css/login.css"
import React, { useState, useRef } from 'react';
import {
    Form,
    redirect,
    useNavigate,
    useLocation
} from "react-router-dom";

import { SignedInUser, UserDto } from "../../models/user-models";
import { useAuth } from "./authProvider";
import { createHttpClient } from "../../services/http-client-service";
import { AxiosResponse } from "axios";
import { useErrorBoundary } from "react-error-boundary";

export async function action(props: { request: any }) {
    return null;
}

export default function Login({ }) {
    const [credentials, setCredentials] = useState({
        userName: '',
        password: ''
    });

    const { showBoundary } = useErrorBoundary();

    let auth = useAuth();
    let location = useLocation();
    let navigate = useNavigate();


    function handleIdChange(e: any) {
        setCredentials({
            ...credentials,
            userName: e.target.value
        })
    }

    function handlePasswordChange(e: any) {
        setCredentials({
            ...credentials,
            password: e.target.value
        })
    }

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();
            let formData = new FormData(event.currentTarget);
            const userDto: UserDto = {
                userName: formData.get("userName") as string,
                password: formData.get("password") as string,
                email: ""
            };
            let response = await verifyLogin(userDto);
            if (response.status === 200) {
                let from = location.state?.from?.pathname || "/root";
                let user: SignedInUser = {
                    userName: userDto.userName,
                }


                auth.signin(user, () => {
                    // Send them back to the page they tried to visit when they were
                    // redirected to the login page. Use { replace: true } so we don't create
                    // another entry in the history stack for the login page.  This means that
                    // when they get to the protected page and click the back button, they
                    // won't end up back on the login page, which is also really nice for the
                    // user experience.
                    navigate(from, { replace: true });
                });

            } else {
                throw new Error();
            } 
        } catch (error: any) {
            if (error?.response?.status) {
                alert(error.response.data?.message);
                return;
            }
            showBoundary({ message: "Error Occurred during user verificaiton." });
            return;
        }

        //let user = await getUser(userDto);

    }

    async function verifyLogin(user: UserDto): Promise<AxiosResponse<any>> {
        const httpClient = createHttpClient();
        return await httpClient.get(`/users/verifyLogin?user_name=${user.userName}&password=${user.password}`);
    }


    return (
        <div className="d-flex min-vh-100 justify-content-center align-items-center">
            <div className="card custom-card-width">
                <div className="card-header">Login
                </div>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title"></h5>
                    <p className="card-text">Please enter your credentials.</p>
                    <form onSubmit={handleLogin}>
                        <div className="input-group d-flex justify-content-center mb-2">
                            <span className="input-group-text fixed-label-width text-right">Id</span>
                            <input
                                className="form-control custom-input-width"
                                name="userName"
                                value={credentials.userName}
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
                        <div className="d-flex justify-content-center ">
                            <button className="btn btn-primary custom-button-width" type="submit">Sign in</button>
                        </div>
                    </form>

                    <div className="d-flex">
                        <div className="d-flex flex-wrap justify-content-between custom-button-width">
                            <Form action="/auth/forgotpassword">
                                <button type="submit" className="btn btn-link">forgot password</button>
                            </Form>
                            <Form action="/auth/signup">
                                <button type="submit" className="btn btn-link">sign up</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}