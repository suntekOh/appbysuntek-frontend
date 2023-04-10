import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from "./components/routing/root";
import AuthRoot from "./components/auth/auth-root";
import Login from "./components/auth/login";
import ForgotPassword from './components/auth/forgot-password';
import SignUp, { action as signUpAction } from './components/auth/signup';
import RouteErrorBoundary, { FallBackErrorBoundary } from "./components/routing/error-components";
import { AuthProvider, RequireAuth } from './components/auth/authProvider';
import Public from './components/routing/public';
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { NoMatch } from "./components/routing/no-match";
import { IAuthInfoFromLocalService } from "./services/auth-info-from-local-service";
import { container } from "tsyringe";
import { customConstants } from "./models/constants";
import { RoomForAuthProviderAcquisition } from "./components/routing/room-for-authprovider-acquisition";

function App() {
    const authInfoService = container.resolve<IAuthInfoFromLocalService>(customConstants.DI.IAuthInfoFromLocalService);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                element={<AuthProvider authInfoFromLocalService={authInfoService} />}
            >
                <Route
                    element={<RoomForAuthProviderAcquisition />}
                    errorElement={<RouteErrorBoundary authInfoFromLocalService={authInfoService} />}
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
                    <Route path="*" element={<RouteErrorBoundary authInfoFromLocalService={authInfoService} />}/>
                </Route>

            </Route>
        )
    );

    return (
        <ErrorBoundary FallbackComponent={FallBackErrorBoundary}>
            <RouterProvider router={router} />
        </ErrorBoundary>
    );
}

export default App;
