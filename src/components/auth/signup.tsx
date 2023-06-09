import {
    useNavigate,
    Form as RouterForm
} from "react-router-dom";

import { UserDto } from '../../models/user-models';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/esm/Row";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from "react-bootstrap/esm/Button";
import { useErrorBoundary } from 'react-error-boundary';
import { useAuth } from './authProvider';
import { createHttpClient } from '../../services/http-client-service';
import { AxiosResponse } from 'axios';

interface SignUpFormValues {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}


export async function action(props: { request: any }) {
    return null;
}

export default function SignUp() {
    const { showBoundary } = useErrorBoundary();
    const navigate = useNavigate();

    async function handleSignUp(form: SignUpFormValues) {
        try {
            const response = await createUser({
                userName: form.username,
                password: form.password,
                firstName: 'test',
                lastName: 'test',
                email: form.email
            });

            if (response.status === 200) {
                alert('success')
                navigate("/auth/signin", { replace: true });
            } else {
                throw new Error();
            }

        } catch (error: any) {
            if (error?.response?.status) {
                alert(error.response.data?.message);
                return;
            }

            showBoundary({ message: "Error Occurred during user creation." });
            return;
        }
    }

    async function createUser(user: UserDto): Promise<AxiosResponse<any>> {
        const httpClient = createHttpClient();
        const url = process.env.REACT_APP_API_REGISTER as string;
        return await httpClient.post(url, {
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        })
    }

    return (
        <Formik
            validationSchema={Yup.object().shape({
                username: Yup.string().required('Username is required'),
                password: Yup.string().required('Password is required'),
                confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
                email: Yup.string().email('Email doesn\' follow the format'),
            })}
            onSubmit={handleSignUp}
            initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
                email: ''
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
                <div className="d-flex min-vh-100 justify-content-center align-items-center signup-form">
                    <div className="card custom-card-width">
                        <div className="card-header">Sign Up
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title"></h5>
                            <p className="card-text">Please enter the following information.</p>
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

                                <Row className="mb-2">
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="confirm-password" className="fixed-label-width text-right">Confirm Password</InputGroup.Text>
                                        <Form.Control
                                            className="custom-input-width"
                                            type="password"
                                            aria-describedby="confirm-password"
                                            name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.confirmPassword}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Row>

                                <Row className="mb-2">
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="email" className="fixed-label-width text-right">Email</InputGroup.Text>
                                        <Form.Control
                                            className="custom-input-width"
                                            type="text"
                                            aria-describedby="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup>
                                        <Button type="submit" className="w-100">Sign Up</Button>
                                    </InputGroup>
                                </Row>
                            </Form>

                            <div className="d-flex">
                                <div className="d-flex flex-wrap justify-content-between w-100 px-1">
                                    <RouterForm action="/auth/signin">
                                        <button type="submit" className="btn btn-link"><span>Sign in</span></button>
                                    </RouterForm>
                                    <RouterForm action="/">
                                        <button type="submit" className="btn btn-link"><span>Go back home</span></button>
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
