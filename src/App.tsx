import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import AuthenticatedHome, { action as rootAction } from "./components/home/authenticated-home";
import AuthRoot from "./components/auth/auth-root";
import Signin from "./components/auth/signin";
import ForgotPassword from './components/auth/forgot-password';
import SignUp, { action as signUpAction } from './components/auth/signup';
import RouteErrorBoundary, { FallBackErrorBoundary, NoMatch } from "./components/routing/error-components";
import { AuthProvider, RequireAuth } from './components/auth/authProvider';
import AnonymousHome from './components/home/anonymous-home';
import { ErrorBoundary } from "react-error-boundary";
import { IAuthInfoFromLocalService } from "./services/auth-info-from-local-service";
import { container } from "tsyringe";
import { customConstants } from "./models/constants";
import { RoomForAuthProviderAcquisition } from "./components/routing/room-for-authprovider-acquisition";
import { IFakeApi } from "./services/fake-api";

function App() {
    const authInfoService = container.resolve<IAuthInfoFromLocalService>(customConstants.DI.IAuthInfoFromLocalService);
    const fakeApi = container.resolve<IFakeApi>(customConstants.DI.IFakeApi);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                element={<AuthProvider authInfoFromLocalService={authInfoService} />}
            >
                <Route
                    element={<RoomForAuthProviderAcquisition />}
                    errorElement={<RouteErrorBoundary authInfoService={authInfoService} />}
                >
                    <Route
                        element={
                            <AnonymousHome />
                        }
                        path="/"
                        loader={async () => {
                            return await fakeApi.getAllProductCategories(-1)
                        }}
                    >
                    </Route>
                    <Route
                        element={
                            <RequireAuth>
                                <AuthenticatedHome />
                            </RequireAuth>
                        }
                        path="/root"
                        loader={async () => {
                            return await fakeApi.getAllProductCategories(-1)
                        }}
                        action={rootAction}
                    >
                    </Route>
                    <Route
                        element={<AuthRoot />}
                        path="/auth"
                    >
                        <Route
                            path="signin"
                            element={<Signin />}
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
                    <Route path="*" element={<NoMatch authInfoService={authInfoService} />} />
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
