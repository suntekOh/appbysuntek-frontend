import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from "./components/root";
import AuthRoot from "./components/auth/auth-root";
import Login from "./components/auth/login";
import ForgotPassword from './components/auth/forgot-password';
import SignUp, { action as signUpAction } from './components/auth/signup';
import ErrorPage from "./components/error-page";
import { AuthProvider, RequireAuth } from './components/auth/authProvider';
import Public from './components/public';

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                element={<AuthProvider />}
                errorElement={<ErrorPage />}
            >
                <Route
                    element={
                        <Public />
                    }
                    path="/"
                >
                </Route>
                <Route
                    element={
                        <RequireAuth>
                            <Root />
                        </RequireAuth>
                    }
                    path="/root"
                    loader={rootLoader}
                    action={rootAction}
                >
                </Route>
                <Route
                    element={<AuthRoot />}
                    path="/auth"
                >
                    <Route
                        path="login"
                        element={<Login />}
                    />
                    <Route
                        path="forgotpassword"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="signup"
                        element={<SignUp />}
                        action={signUpAction}
                    />
                </Route>
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    );
}

export default App;
