import "../../css/login.css"
import React, { useState, useRef } from 'react';
import {
    Form as RouterForm,
    redirect,
    useNavigate,
    useLocation
} from "react-router-dom";

import { AuthenticatedUser, UserDto } from "../../models/user-models";
import { useAuth } from "./authProvider";
import { createHttpClient } from "../../services/http-client-service";
import { AxiosResponse } from "axios";
import { useErrorBoundary } from "react-error-boundary";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/esm/Row";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from "react-bootstrap/esm/Button";
import * as util from 'util';

interface LoginFormValues {
    username: string;
    password: string;
}

export async function action(props: { request: any }) {
    return null;
}

export default function Login({ }) {
    const { showBoundary } = useErrorBoundary();

    let auth = useAuth();
    let location = useLocation();
    let navigate = useNavigate();

    async function handleLogin(form: LoginFormValues) {
        try {
            const userDto: UserDto = {
                userName: form.username,
                password: form.password,
                email: ""
            };

            const response = await verifyLogin(userDto);
            if (response.status === 200) {
                let from = location.state?.from?.pathname || "/root";
                let user: AuthenticatedUser = {
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
    }

    async function verifyLogin(user: UserDto): Promise<AxiosResponse<any>> {
        const httpClient = createHttpClient();
        const url = util.format(process.env.REACT_APP_API_VERIFYLOGIN as string, user.userName, user.password);
        return await httpClient.get(url);
    }


    return (
        <Formik
            validationSchema={Yup.object().shape({
                username: Yup.string().required('Username is required'),
                password: Yup.string().required('Password is required'),
            })}
            onSubmit={handleLogin}
            initialValues={{
                username: '',
                password: ''
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <div className="d-flex min-vh-100 justify-content-center align-items-center">
                    <div className="card custom-card-width">
                        <div className="card-header">Login
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title"></h5>
                            <p className="card-text">Please enter your credentials.</p>

                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-2">
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="user-name" className="fixed-label-width text-right">Username</InputGroup.Text>
                                        <Form.Control
                                            className="custom-input-width"
                                            type="text"
                                            aria-describedby="user-name"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.username && touched.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {touched.username && errors.username ? errors.username : null}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Row>
                                <Row className="mb-2">
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="password" className="fixed-label-width text-right">Password</InputGroup.Text>
                                        <Form.Control
                                            className="custom-input-width"
                                            type="password"
                                            aria-describedby="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.password && touched.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {touched.password && errors.password ? errors.password : null}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup>
                                        <Button type="submit" className="custom-button-width">Sign In</Button>
                                    </InputGroup>
                                </Row>
                            </Form>
                            <div className="d-flex">
                                <div className="d-flex flex-wrap justify-content-between custom-button-width">
                                    <RouterForm action="/auth/forgotpassword">
                                        <button type="submit" className="btn btn-link">forgot password</button>
                                    </RouterForm>
                                    <RouterForm action="/auth/signup">
                                        <button type="submit" className="btn btn-link">sign up</button>
                                    </RouterForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
}