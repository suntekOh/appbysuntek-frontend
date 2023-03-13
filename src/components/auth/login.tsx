import "../../css/login.css"
import { useState } from 'react';
import {
    Form,
    redirect,
    useNavigate,
    useLocation
} from "react-router-dom";

import { getUser } from "../../common/users";
import { UserDto } from "../../model/userDto";
import { useAuth } from "./authProvider";

export async function action(props: { request: any }) {
    return null;
}

export default function Login({ }) {
    const [credentials, setCredentials] = useState({
        userId: '',
        password: ''
    });

    let auth = useAuth();
    let location = useLocation();
    let navigate = useNavigate();


    function handleIdChange(e: any) {
        setCredentials({
            ...credentials,
            userId: e.target.value
        })
    }

    function handlePasswordChange(e: any) {
        setCredentials({
            ...credentials,
            password: e.target.value
        })
    }

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        const userDto: UserDto = {
            userId: formData.get("userId") as string,
            password: formData.get("password") as string,
            email: ""
        };

        let user = await getUser(userDto);
        let from = location.state?.from?.pathname || "/";

        auth.signin(user, () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, { replace: true });
        });
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
                                name="userId"
                                value={credentials.userId}
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