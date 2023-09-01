import { NavigateFunction, useNavigate, useRouteError } from "react-router-dom";
import { IAuthInfoFromLocalService } from "../../services/auth-info-from-local-service";
import { useAuth, AuthContextType } from "../auth/authProvider";

const defaultErrorHandler = (
    e: React.FormEvent<HTMLFormElement>,
    auth?: AuthContextType,
    navigate?: NavigateFunction,
    authInfoService?: IAuthInfoFromLocalService
):void => {
    e.preventDefault();

    if (auth && navigate && authInfoService) {
        const signedInUserName = authInfoService.getAuthenticatedUserNameFromLocal();
        if (signedInUserName) {
            auth.signin(
                { userName: signedInUserName },
                () => {
                    navigate("/root", { replace: true });
                }
            );
        } else {
            navigate("/", { replace: true });
        }
    }
}

export function NoMatch({ authInfoService }: { authInfoService: IAuthInfoFromLocalService }) {
    const error = { message: "Not Found" };
    console.error(error?.message);
    const auth = useAuth();
    const navigate = useNavigate();

    return <ErrorLayout error={error} auth={auth} navigate={navigate} authInfoService={authInfoService} errorHandler={defaultErrorHandler} />
}

export function FallBackErrorBoundary({ error, resetErrorBoundary } : { error: any, resetErrorBoundary: any }) {
    function errorHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        window.location.href='/'
    }

    return <ErrorLayout error={error} errorHandler={errorHandler} />
}


function ErrorLayout({ error, auth, navigate, authInfoService, errorHandler }: { error: any, auth?: AuthContextType, navigate?: NavigateFunction, authInfoService?: IAuthInfoFromLocalService, errorHandler: (e: React.FormEvent<HTMLFormElement>, auth?: AuthContextType, navigate?: NavigateFunction, authInfoFromLocalService?: IAuthInfoFromLocalService) => void; }): JSX.Element {
    return (
        <div id="error-page" className="px-2">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
            <form onSubmit={(e) => errorHandler(e, auth, navigate, authInfoService)}>
                <button className="btn btn-link custom-button-width" type="submit">Home</button>
            </form>

        </div>
    );
}
