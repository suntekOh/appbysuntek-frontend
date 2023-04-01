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
import RouteErrorPage from "./components/route-error-page";
import { AuthProvider, RequireAuth } from './components/auth/authProvider';
import Public from './components/public';
import { ErrorBoundary } from "react-error-boundary";

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                element={<AuthProvider />}
                errorElement={<RouteErrorPage />}
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
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <RouterProvider router={router} />
        </ErrorBoundary>
    );
}

export default App;
