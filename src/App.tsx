import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    Outlet,
} from "react-router-dom";
import AuthenticatedHome, { action as rootAction } from "./components/home/authenticated-home";
import AuthRoot from "./components/auth/auth-root";
import Signin from "./components/auth/signin";
import ForgotPassword from './components/auth/forgot-password';
import SignUp, { action as signUpAction } from './components/auth/signup';
import { FallBackErrorBoundary, NoMatch } from "./components/routing/error-components";
import { AuthProvider, RequireAuth } from './components/auth/authProvider';
import AnonymousHome from './components/home/anonymous-home';
import { ErrorBoundary } from "react-error-boundary";
import { IAuthInfoFromLocalService } from "./services/auth-info-from-local-service";
import { container } from "tsyringe";
import { customConstants } from "./models/constants";
import { IFakeApi } from "./services/fake-api";

function App() {
    const authInfoService = container.resolve<IAuthInfoFromLocalService>(customConstants.DI.IAuthInfoFromLocalService);
    const fakeApi = container.resolve<IFakeApi>(customConstants.DI.IFakeApi);

    const ErrorBoundaryLayout = () => (
        <ErrorBoundary FallbackComponent={FallBackErrorBoundary}>
            <Outlet />
        </ErrorBoundary>
    );

    const testLoader = async () => {
        return await fakeApi.getAllProductCategories(-1)
    }

    const router = createBrowserRouter([
        {
            element: <ErrorBoundaryLayout />,
            children: [
                {
                    element: <AuthProvider authInfoFromLocalService={authInfoService} />,
                    children: [
                        {
                            path: '/',
                            element: <AnonymousHome />,
                            loader: testLoader
                        },
                        {
                            path: '/root',
                            element:
                                <RequireAuth>
                                    <AuthenticatedHome />
                                </RequireAuth>,
                            loader: testLoader,
                            action: rootAction
                        },
                        {
                            path: '/auth',
                            element: <AuthRoot />,
                            children: [
                                {
                                    path: 'signin',
                                    element: <Signin />
                                },
                                {
                                    path: 'signup',
                                    element: <SignUp />
                                },
                                {
                                    path: 'forgotpassword',
                                    element: <ForgotPassword />
                                }

                            ]
                        },
                        {
                            path: '*',
                            element: <NoMatch authInfoService={authInfoService} />
                        }
                    ]
                }
            ],
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
